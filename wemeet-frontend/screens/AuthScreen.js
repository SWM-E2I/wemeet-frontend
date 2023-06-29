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
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPhoneNum } from "../redux/registerSlice.js";
import { CommonActions } from "@react-navigation/native";
//각 버튼 Enable/ disAble하기
//타이머 기능
//키보드 ios, android 따라 다르게
//안드로이드 키보드 올라갈때 창 줄이지 않기??? => 키보드 고나련..
const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [finalPhone, setFinalPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [vrfCode, setVrfCode] = useState("");
  const [verified, setVerified] = useState(false);
  const numChange = (text) => {
    setPhone(text);
  };
  const codeChange = (text) => {
    setVrfCode(text);
  };
  const [timer, setTimer] = useState(null);
  const startTimer = () => {
    setTimer(90); // 90초 설정
  };
  useEffect(() => {
    if (timer === 0) {
      // 타이머가 종료되면 작업을 수행하거나 원하는 동작을 실행
      console.log("타이머 종료");
      Alert.alert("인증번호 입력 시간이 초과되었습니다. \n다시 진행해주세요.");
      setTimer(null);
    }
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      console.log(timer);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>본인 인증을 진행해주세요</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={numChange}
            value={phone}
            placeholder={"휴대폰 번호 (숫자만 입력)"}
            style={{
              height: 40,
              width: 200,
              borderBottomWidth: 0.5,
            }}
            keyboardType={"number-pad"}
            maxLength={11}
          />
          {/* <Text>Entered PhoneNum: {phoneNum}</Text> */}
          <Button
            title={sent && timer != null ? "재전송" : "인증번호 전송"}
            color={"black"}
            onPress={() => {
              if (phone.substring(0, 3) === "010") {
                setSent(true);
                Alert.alert(
                  "인증번호가 발송되었습니다.\n1분 30초 내에 입력해주세요."
                );
                setTimer(90);
                setFinalPhone(phone);
                console.log("인증번호 전송 API", phone);
              } else Alert.alert("올바른 전화번호를 입력해주세요");
            }}
            disabled={phone.length === 11 && !verified ? false : true}
          ></Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            onChangeText={codeChange}
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
            onPress={() => {
              console.log("인증번호 확인 API", vrfCode);
              //인증된경우
              setVerified(true);
              setTimer(null);
            }}
            disabled={
              vrfCode.length == 6 && timer != null && !verified ? false : true
            }
          ></Button>
        </View>
        <Button
          title={"다음"}
          color={"black"}
          onPress={() => {
            //인증이 완료되어야 진행할 수 있게.
            dispatch(setPhoneNum(finalPhone));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Basic" }],
              })
            );
          }}
          //disabled -> 인증 x인 경우 disable 설정
          disabled={!verified ? true : false}
        ></Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
