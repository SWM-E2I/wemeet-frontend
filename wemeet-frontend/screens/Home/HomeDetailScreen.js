import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
  Linking,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import PaginationDot from "react-native-animated-pagination-dot";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import LeaderCard from "../../components/home/LeaderCard";
import InfoSection from "../../components/home/InfoSection";
import { LinearGradient } from "expo-linear-gradient";
import { detailApi, likeApi } from "../../api/home";
import {
  regionDict,
  collegeObj,
  drinkRateDict,
  drinkWithGameDict,
} from "../../assets/datasets";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";

const getItemLayout = (data, index) => ({
  length: Dimensions.get("window").width,
  offset: Dimensions.get("window").width * index,
  index: index,
});

const defaultTeamInfo = {
  teamId: "",
  isDeleted: true,
  memberNum: "",
  region: "",
  drinkRate: "",
  drinkWithGame: "",
  additionalActivity: "",
  introduction: "-",
  teamImageUrls: ["www.naver.com"],
  teamMembers: [
    {
      college: "",
      collegeType: "",
      admissionYear: "",
      mbti: "",
    },
  ],
  leader: {
    leaderId: "",
    nickname: "",
    mbti: "",
    collegeName: "",
    collegeType: "",
    admissionYear: "",
    leaderLowProfileImageUrl: "www.naver.com",
    imageAuth: false,
  },
  meetingRequestStatus: "",
};

const HomeDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [teamInfo, setTeamInfo] = useState(defaultTeamInfo);
  const teamId = route.params.teamId;
  const controller = new AbortController();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLike, setIsLike] = useState(false); //임시
  const hasTeam = useSelector((state) => state.persist.hasTeam);
  const [loading, setLoading] = useState(false); //좋아요 누르는 중일때 true로
  const [meetingRequestStatus, setMeetingRequestStatus] = useState(null); //null 혹은 EXPIRED인 경우만 enable, 나머지는 이미 신청함 (disable)
  const flatlistRef = useRef();
  const onMount = async () => {
    let result = await detailApi(teamId, navigation, controller);
    if (result) {
      dispatch(setHasTeam(result.memberHasTeam));
      setMeetingRequestStatus(result.meetingRequestStatus);
      const photos = [];
      result.teamImageUrls.map((url, index) => {
        photos.push({ id: index.toString(), uri: url });
      });
      setTeamInfo({ ...result, teamImageUrls: photos });
      console.log("HomeDetailScreen :", { ...result, teamImageUrls: photos });
    } else {
      setTeamInfo(defaultTeamInfo);
    }
    setIsLike(result.isLiked); //api완성되면 ㄱㄱㄱ
    // console.log(result.isLiked);
  };
  useEffect(() => {
    onMount();
    return () => controller.abort();
  }, []);
  const onLike = async () => {
    setLoading(true);
    if (isLike) Alert.alert("이미 좋아요를 보낸 상대야");
    else {
      let result = await likeApi(teamId, navigation, controller);
      setIsLike(result);
    }
    setLoading(false);
  };

  const renderItem = ({ item, index }) => {
    // console.log(index);
    return (
      <View>
        <Image
          source={{
            uri: item.uri,
          }}
          style={{
            aspectRatio: 1,
            width: Dimensions.get("window").width,
            backgroundColor: "transparent",
          }}
          resizeMode={"cover"}
          blurRadius={
            !meetingRequestStatus || meetingRequestStatus == "EXPIRED" ? 13 : 0
          }
        />
        <LinearGradient
          colors={["rgba(14,15,19,0.6)", "rgba(20, 21, 25, 0.00)"]}
          start={[0, 0]}
          end={[0, 0.5]}
          style={{
            position: "absolute",
            width: "100%",
            height: "50%",
            top: 0,
          }}
        />
        {(!meetingRequestStatus || meetingRequestStatus == "EXPIRED") && (
          <View
            style={{
              alignSelf: "center",
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              // marginBottom: 10,
              paddingHorizontal: 30,
              backgroundColor: subColorBlack2,
              borderRadius: 10,
              flexDirection: "row",
              position: "absolute",
              bottom: 15,
            }}
            opacity={0.8}
          >
            <Text
              style={{
                color: subColorPink,
                fontFamily: "pretendard500",
                fontSize: 14,
              }}
            >
              {"📢  미팅 신청 후 원본 사진을 확인할 수 있어‼️"}
            </Text>
          </View>
        )}
      </View>
    );
  };
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };

  const onRequestPress = () => {
    navigation.navigate("RequestModal", { teamId: teamInfo.teamId });
  };
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <ScrollView
        style={{ flex: 1 }}
        // bounces={false} //FOR IOS
        //overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          //0. 끝에서도 스크롤되는문제
          ref={flatlistRef}
          data={teamInfo.teamImageUrls}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          scrollToOverflowEnabled={false}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          bounces={false} //FOR IOS
          overScrollMode={"never"} //FOR ANDROID
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 7,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //불량 유저 신고 -> 미구현
              Alert.alert("문의하기", "문의사항은 카카오톡 채널에 남겨줘!", [
                {
                  text: "취소",
                },
                {
                  text: "유저 차단하기",
                  onPress: () => {
                    Alert.alert("차단하기", "이 팀을 차단하시겠어요?", [
                      {
                        text: "취소",
                      },
                      {
                        text: "차단하기",
                        onPress: () => {
                          //차단 api여기서 연결 -> 미구현 , 차단 api전송, 현재 카드에서 삭제하기, 홈화면으로 이동
                          console.log("차단");
                        },
                      },
                    ]);
                  },
                },
                {
                  text: "관리자 문의하기",
                  onPress: () => {
                    Linking.openURL("http://pf.kakao.com/_WshlG").catch((err) =>
                      console.error(
                        "onMoveToPrivacy : An error occurred while opening browswer",
                        err
                      )
                    );
                  },
                },
              ]);
            }}
          >
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <PaginationDot
            activeDotColor={"#FC8368"}
            curPage={activeIndex}
            maxPage={
              teamInfo.teamImageUrls.length == 1
                ? 0
                : teamInfo.teamImageUrls.length
            }
            sizeRatio={1}
            style={{ width: 200 }}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "white",
              }}
            >
              {/*지역 */}
              {regionDict[teamInfo.region]}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="person" size={30} color={"white"} />
              <Text style={{ marginLeft: 3, fontSize: 30, color: "white" }}>
                {teamInfo.memberNum}
                {/*인원 수 들어가기*/}
              </Text>
            </View>
          </View>
          <LeaderCard
            nickName={teamInfo.leader.nickname}
            mbti={teamInfo.leader.mbti}
            college={teamInfo.leader.collegeName}
            collegeType={collegeObj[teamInfo.leader.collegeType]}
            profile={teamInfo.leader.leaderLowProfileImageUrl}
          />
          <InfoSection
            memberInfo={teamInfo.teamMembers}
            drinkingRate={drinkRateDict[teamInfo.drinkRate]}
            drinkWithGame={drinkWithGameDict[teamInfo.drinkWithGame]}
            intro={teamInfo.introduction}
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 70,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: mainColor,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={onLike}
          style={{
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading || !hasTeam}
        >
          {isLike ? (
            <Ionicons
              name="ios-heart-sharp"
              size={30}
              color={hasTeam ? subColorPink : "#9C9C9C"}
            />
          ) : (
            <Ionicons
              name="ios-heart-outline"
              size={30}
              color={hasTeam ? subColorPink : "#9C9C9C"}
            />
          )}
          <Text
            style={{
              color: hasTeam ? subColorPink : "#9C9C9C",
              fontSize: 10,
              fontFamily: "pretendard400",
            }}
          >
            좋아요
          </Text>
        </TouchableOpacity>
        {hasTeam ? (
          <TouchableOpacity
            style={{
              flex: 1,
              height: "100%",
              backgroundColor:
                !meetingRequestStatus || meetingRequestStatus == "EXPIRED"
                  ? subColorPink
                  : "#9C9C9C",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={onRequestPress}
            disabled={meetingRequestStatus && meetingRequestStatus != "EXPIRED"}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "pretendard600",
              }}
            >
              {!meetingRequestStatus || meetingRequestStatus == "EXPIRED"
                ? "신청하기"
                : "이미 신청한 팀이야"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: "#9C9C9C",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "pretendard600",
              }}
            >
              내 팀 생성 후 신청 가능
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default HomeDetailScreen;
