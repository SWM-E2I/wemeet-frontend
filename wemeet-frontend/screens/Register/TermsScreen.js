import { Button, View, Text, SafeAreaView } from "react-native";
import React from "react";
import BasicInfoSetScreen from "./BasicInfoSetScreen.js";

const TermsScreen = ({ navigation }) => {
  const title = "서비스 이용을 위한 동의 안내";
  const subtitle = "여러분의 개인정보와 서비스 이용 권리 잘 지켜 드릴게요.";
  const s_all = "서비스 이용을 위해 아래 약관에 모두 동의합니다.";
  const s_age = "(필수) 만 14세 이상입니다.";
  const s_terms = "(필수) 서비스 이용약관 동의";
  const s_privacy = "(필수) 개인정보 처리 방침 동의";
  const s_info = "(필수) 민감정보 수집 및 이용 동의";
  const toNext = () => {
    navigation.navigate("Auth");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
      <Button title={"다음"} onPress={toNext}></Button>
    </SafeAreaView>
  );
};

export default TermsScreen;
