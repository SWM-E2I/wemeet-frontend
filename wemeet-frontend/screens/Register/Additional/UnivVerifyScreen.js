import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import NextButton from "../../../components/NextButton";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import commonStyles from "../../../styles/commonStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";

const instruction = "학생인증을\n완료해줘";
const UnivVerifyScreen = ({ navigation, route }) => {
  const mail = route.params.mail;
  const [timer, setTimer] = useState(90);
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState(null);
  const onSubmit = () => {
    navigation.navigate("Main");
    // 임시
  };
  useEffect(() => {
    if (timer === 0) {
      // 타이머가 종료되면 작업을 수행하거나 원하는 동작을 실행
      console.log("타이머 종료");
      Alert.alert("인증번호 입력 시간이 초과되었습니다. \n다시 진행해주세요.");
      navigation.goBack();
      setTimer(null);
    }
    let timeout = null;
    if (timer > 0) {
      timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    console.log("timer value : ", timer);
    return () => clearTimeout(timeout);
  }, [timer]);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
        인증번호
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={[registerStyles.inputTextView, { flexDirection: "row" }]}>
          <TextInput
            value={code}
            style={[registerStyles.codeInputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setCode(text);
            }}
            autoFocus
            // blurOnSubmit={false}
            enablesReturnKeyAutomatically
            returnKeyType={code.length == 6 ? "done" : "none"}
            inputMode={"numeric"}
            maxLength={6}
            placeholder={"인증번호를 입력하세요"}
            onSubmitEditing={onSubmit}
            // editable={!loading}
          ></TextInput>
          <View style={registerStyles.inputTimerView}>
            <Text style={{ fontSize: 20, color: "gray" }}>
              {timer ? `${Math.floor(timer / 60)} : ${timer % 60}` : null}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
            {warning}
          </Text>
        </View>
        <TouchableOpacity
        // onPress={resend}
        >
          <Text style={{ fontSize: 15, color: "gray" }}>
            인증번호 재전송 (임시)
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <NextButton text={"회원가입 완료하기(가제)"} onPress={onSubmit} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UnivVerifyScreen;
