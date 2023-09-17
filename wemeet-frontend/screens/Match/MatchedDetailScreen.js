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
  Button,
  Linking,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
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
import { detailApi } from "../../api/home";
import {
  regionDict,
  collegeObj,
  drinkRateDict,
  drinkWithGameDict,
} from "../../assets/datasets";
import { acceptApi, rejectApi } from "../../api/match";
import { CommonActions } from "@react-navigation/native";

const renderItem = ({ item, index }) => {
  return (
    <View key={item.id}>
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
    </View>
  );
};
const getItemLayout = (data, index) => ({
  length: Dimensions.get("window").width,
  offset: Dimensions.get("window").width * index,
  index: index,
});

const defaultTeamInfo = {
  chatLink: "https://www.naver.com", //임시
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
  },
};
const MatchedDetailScreen = ({ navigation, route }) => {
  const [teamInfo, setTeamInfo] = useState(defaultTeamInfo);
  const teamId = route.params.teamId;
  const controller = new AbortController();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();
  const onMount = async () => {
    let result = await detailApi(teamId, navigation, controller);
    if (result) {
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
  const onCopy = () => {
    // Linking.openURL().catch((err) =>
    //   console.error(
    //     "MatchedDetailScreen : An error occurred while opening browswer",
    //     err
    //   )
    // );
    Alert.alert(
      "복사 성공",
      "\n이제 카카오톡으로 대화 나눠봐!\n즐거운 미팅 되길 바래☺️"
    );
    Clipboard.setStringAsync(teamInfo.chatLink);
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
          <TouchableOpacity
            onPress={() => {
              //불량 유저 신고 -> 미구현
              Alert.alert("문의하기", "문의사항은 카카오톡 채널에 남겨줘!", [
                {
                  text: "취소",
                },
                {
                  text: "문의하기",
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: subColorPink,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 5,
          }}
          onPress={onMoveToChat}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontFamily: "pretendard600",
            }}
          >
            카톡 아이디 복사하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MatchedDetailScreen;
