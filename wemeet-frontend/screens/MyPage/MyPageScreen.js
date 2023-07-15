import { SafeAreaView, View, Text, Button } from "react-native";
import React from "react";

//프로필 사진, 닉네임, 초대코드, 프로필/대학생 인증 뱃지,
//나의 프로필 / 선호 상대 설정 / 내가 받은 카드 / 시그널 스토어
// ***로그아웃 - 회원탈퇴 기능 필요!!!
const MyPageScreen = ({ navigation }) => {
  const goToProfile = () => {
    navigation.navigate("MyProfile");
  };
  const goToPref = () => {
    navigation.navigate("PrefEdit");
  };
  const goToHistory = () => {
    navigation.navigate("History");
  };
  const goToStore = () => {
    navigation.navigate("Store");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>MyPageScreen</Text>
      <Button title={"나의 프로필"} onPress={goToProfile} />
      <Button title={"선호 상대 설정"} onPress={goToPref} />
      <Button title={"내가 받은 카드"} onPress={goToHistory} />
      <Button title={"썸 스토어"} onPress={goToStore} />
    </SafeAreaView>
  );
};

export default MyPageScreen;
