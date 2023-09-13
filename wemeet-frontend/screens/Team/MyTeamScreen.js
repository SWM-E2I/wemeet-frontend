import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { teamInquiryApi, teamGenerateApi } from "../../api/team";
import commonStyles, {
  mainColor,
  subColorBlack,
  subColorPink,
} from "../../styles/commonStyles";
import Logo from "../../assets/vectors/Logo";
import Card from "../../components/home/Card";

const MyTeamScreen = ({ navigation, team, onRefresh }) => {
  // const controller = new AbortController();
  // useEffect(() => {
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);
  console.log("MyTeamScreen :", team);
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태를 나타내는 상태 변수
  const onRefreshing = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const card = {
    mainImageURL: team.images[0].url,
    region: team.region,
    memberNum: team.memberNum,
    leader: {
      nickName: team.leader.nickname,
      mbti: team.leader.mbti,
      college: team.leader.college,
    },
    profileImageURL: team.profileImageURL,
    chatLink: team.chatLink,
    myTeamData: team,
  };
  console.log(card);
  return (
    // <SafeAreaView
    //   style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    // >
    //   <View style={styles.logoContainer}>
    //     <Logo width={90} height={20} />
    //   </View>
    <ScrollView
      // style={{ flex: 1 }}
      // contentContainerStyle={{ flex: 1 }}
      refreshControl={
        // RefreshControl을 ScrollView에 추가
        <RefreshControl
          refreshing={refreshing} // 새로고침 중일 때 true, 아닐 때 false
          onRefresh={onRefreshing} // 당겨서 새로고침 작업을 수행하는 함수
          progressViewOffset={30} // 로딩 바가 어느 위치에서 시작할지 설정
          colors={["white"]} // 로딩 바의 색상 설정
          tintColor={"white"} // 로딩 바의 색상 설정
          title={"새로고침 중..."}
          titleColor={"white"}
        />
      }
    >
      <View style={styles.infoContainer}>
        <Text style={styles.text1}>미팅 준비 완료🔥</Text>
        <Text style={styles.text2}>
          다른 팀에게는 아래 카드로 소개되고 있어!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Card card={card} navigation={navigation} myTeam />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: "6%",
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  infoContainer: {
    // flex: 1,
    // justifyContent: "center",
    paddingHorizontal: "6%",
    // alignItems: "center",
  },
  text1: {
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 24,
    fontFamily: "pretendard600",
    color: "white",
  },
  text2: {
    paddingVertical: 5,
    fontSize: 17,
    fontFamily: "pretendard400",
    color: "#8E8E8E",
    // textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "88%",
    paddingVertical: 12,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MyTeamScreen;
