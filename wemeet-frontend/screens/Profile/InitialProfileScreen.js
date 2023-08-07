import { SafeAreaView, Text, Button } from "react-native";
import React from "react";
import commonStyles from "../../styles/commonStyles";

const InitialProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <Text>
        Initial Screen of Profile Tab : 내 프로필 수정>회원 탈퇴, 시그널 스토어,
        내가보유한 시그널>충전
      </Text>
    </SafeAreaView>
  );
};

export default InitialProfileScreen;
