import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";
import RegisterAnimatedView from "../../components/RegisterAnimatedView";
import { phoneVrfIssueApi } from "../../api/auth.js";
import { useDispatch } from "react-redux";
import { setPhoneNum } from "../../redux/registerSlice";

const instruction = "휴대폰 번호를\n알려줘";
const PhoneNumScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState("010");
  const [warning, setWarning] = useState(null); //잘못 입력했을시 안내 멘트
  const [loading, setLoading] = useState(false); //API응답대기여부
  const name = route.params.name;
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
      console.log("인증번호 발송, 다음 화면으로 이동");
      setWarning("인증번호 요청중입니다. 잠시만 기다려주세요.");
      setLoading(true);
      let result = await phoneVrfIssueApi(phone, controller, navigation);
      setLoading(false);
      if (result) {
        setWarning(null);
        dispatch(setPhoneNum(phone));
        navigation.navigate("Verify", { phone: phone });
      } else {
        setWarning("오류가 발생했습니다. 다시 시도해주세요.");
        setPhone("010");
      }
    }
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <Text style={registerStyles.labelText}>휴대폰 번호</Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={phone}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setPhone(text);
            }}
            autoFocus
            // blurOnSubmit={false}
            enablesReturnKeyAutomatically
            returnKeyType={phone.length == 11 ? "done" : "none"}
            inputMode={"numeric"}
            maxLength={11}
            placeholder={"휴대폰 번호를 입력하세요"}
            onSubmitEditing={onSubmit}
            editable={!loading}
          ></TextInput>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
            {warning}
          </Text>
        </View>
        <RegisterAnimatedView text={name} label={"이름"} />
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumScreen;
