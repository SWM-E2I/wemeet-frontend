import { SafeAreaView, Text } from "react-native";
import React from "react";
import commonStyles from "../../styles/commonStyles";

const MatchPage = () => {
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <Text>
        매칭 페이지 : 좋아요, 내가 보낸, 내가 받은, 보낸 신청, 받은 신청, 성사된
        미팅 (임시 페이지)
      </Text>
    </SafeAreaView>
  );
};

export default MatchPage;
