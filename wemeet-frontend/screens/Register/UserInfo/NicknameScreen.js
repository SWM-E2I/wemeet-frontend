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
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import SkipButton from "../../../components/SkipButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const instruction = "원하는\n닉네임을 알려줘";
//for random recommended nickname
const adjectives = [
  "강력한",
  "용감한",
  "밝은",
  "기분 좋은",
  "날카로운",
  "재미있는",
  "창의적인",
];
const nouns = [
  "사자",
  "호랑이",
  "여우",
  "곰",
  "말",
  "돌고래",
  "펭귄",
  "세윤",
  "기우",
  "채림",
  "세희",
  "이린",
];

// 랜덤한 닉네임을 생성하는 함수
function generateRandomNickname() {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return randomAdjective + " " + randomNoun;
}

const NicknameScreen = ({ navigation }) => {
  const [nickName, setNickName] = useState(generateRandomNickname());
  const [manual, setManual] = useState(false);
  const toNext = () => {
    navigation.navigate("Mbti");
    //redux state에 성별 저장하기
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
        {!manual ? (
          <TouchableOpacity
            style={[
              registerStyles.inputTextView,
              { backgroundColor: "#F2F2F2" },
            ]}
            activeOpacity={0.4}
            onPress={() => {
              setNickName(generateRandomNickname());
            }}
          >
            <Text style={registerStyles.inputText}>{nickName}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[registerStyles.inputTextView]}>
            <TextInput
              value={nickName}
              onChangeText={(text) => {
                setNickName(text);
              }}
              style={[registerStyles.inputTextBox, registerStyles.inputText]}
              autoFocus
              enablesReturnKeyAutomatically
              placeholder={"닉네임을 입력해줘"}
            ></TextInput>
          </View>
        )}
        <SkipButton
          onPress={() => {
            if (!manual) setNickName("");
            else setNickName(generateRandomNickname());
            setManual(!manual);
          }}
          text={!manual ? "직접 입력할래" : "추천 받을래"}
        />
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
          disabled={nickName.length > 0 ? false : true}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NicknameScreen;
