import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import { useDispatch } from "react-redux";
import { setRegisterIntroduction } from "../../../redux/registerSlice";

const instruction = "멋드러지는\n소개를 입력해줘";
const IntroScreen = ({ navigation }) => {
  //글자 수 제한 필요!! (얼마나 둘건지)
  const dispatch = useDispatch();
  const [intro, setIntro] = useState("");
  const toNext = () => {
    //20자 이상 입력하면 추가 시그널 주는 기능 추가 필요!!
    dispatch(setRegisterIntroduction(intro));
    navigation.navigate("Univ");
    //redux state에 성별 저장하기
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {/* 여기에 body내용 입력 */}
        <View style={[registerStyles.inputTextView, { height: 160 }]}>
          <TextInput
            value={intro}
            style={[
              registerStyles.inputTextBox,
              {
                height: 160,
                paddingTop: 20,
                textAlignVertical: "top",
              },
            ]}
            onChangeText={(text) => setIntro(text)}
            autoFocus
            placeholder={"20자 이상 입력하면 추가 시그널 지급!"}
            multiline
          ></TextInput>
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={[
              registerStyles.warningText,
              { marginLeft: "10%", color: "black" },
            ]}
          >
            {"20자 이상 입력하면 추가 시그널!"}
          </Text>
        </View>
      </View>
      {/* 이부분 다시 생각 */}
      {/* <ScrollView> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default IntroScreen;
