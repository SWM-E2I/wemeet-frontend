import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles, { subColorPink } from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/register/RegisterCreditView";
// import RegisterAnimatedView from "../../components/register/RegisterAnimatedView";
import { phoneVrfIssueApi } from "../../api/auth.js";
import { useDispatch } from "react-redux";
import { setRegisterPhoneNum } from "../../redux/registerSlice";
import NextButton from "../../components/NextButton";
const instruction = "휴대폰 번호를\n입력해줘";

const PhoneNumScreen = ({ navigation, route }) => {
  const isRegister = route.params?.isRegister;
  const [phone, setPhone] = useState("010");
  const [warning, setWarning] = useState(null); //잘못 입력했을시 안내 멘트
  const [loading, setLoading] = useState(false); //API응답대기여부
  const controller = new AbortController(); //abortcontroller
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  const onSubmit = async () => {
    if (phone.substring(0, 3) != "010" || phone.length < 11) {
      setWarning("휴대폰 번호를 정확히 입력해주세요");
      setPhone("010");
    } else {
      setWarning("인증번호 요청중입니다. 잠시만 기다려주세요.");
      setLoading(true);
      let result = await phoneVrfIssueApi(phone, controller, navigation);
      setLoading(false);
      if (result) {
        console.log("인증번호 발송, 다음 화면으로 이동");
        setWarning(null);
        dispatch(setRegisterPhoneNum(`+82${phone.slice(1)}`));
        navigation.navigate("Verify", {
          phone: phone,
          isRegister: isRegister,
        });
      } else {
        setWarning("오류가 발생했습니다. 다시 시도해주세요.");
        setPhone("010");
      }
    }
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        {isRegister && <RegisterCreditView currentCredit={5} />}
      </View>
      <Text style={registerStyles.labelText}>휴대폰 번호</Text>
      <Pressable
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={phone}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setPhone(text);
            }}
            autoFocus
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            // returnKeyType={phone.length == 11 ? "done" : "none"}
            keyboardType={"number-pad"}
            maxLength={11}
            placeholder={"숫자만 입력해줘"}
            onSubmitEditing={onSubmit}
            editable={!loading}
            placeholderTextColor={"#C4C4C4"}
          ></TextInput>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
            {warning}
          </Text>
        </View>
      </Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <NextButton
          text={"다음"}
          onPress={onSubmit}
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: subColorPink,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneNumScreen;
