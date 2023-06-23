import { SafeAreaView, Button, View, Text } from "react-native";
import React from "react";

const UnivAuthScreen = ({ navigation }) => {
  //뒤로 가기가 불가능해야함!!!1 (회원가입완료상ㅇ태)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>대학교 인증을 완료해 주세요 (인증페이지)</Text>
      <Button
        title={"다음"}
        onPress={() => {
          navigation.navigate("PhotoSet");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default UnivAuthScreen;
