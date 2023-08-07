import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/register/RegisterCreditView";
import { phoneVrfIssueApi } from "../../api/auth.js";
import { phoneVrfValidateApi } from "../../api/auth.js";
import { persistLoginApi } from "../../api/persist";
import { useDispatch } from "react-redux";
import { setPersistState } from "../../redux/persistSlice";

const instruction = "인증번호는\n자동완성이지";
const VerifyScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const phone = route.params.phone;
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState(null);
  const [timer, setTimer] = useState(90);
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();
  const resend = async () => {
    //재전송 버튼 눌렀을 때
    setCode("");
    setTimer(90);
    console.log("인증번호 발송, 다음 화면으로 이동");
    setWarning("인증번호 요청중입니다. 잠시만 기다려주세요.");
    setLoading(true);
    let result = await phoneVrfIssueApi(phone, controller, navigation);
    setLoading(false);
    if (result) {
      setWarning("인증번호가 재전송되었습니다.");
    } else {
      setWarning("인증번호 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const onSubmit = async () => {
    if (code.length < 6) {
      setWarning("6자리 인증번호를 입력해주세요.");
      setCode("");
    }
    //인증번호 확인 API실행
    else {
      console.log("phoneVrfvalidateApi 실행");
      setLoading(true);
      setTimer(null);
      const res = await phoneVrfValidateApi(phone, code, controller); //api전송
      setLoading(false);
      if (res == "ERROR") {
        setCode("");
        setWarning("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        console.log("인증성공", res);
        setWarning(null);
        //여기서 PersistLogin 요청하기
        let nextPage = "MainTab";
        if (res == "NOT_REGISTERED") {
          navigation.navigate("TermsModal", { next: "Gender" });
        } else {
          //회원가입된 회원의 경우
          const persistRes = await persistLoginApi(controller);
          if (persistRes) {
            dispatch(setPersistState(persistRes)); //state 저장
            if (persistRes.emailAuthenticated && persistRes.hasMainProfileImage)
              nextPage = "MainTab";
            else nextPage = "Additional"; //추가정보 분기 페이지
          } else {
            Alert.alert(
              "User Data를 가져오는 중 오류가 발생했습니다.",
              "다시 시도해주세요."
            );
            console.log("peristLoginApi Error");
            nextPage = "Additional"; //임시!!!!! 수정해야함 - pesistLoginApi나오면
          }
          navigation.navigate("TermsModal", { next: nextPage });
        }
      }
    }
    setTimer(null); //setting timer to null
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
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
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
            editable={!loading}
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
        <TouchableOpacity onPress={resend}>
          <Text style={{ fontSize: 15, color: "gray" }}>
            인증번호 재전송 (임시)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyScreen;
