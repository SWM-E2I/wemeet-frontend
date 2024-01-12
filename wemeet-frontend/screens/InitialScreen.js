import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import NextButton from "../components/NextButton";
import commonStyles, { subColorPink } from "../styles/commonStyles.js";
// import { LogBox } from "react-native";
import Logo from "../assets/vectors/Logo.js";

const title = "위치 기반\n대학생 미팅 매칭 서비스,";
const body = "회원가입하고 시그널받기!";
// const bottom = "회원가입하고 시그널받기!";

const bottom = "";
function InitialScreen({ navigation }) {
  const onPress = () => {
    //수정 필요 -> 분기하기!
    navigation.replace("PhoneNum", {
      // isRegister: true //휴대폰 번호, 인증번호 입력에서도 크레딧을 줄 필요는 없지 않나?
    });
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={styles.containerTitle}>
        <Text style={styles.text}>{title}</Text>
        <Logo width={150} height={40} />
      </View>
      <View style={styles.containerBody}>
        {/* <Text style={styles.text}>{body}</Text>
         */}
        <Image
          source={require("../assets/images/recommend.gif")}
          style={styles.gif}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.text}>{bottom}</Text>
        <NextButton
          onPress={onPress}
          text={"위밋 시작하기"}
          style={{ backgroundColor: subColorPink }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    height: 200,
    justifyContent: "center",
    paddingTop: 70,
    paddingLeft: 30,
  },
  containerBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: "65%",
  },
  containerBottom: {
    height: 200,
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "pretendard500",
    color: "white",
  },
});

export default InitialScreen;
