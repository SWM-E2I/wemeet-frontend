import { SafeAreaView, Button, View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";

const UnivAuthScreen = ({ navigation }) => {
  //뒤로 가기가 불가능해야함!!!1 (회원가입완료상ㅇ태)
  const [mailAddr, setMailAddr] = useState("");
  const [sent, setSent] = useState(false);
  const [vrfCode, setVrfCode] = useState("");
  const [verified, setVerified] = useState(false);
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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>대학교 인증을 완료해 주세요 (인증페이지)</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          onChangeText={(text) => {
            setMailAddr(text);
          }}
          value={mailAddr}
          placeholder={"메일주소를 입력해주세요"}
          style={{
            height: 40,
            width: 200,
            borderBottomWidth: 0.5,
          }}
          maxLength={45}
        />
        {/* <Text>Entered PhoneNum: {phoneNum}</Text> */}
        <Button
          title={sent && timer != null ? "재전송" : "인증번호 전송"}
          color={"black"}
          onPress={() => {
            //인증번호 전송 APItlfgod
            console.log("인증번호 전송 API", mailAddr);
            setTimer(90);
          }}
          disabled={verified}
        ></Button>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
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
          keyboardType={"number-pad"}
          disabled={
            vrfCode.length == 6 && timer != null && !verified ? false : true
          }
        ></Button>
      </View>
      <Button
        title={"다음"}
        color={"pink"}
        onPress={() => {
          navigation.navigate("PhotoSet");
        }}
        disabled={!verified ? true : false}
      ></Button>
      <Button
        title={"건너뛰기"}
        onPress={() => {
          navigation.navigate("PhotoSet");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default UnivAuthScreen;
