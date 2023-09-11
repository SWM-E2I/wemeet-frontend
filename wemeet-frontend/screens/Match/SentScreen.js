import { View, ScrollView, StyleSheet, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { subColorBlack } from "../../styles/commonStyles";
import { sentData } from "../../assets/mock";
import Card from "../../components/home/Card";
import { sentMatchApi } from "../../api/match";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";
import { regionDict } from "../../assets/datasets";
import RequestDoneCharacter from "../../assets/characters/RequestDoneCharacter";
//임시 데이터
const tmp = {
  mainImageURL:
    "https://image.ajunews.com//content/image/2021/09/17/20210917142548746180.jpg",
  region: "-",
  memberNum: 3,
  leader: {
    nickname: "ㅇㅇㅇㄹ",
    mbti: "xxxx",
    college: "ggㅎ",
  },
  profileImageURL:
    "https://image.ajunews.com//content/image/2021/09/17/20210917142548746180.jpg",
  meetingRequestId: 10,
  teamId: 100,
  daysLeft: 2, //0 > D-0, 1 > D-1 ... 최대 D-3
  acceptStatus: "PENDING", //상대방의 거절, 수락 여부 -> 실제로는 PENDING상태인것만 들어온다!!
};
const SentScreen = ({ navigation }) => {
  const now = new Date();
  const dispatch = useDispatch();
  const hasTeam = useSelector((state) => state.persist.hasTeam);
  const [matchSentData, setMatchSentData] = useState([]);
  const controller = new AbortController();
  const onMount = async () => {
    let result = await sentMatchApi(navigation, controller);
    if (result) {
      const cards = [];
      result.forEach((card) => {
        const date = new Date(card.requestTime);
        const timeDifference = now - date;
        const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);
        cards.push({
          mainImageURL: card.teamProfileImageUrl[0],
          region: regionDict[card.region],
          memberNum: card.memberCount,
          leader: {
            nickName: card.leader.nickname,
            mbti: card.leader.mbti,
            college: card.leader.collegeName,
          },
          profileImageURL: card.leader.leaderLowProfileImageUrl,
          daysLeft: 2 - days, //0 > D-0, 1 > D-1 ... 최대 D-3
          acceptStatus: card.acceptStatus, //상대방의 거절, 수락 여부 -> 실제로는 PENDING상태인것만 들어온다!!
          meetingRequestId: card.meetingRequestId,
          teamId: card.teamId,
        });
      });
      setMatchSentData(cards);
      dispatch(setHasTeam(true));
    } else if (result == 40029) dispatch(setHasTeam(false));
  };
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  const onSentPress = (teamId) => {
    navigation.navigate("SentDetail", {
      teamId: teamId,
    });
  };
  return !hasTeam ? (
    <View style={[styles.container, { justifyContent: "center" }]}>
      {/* <NoTeamCharacter /> */}
      <RequestDoneCharacter />
      <Text style={styles.text1}>아직 소속된 팀이 없네 😲</Text>
      <Text style={styles.text2}>
        {
          '"팀 관리" 탭에서 팀을 만들면 \n다른 팀에게 좋아요, 매칭 신청을 보낼 수 있어!'
        }
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: 24 }}
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        {matchSentData.length >= 1 ? (
          matchSentData.map((card, index) => (
            <Card
              card={card}
              navigation={navigation}
              key={index}
              style={{ width: "100%" }}
              isSent
              onPress={onSentPress}
            />
          ))
        ) : (
          <View style={styles.noShowContainer}>
            <RequestDoneCharacter />
            <Text style={styles.noShowText}>아직 보낸 매칭 신청이 없어 😲</Text>
            <Text style={styles.noShowText2}>
              {"관심가는 친구들에게 미팅을 신청해봐!"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: subColorBlack,
    // backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text1: {
    paddingVertical: 15,
    fontSize: 20,
    fontFamily: "pretendard600",
    color: "white",
  },
  text2: {
    paddingVertical: 5,
    fontSize: 17,
    fontFamily: "pretendard400",
    color: "#8E8E8E",
    textAlign: "center",
  },
  noShowContainer: {
    // flex: 1,
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  noShowText: {
    color: "white",
    fontSize: 20,
    fontFamily: "pretendard600",
    marginTop: 20,
    textAlign: "center",
  },
  noShowText2: {
    color: "#9C9C9C",
    fontSize: 16,
    fontFamily: "pretendard600",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default SentScreen;
