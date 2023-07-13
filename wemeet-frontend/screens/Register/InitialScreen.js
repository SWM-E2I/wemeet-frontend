import { SafeAreaView, View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const title = "위치기반\n대학생 미팅 매칭 서비스,\n위밋";
const body = "회원가입하고 시그널받기!";
const bottom = "시그널로 내 주변 상대 추천받기!";
const InitialScreen = ({ navigation }) => {
  const onPress = () => {
    navigation.replace("Auth");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.containerBody}>
        <Text style={styles.text}>{body}</Text>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.text}>{bottom}</Text>
        <Button title={"위밋 시작하기"} onPress={onPress}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
    height: 150,
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default InitialScreen;
