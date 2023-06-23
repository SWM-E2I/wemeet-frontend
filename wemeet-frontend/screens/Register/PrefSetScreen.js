import { Button, SafeAreaView, View, Text } from "react-native";
import React from "react";

const PrefSetScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>선호 상대에 대해 알려주세요</Text>
      <Button
        title={"다음"}
        onPress={() => {
          navigation.navigate("UnivSet");
        }}
      ></Button>
      {/* 술자리 여부 선호 만남 특징 선호 학번 같은 학교 여부 아는사람 피하기 상대팀MBTI */}
      {/* 선호학번은 range로 설정할수있게 구현 */}
      {/*아는 사람 피하기 (모달로 구현)*/}
    </SafeAreaView>
  );
};

export default PrefSetScreen;
