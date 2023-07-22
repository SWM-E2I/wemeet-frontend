import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";

const instruction = "어떤 미팅\n상대를 원하니";
const SameUnivScreen = ({ navigation }) => {
  const [sameUniv, setSameUniv] = useState(true);
  const toNext = () => {
    navigation.navigate("Friend");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <RegisterSelectView
          text={"같은 학교여도 상관없어"}
          disabled={!sameUniv}
          onPress={() => setSameUniv(true)}
        />
        <RegisterSelectView
          text={"같은 학교면 더 좋아!"}
          disabled={sameUniv}
          onPress={() => setSameUniv(false)}
        />
      </View>
      {/* 이부분 다시 생각 */}
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default SameUnivScreen;
