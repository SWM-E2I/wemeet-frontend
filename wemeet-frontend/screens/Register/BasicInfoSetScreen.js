import { Button, SafeAreaView, View, Text } from "react-native";
import React from "react";

const BasicInfoSetScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>프로필 정보를 알려주세요 : 성별, 닉네임, MBTI</Text>
      <Button
        title={"다음"}
        onPress={() => {
          navigation.navigate("Pref");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default BasicInfoSetScreen;
