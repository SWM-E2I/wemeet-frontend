import {
  SafeAreaView,
  View,
  Text,
  Button,
  Alert,
  Image,
  StyleSheet,
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

const MyTeamScreen = ({ navigation, team }) => {
  // const controller = new AbortController();
  // useEffect(() => {
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);
  console.log("MyTeamScreen :", team);

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
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <View style={styles.logoContainer}>
        <Logo width={90} height={20} />
      </View>

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
    </SafeAreaView>
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
