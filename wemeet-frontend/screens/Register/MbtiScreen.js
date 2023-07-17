import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";
import NextButton from "../../components/NextButton";
import SkipButton from "../../components/SkipButton";

const instruction = "MBTI는 필수지";

const MbtiScreen = ({ navigation }) => {
  const toNext = () => {
    navigation.navigate("Intro");
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
            placeholder={"MBTI입력페이지(미구현)"}
          ></TextInput>
        </View>
        <SkipButton text={"아직 잘 몰라"} />
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

export default MbtiScreen;
