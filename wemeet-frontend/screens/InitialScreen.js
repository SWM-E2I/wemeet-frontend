import { Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
//로그인 정보 확인, 새로 설치한 경우 여기서 member type및 화면에 따라 분기.
//분기 로직 수정 필요
const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.replace("Terms");
  }, []);
  return (
    <SafeAreaView>
      <Text>InitialScreen</Text>
    </SafeAreaView>
  );
};

export default InitialScreen;
