import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import Card from "../../components/home/Card";
import { sentLikeApi, receivedLikeApi } from "../../api/match";
// import { likeSentData } from "../../assets/mock.js"; //임시
import NoTeamCharacter from "../../assets/characters/NoTeamCharacter";
import RequestDoneCharacter from "../../assets/characters/RequestDoneCharacter";
import { useDispatch, useSelector } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";

const LikeScreen = ({ navigation }) => {
  // 현재 시간을 얻기
  const now = new Date();
  const dispatch = useDispatch();
  const hasTeam = useSelector((state) => state.persist.hasTeam);
  const [arrived, setArrived] = useState(true);
  const [likeSentData, setLikeSentData] = useState([]);
  const [likeReceivedData, setLikeReceivedData] = useState([]);
  const controller = new AbortController();
  const [refreshing, setRefreshing] = useState(false);
  const onRefreshing = async () => {
    setRefreshing(true);
    await onMount();
    setRefreshing(false);
  };

  const onMount = async () => {
    if (arrived) {
      let result = await receivedLikeApi(navigation, controller);
      // let result = false;
      if (result == 40029) dispatch(setHasTeam(false));
      else if (result) {
        const cards = [];
        result.forEach((card) => {
          const date = new Date(card.receivedTime);
          // 시간 차이 계산
          const timeDifference = now - date; // 밀리초 단위로 시간 차이를 얻습니다.
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          cards.push({
            mainImageURL: card.mainImageURL,
            region: card.region,
            memberNum: card.memberNum,
            leader: {
              nickName: card.leader.nickname,
              mbti: card.leader.mbti,
              college: card.leader.college,
            },
            profileImageURL: card.profileImageURL,
            teamId: card.teamId,
            timeLeft: 24 - hours,
          });
        });
        setLikeReceivedData(cards);
        // if (cards.length == 0) setArrived(false);
        dispatch(setHasTeam(true));
      }
    } else {
      let result = await sentLikeApi(navigation, controller);
      if (result == 40029) dispatch(setHasTeam(false));
      else if (result) {
        const cards = [];
        result.forEach((card) => {
          // Alert.alert(card.sentTime);
          const date = new Date(card.sentTime);
          // 시간 차이 계산
          const timeDifference = now - date; // 밀리초 단위로 시간 차이를 얻습니다.
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          cards.push({
            mainImageURL: card.mainImageURL,
            region: card.region,
            memberNum: card.memberNum,
            leader: {
              nickName: card.leader.nickname,
              mbti: card.leader.mbti,
              college: card.leader.college,
            },
            profileImageURL: card.profileImageURL,
            teamId: card.teamId,
            timeLeft: 24 - hours,
          });
        });
        setLikeSentData(cards);
        dispatch(setHasTeam(true));
      }
      //card에 필요데이터 저장하기, 상황에 맞게 분기하기
      //내 팀이 없는 경우 팀이 없다고 보여주는 화면 필요!!!!
    }
  };
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, [arrived]);

  const onLikePress = (teamId) => {
    navigation.navigate("LikeDetail", { teamId: teamId });
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
      <View style={styles.toggleContainer}>
        {/*임시*/}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            arrived
              ? {
                  backgroundColor:
                    // "#575757"
                    subColorPink,
                }
              : null,
          ]}
          onPress={() => setArrived(true)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              arrived ? null : { color: "#575757" },
            ]}
          >
            받은 좋아요
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !arrived ? { backgroundColor: subColorPink } : null,
          ]}
          onPress={() => setArrived(false)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              !arrived ? null : { color: "#575757" },
            ]}
          >
            보낸 좋아요
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Card card={card} navigation={navigation} /> */}
      {/* 받은 좋아요가 없는 경우 띄워줄 화면 필요!!!!!! (분기하기!!!) */}

      <ScrollView
        // style={{ marginVertical: 10 }}
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
        {arrived ? (
          likeReceivedData.length >= 1 ? (
            likeReceivedData.map((card, index) => (
              <Card
                card={card}
                navigation={navigation}
                key={index}
                style={{ width: "100%" }}
                isLike
                onPress={onLikePress}
              />
            ))
          ) : (
            <View style={styles.noShowContainer}>
              <RequestDoneCharacter />
              <Text style={styles.noShowText}>아직 받은 좋아요가 없어 😲</Text>
              <Text style={styles.noShowText2}>
                {"친구들에게 좋아요를 받으면 여기에 표시해줄게!"}
              </Text>
            </View>
          )
        ) : likeSentData.length >= 1 ? (
          likeSentData.map((card, index) => (
            <Card
              card={card}
              navigation={navigation}
              key={index}
              style={{ width: "100%" }}
              isLike
              onPress={onLikePress}
            />
          ))
        ) : (
          <View style={styles.noShowContainer}>
            <RequestDoneCharacter />
            <Text style={styles.noShowText}>아직 보낸 좋아요가 없어 😲</Text>
            <Text style={styles.noShowText2}>
              {
                "좋아요는 하루에 한번만 보낼 수 있어\n관심가는 친구들에게 좋아요를 보내봐!"
              }
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
    // backgroundColor: mainColor,
    // backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  toggleContainer: {
    marginVertical: 16,
    padding: 10,
    width: 240,
    height: 50,
    borderRadius: 12,
    backgroundColor: subColorBlack2,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 0.5,
    // borderColor: subColorPink,
    borderColor: "#9C9C9C",
  },
  toggleButton: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "pretendard600",
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

export default LikeScreen;
