import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPhoneNum } from "../redux/registerSlice.js";
import { CommonActions } from "@react-navigation/native";
import { phoneVrfIssueApi, phoneVrfValidateApi } from "../api/auth.js";
//각 버튼 Enable/ disAble하기
//타이머 기능
//키보드 ios, android 따라 다르게
//안드로이드 키보드 올라갈때 창 줄이지 않기??? => 키보드 고나련..

//.env파일로 옮기기??
const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [finalPhone, setFinalPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [vrfCode, setVrfCode] = useState("");
  const [verified, setVerified] = useState(false);
  const phoneRef = useRef();
  const vrfRef = useRef();
  const [timer, setTimer] = useState(null);
  const controller = new AbortController(); //abortcontroller
  const onIssueButtonPress = () => {
    //인증번호 전송 클릭시
    phoneVrfIssueApi(
      phone,
      setSent,
      setTimer,
      setFinalPhone,
      setVrfCode,
      vrfRef,
      controller
    );
  };
  const onValidateButtonPress = async () => {
    const res = await phoneVrfValidateApi(
      finalPhone,
      vrfCode,
      setVrfCode,
      setVerified,
      setTimer,
      controller
    ); //api전송
    let nextPg = res == "REGISTERED" ? "Main" : "Basic";
    dispatch(setPhoneNum(finalPhone)); //redux에 핸드폰 번호 저장
    //페이지이동
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: nextPg }],
      })
    );
  };
  useEffect(() => {
    if (timer === 0) {
      // 타이머가 종료되면 작업을 수행하거나 원하는 동작을 실행
      console.log("타이머 종료");
      Alert.alert("인증번호 입력 시간이 초과되었습니다. \n다시 진행해주세요.");
      setTimer(null);
    }
    let timeout = null;
    if (timer > 0) {
      timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [timer]);

  useEffect(() => {
    phoneRef.current.focus();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>본인 인증을 진행해주세요</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            ref={phoneRef}
            onChangeText={(text) => {
              setPhone(text);
            }}
            value={phone}
            placeholder={"휴대폰 번호 (숫자만 입력)"}
            style={{
              height: 40,
              width: 200,
              borderBottomWidth: 0.5,
            }}
            keyboardType={"number-pad"}
            maxLength={11}
            editable={!verified} //인증이 된 경우 변경할 수 없음
          />
          {/* <Text>Entered PhoneNum: {phoneNum}</Text> */}
          <Button
            title={sent && timer != null ? "재전송" : "인증번호 전송"}
            color={"black"}
            onPress={onIssueButtonPress}
            disabled={phone.length < 11 || verified}
          ></Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            ref={vrfRef}
            onChangeText={(text) => {
              setVrfCode(text);
            }}
            value={vrfCode}
            placeholder={
              timer == null
                ? "인증번호를 입력해주세요 (6자리)"
                : `인증번호 입력 (6자리)\t${Math.floor(timer / 60)} : ${
                    timer % 60
                  }`
            }
            style={{
              height: 40,
              width: 200,
              borderBottomWidth: 0.5,
            }}
            keyboardType={"number-pad"}
            maxLength={6}
          />
          <Button
            title={"확인"}
            color={"black"}
            onPress={onValidateButtonPress}
            disabled={!(vrfCode.length == 6 && timer != null && !verified)}
          ></Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
