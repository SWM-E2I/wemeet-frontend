import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
} from "../../styles/commonStyles";
import { AntDesign } from "@expo/vector-icons";
import { arrivedData } from "../../assets/mock";
import Card from "../../components/home/Card";
import { acceptedApi } from "../../api/match";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";
import { regionDict } from "../../assets/datasets";
import RequestDoneCharacter from "../../assets/characters/RequestDoneCharacter";
//임시 데이터

//임시 데이터

const MatchedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const hasTeam = useSelector((state) => state.persist.hasTeam);
  const [matchedData, setMatchedData] = useState([]);
  const controller = new AbortController();
  const [refreshing, setRefreshing] = useState(false);
  const onRefreshing = async () => {
    setRefreshing(true);
    await onMount();
    setRefreshing(false);
  };

  const onMount = async () => {
    // return true;
    let result = await acceptedApi(navigation, controller);
    if (result == 40029) dispatch(setHasTeam(false));
    else if (result) {
      const cards = [];
      result.forEach((card) => {
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
          teamId: card.teamId,
          chatLink: card.chatLink, //되는지 확인하기!!
        });
      });
      setMatchedData(cards);
      dispatch(setHasTeam(true));
    }
  };
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  const onMatchedPress = (teamId) => {
    navigation.navigate("MatchedDetail", { teamId: teamId });
  };
  return !hasTeam ? (
    <ScrollView
      style={{
        backgroundColor: subColorBlack2,
        paddingHorizontal: 24,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        // RefreshControl을 ScrollView에 추가
        <RefreshControl
          refreshing={refreshing} // 새로고침 중일 때 true, 아닐 때 false
          onRefresh={onRefreshing} // 당겨서 새로고침 작업을 수행하는 함수
          progressViewOffset={40} // 로딩 바가 어느 위치에서 시작할지 설정
          colors={["white"]} // 로딩 바의 색상 설정
          tintColor={"white"} // 로딩 바의 색상 설정
          title={"새로 불러오기"}
          titleColor={"white"}
        />
      }
    >
      {/* <NoTeamCharacter /> */}
      <RequestDoneCharacter />
      <Text style={styles.text1}>아직 소속된 팀이 없네 😲</Text>
      <Text style={styles.text2}>
        {
          '"팀 관리" 탭에서 팀을 만들면 \n다른 팀에게 좋아요, 매칭 신청을 보낼 수 있어!'
        }
      </Text>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: 24 }}
        // bounces={false} //FOR IOS
        // overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
        refreshControl={
          // RefreshControl을 ScrollView에 추가
          <RefreshControl
            refreshing={refreshing} // 새로고침 중일 때 true, 아닐 때 false
            onRefresh={onRefreshing} // 당겨서 새로고침 작업을 수행하는 함수
            progressViewOffset={40} // 로딩 바가 어느 위치에서 시작할지 설정
            colors={["white"]} // 로딩 바의 색상 설정
            tintColor={"white"} // 로딩 바의 색상 설정
            title={"새로 불러오기"}
            titleColor={"white"}
          />
        }
      >
        {matchedData.length >= 1 ? (
          matchedData.map((card, index) => (
            <Card
              card={card}
              navigation={navigation}
              key={index}
              style={{ width: "100%" }}
              isMatched
              onPress={onMatchedPress}
            />
          ))
        ) : (
          <View style={styles.noShowContainer}>
            <RequestDoneCharacter />
            <Text style={styles.noShowText}>아직 성사된 미팅이 없어 😲</Text>
            <Text style={styles.noShowText2}>
              {"매칭에 성공하면 여기에 표시해줄게!"}
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
    backgroundColor: subColorBlack2,
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
    paddingVertical: 100,
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

export default MatchedScreen;
