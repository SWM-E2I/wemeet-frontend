import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/RegisterCreditView";
import NextButton from "../../../components/NextButton";

const instruction = "위밋은\n너가 궁금해";
const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState("여자");
  const toNext = () => {
    navigation.navigate("Nickname");
    //redux state에 성별 저장하기
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <View style={[registerStyles.inputTextView]}>
          <TextInput
            value={""}
            style={[
              registerStyles.codeInputTextBox,
              registerStyles.inputText,
              { textAlign: "center" },
            ]}
            autoFocus
            enablesReturnKeyAutomatically
            placeholder={"성별 (임시)"}
          ></TextInput>
        </View>
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

export default GenderScreen;
