import {
  SafeAreaView,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/RegisterSelectView";
import SkipButton from "../../../components/SkipButton";

const instruction = "어떤 미팅\n상대를 원하니";
const AdmissionYearScreen = ({ navigation }) => {
  const [withDrink, setWithDrink] = useState(true);
  const toNext = () => {
    navigation.navigate("SameUniv");
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
          label={"최소"}
          text={"최소 학번 선택 (미구현)"}
          disabled
        />
        <RegisterSelectView
          label={"최대"}
          text={"최대 학번 선택 (미구현)"}
          disabled
        />
        <SkipButton text={"누구든 다 좋아!"} style={{ marginTop: 0 }} />
      </View>

      {/* 이부분 다시 생각 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <NextButton
          text={"다음"}
          onPress={toNext}
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdmissionYearScreen;
