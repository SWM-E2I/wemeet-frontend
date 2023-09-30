import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import commonStyles, { subColorPink } from "../../../styles/commonStyles";
import { useSelector } from "react-redux";
import { emailVrfIssueApi } from "../../../api/univAuth";
import NextButton from "../../../components/NextButton";

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
    if (mail.length < 1) setWarning("메일 주소를 입력해줘");
    else {
      setWarning("인증번호 요청중이야. 잠시만 기다려줘.");
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
        setWarning("오류 발생. 다시 시도해주세요.");
        setMail("");
      }
    }
  };
  const onNoMailPress = () => {
    Alert.alert(
      "고객센터 문의",
      "학교 메일을 이용할 수 없는 경우, 카카오톡 고객센터로 학생임을 증빙할 수 있는 자료(학생증, 에브리타임 회원정보 스크린샷 등)와 본인의 핸드폰 번호를 같이 보내줘!",
      [
        {
          text: "취소",
        },
        {
          text: "문의하기",
          onPress: () => {
            Linking.openURL("http://pf.kakao.com/_WshlG").catch((err) =>
              console.error(
                "onMoveToChat : An error occurred while opening browswer",
                err
              )
            );
          },
        },
      ]
    );
  };
  //loading, warning, 글자 수 최소 등, api, ac.kr 피렅링 등 기능 추가하기
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        {/* {!toProfile && <RegisterCreditView currentCredit={5} />} */}
      </View>
      <Text style={registerStyles.labelText}>학교 메일</Text>
      <Pressable
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
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
        {warning && (
          <View style={{ width: "100%" }}>
            <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
              {warning}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            marginRight: "10%",
            paddingTop: 5,
          }}
          onPress={onNoMailPress}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "pretendard500",
              color: "#9C9C9C",
            }}
          >
            학교 메일 이용에 어려움이 있다면?
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "pretendard500",
              color: subColorPink,
            }}
          >
            {" [클릭]"}
          </Text>
        </TouchableOpacity>
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

export default UnivMailScreen;
