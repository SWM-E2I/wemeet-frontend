import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import NextButton from "../components/NextButton";
import commonStyles from "../styles/commonStyles.js";

const title = "위치기반\n대학생 미팅 매칭 서비스,\n위밋";
const body = "회원가입하고 시그널받기!";
const bottom = "시그널로 내 주변 상대 추천받기!";
const InitialScreen = ({ navigation }) => {
  const onPress = () => {
    navigation.replace("Name");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <View style={styles.containerTitle}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.containerBody}>
        <Text style={styles.text}>{body}</Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.text}>{bottom}</Text>
        <NextButton onPress={onPress} text={"위밋 시작하기"} />
      </View>
    </SafeAreaView>
  );
};

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
  containerBottom: {
    height: 200,
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
});

export default InitialScreen;
