import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import commonStyles from "../../../styles/commonStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import { useSelector } from "react-redux";
import { emailVrfIssueApi } from "../../../api/univAuth";
const instruction = "학생인증을\n완료해줘";
const UnivMailScreen = ({ navigation, route }) => {
  //college 정보 필요함.
  const college = useSelector((state) => {
    return state.register.collegeInfo.college; //학교 코드
  });
  // console.log("학교정보 : ", college);
  const [mail, setMail] = useState("");
  const [warning, setWarning] = useState(null);
  const [loading, setLoading] = useState(false); //API응답대기여부
  const controller = new AbortController(); //abortcontroller
  const toProfile = route.params?.toProfile;
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  const onSubmit = async () => {
    if (mail.length < 1) setWarning("메일 주소를 입력해주세요");
    else {
      setWarning("인증번호 요청중입니다. 잠시만 기다려주세요.");
      setLoading(true);
      let result = await emailVrfIssueApi(
        college,
        mail,
        controller,
        navigation
      );
      setLoading(false);
      if (result) {
        console.log("인증번호 발송, 다음 화면으로 이동");
        setWarning(null);
        navigation.navigate("UnivVerify", {
          mail: mail,
          toProfile: toProfile ? true : false,
        });
      } else {
        setWarning("오류가 발생했습니다. 다시 시도해주세요.");
        setMail("");
      }
    }
  };
  //loading, warning, 글자 수 최소 등, api, ac.kr 피렅링 등 기능 추가하기
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        {!toProfile && <RegisterCreditView currentCredit={5} />}
      </View>
      <Text style={registerStyles.labelText}>학교 메일</Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={mail}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setMail(text);
            }}
            autoFocus
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            returnKeyType={mail.length > 0 ? "done" : "none"}
            keyboardType={"email-address"}
            maxLength={40}
            placeholder={"메일 주소를 입력해줘"}
            onSubmitEditing={onSubmit}
            editable={!loading}
            autoCapitalize={"none"}
            placeholderTextColor={"#C4C4C4"}
          ></TextInput>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
            {warning}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UnivMailScreen;
