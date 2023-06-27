import { SafeAreaView, Button, View, Text } from "react-native";
import React, { useState } from "react";

const UnivSetScreen = ({ navigation }) => {
  //추후 대학 소속 변경은 불가능해요. 정확하게 입력해주세요.
  /*회원가입 완료 버튼을 누르고 다음으로 navigate하면 대학교 인증 페이지에서 뒤로 가기가 불가능해야함 */
  const [univ, setUniv] = useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>학교 정보를 등록해 주세요</Text>
      {/* 학교 및 단과대, 학번, 학교랑 단과대는 선택할 수 있도록 구현 */}
      <Text>학교 및 단과대*</Text>
      <Text>학번*</Text>
      <Button
        title={"회원 가입 완료"}
        color={"pink"}
        onPress={() => {
          navigation.replace("UnivAuth");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default UnivSetScreen;
