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
  subColorPink,
  subColorBlack,
  subColorBlack2,
} from "../../styles/commonStyles";
import PaginationDot from "react-native-animated-pagination-dot";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import LeaderCard from "../../components/home/LeaderCard";
import InfoSection from "../../components/home/InfoSection";
import { LinearGradient } from "expo-linear-gradient";
import { detailApi, blockMemberApi } from "../../api/home";
import {
  regionDict,
  collegeObj,
  drinkRateDict,
  drinkWithGameDict,
} from "../../assets/datasets";
import { acceptApi, rejectApi } from "../../api/match";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";

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
        blurRadius={13}
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
          {"📢  매칭이 성사되면 원본 사진을 확인할 수 있어‼️"}
        </Text>
      </View>
    </View>
  );
};

const getItemLayout = (data, index) => ({
  length: Dimensions.get("window").width,
  offset: Dimensions.get("window").width * index,
  index: index,
});

const defaultTeamInfo = {
  teamId: 0,
  isDeleted: true,
  memberNum: null,
  region: null,
  drinkRate: null,
  drinkWithGame: null,
  additionalActivity: null,
  introduction: "-",
  teamImageUrls: ["www.naver.com"],
  teamMembers: [
    {
      college: null,
      collegeType: null,
      admissionYear: null,
      mbti: null,
    },
  ],
  leader: {
    leaderId: null,
    nickname: null,
    mbti: null,
    collegeName: null,
    collegeType: null,
    admissionYear: null,
    leaderLowProfileImageUrl: "www.naver.com",
    imageAuth: false,
    emailAuthenticated: false,
  },
  meetingRequestStatus: null,
};
const ArrivedDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [teamInfo, setTeamInfo] = useState(defaultTeamInfo);
  const teamId = route.params.teamId;
  const meetingRequestId = route.params.meetingRequestId;
  const message = route.params.message;
  const controller = new AbortController();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();
  const [loading, setLoading] = useState(false);
  const onMount = async () => {
    let result = await detailApi(teamId, navigation, controller);
    if (result) {
      dispatch(setHasTeam(true));
      const photos = [];
      result.teamImageUrls.map((url, index) => {
        photos.push({ id: index.toString(), uri: url });
      });
      setTeamInfo({ ...result, teamImageUrls: photos });
      console.log("SentDetailScreen :", { ...result, teamImageUrls: photos });
    } else {
      setTeamInfo(defaultTeamInfo);
      // navigation.goBack();
    }
  };
  useEffect(() => {
    onMount();
    return () => controller.abort();
  }, []);
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const onAcceptPress = async () => {
    //수락 Api 연결하기!!
    setLoading(true);
    let result = await acceptApi(meetingRequestId, navigation, controller);
    if (result) {
      setLoading(false);
      Alert.alert(
        "매칭 성공",
        "이제 상대방의 카카오톡 아이디를 확인할 수 있어!",
        [
          {
            text: "확인",
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "MatchedStack" }],
                })
              );
            },
          },
        ]
      );
    }
    setLoading(false);
  };
  const onDeclinePress = async () => {
    //거절 Api 연결하기!!
    Alert.alert(
      // "프로필 사진, 이메일\n인증을 완료해줘",
      // "마이페이지에서 완료 후에 다시 시도해줘",
      "앗, 잠깐!",
      "거절한 친구들은 다시 추천받을 수 없어!\n정말 거절할거야?",
      [
        {
          text: "생각해볼게",
          onPress: () => {},
        },
        {
          text: "거절할래", // 버튼 텍스트
          onPress: async () => {
            setLoading(true);
            let result = await rejectApi(
              meetingRequestId,
              navigation,
              controller
            );
            if (result) {
              setLoading(false);
              Alert.alert("거절 완료", "더 좋은 친구들을 추천해줄게!");
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "ArrivedStack" }],
                })
              );
            }
            setLoading(false);
          },
        },
      ]
    );
  };
  const blockApi = async () => {
    // let result = await blockMemberApi(teamInfo.leader.leaderId);
    let result = await blockMemberApi(
      teamInfo.leader.leaderId,
      navigation,
      controller
    ); // for test
    if (result) {
      Alert.alert("차단 완료", "문의/불편사항은 카카오톡으로 남겨줘!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Arrived" }],
        })
      );
    }
    return result;
  };
  const onReportPress = () => {
    //불량 유저 신고 -> 미구현
    Alert.alert(
      "문의하기",
      "문의사항은 카카오톡 채널에 남겨줘!\n\n다시 보고 싶지 않은 사용자가 있다면\n하단의 '유저 차단하기'를 눌러줘!",
      [
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
        {
          text: "유저 차단하기",
          onPress: () => {
            Alert.alert(
              "차단하기",
              "이 팀을 차단할래? \n한번 차단된 팀은 다시 추천되지 않아",
              [
                {
                  text: "취소",
                },
                {
                  text: "차단하기",
                  onPress: () => {
                    blockApi();
                  },
                },
              ]
            );
          },
        },

        {
          text: "취소",
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        { backgroundColor: mainColor, paddingTop: 0 },
      ]}
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
          <TouchableOpacity onPress={onReportPress}>
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
            admissionYear={teamInfo.leader.admissionYear}
            emailAuthenticated={teamInfo.leader.emailAuthenticated}
          />
          <InfoSection
            memberInfo={teamInfo.teamMembers}
            drinkingRate={drinkRateDict[teamInfo.drinkRate]}
            drinkWithGame={drinkWithGameDict[teamInfo.drinkWithGame]}
            intro={teamInfo.introduction}
            message={message}
            leader={teamInfo.leader}
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
          style={{
            width: "48%",
            height: "100%",
            backgroundColor: subColorBlack,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={onDeclinePress}
          disabled={loading}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "pretendard600",
            }}
          >
            거절
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "48%",
            height: "100%",
            backgroundColor: subColorPink,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 5,
          }}
          onPress={onAcceptPress}
          disabled={loading}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "pretendard600",
            }}
          >
            수락
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={22}
              color={"rgba(255, 255, 255, 0.50)"}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.50)",
                fontSize: 17,
                fontFamily: "pretendard600",
              }}
            >
              5
            </Text>
            {/* 임시 시그널수 */}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ArrivedDetailScreen;
