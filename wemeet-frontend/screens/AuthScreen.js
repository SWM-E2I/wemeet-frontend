import { Button, View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";

//각 버튼 Enable/ disAble하기
//타이머 기능
//키보드 ios, android 따라 다르게
//안드로이드 키보드 올라갈때 창 줄이지 않기??? => 키보드 고나련..
const AuthScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [vrfCode, setVrfCode] = useState("");
  const nameChange = (text) => {
    setName(text);
  };
  const numChange = (text) => {
    setPhoneNum(text);
  };
  const codeChange = (text) => {
    setVrfCode(text);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Phone Verification</Text>
      <TextInput
        onChangeText={nameChange}
        value={name}
        placeholder="Enter Your Name..."
        style={{ borderWidth: 0.5, margin: 10, padding: 5 }}
      />
      <TextInput
        onChangeText={numChange}
        value={phoneNum}
        placeholder="Enter Phone Number..."
        style={{ borderWidth: 0.5, margin: 10, padding: 5 }}
      />
      {/* <Text>Entered PhoneNum: {phoneNum}</Text> */}
      <Button
        title={"인증번호 전송"}
        color={"black"}
        onPress={() => {
          console.log("인증번호 전송 API", name, phoneNum);
        }}
      ></Button>
      <TextInput
        onChangeText={codeChange}
        value={vrfCode}
        placeholder="Enter Verification Code..."
        style={{ borderWidth: 0.5, margin: 10, padding: 5 }}
      />
      {/* <Text>Entered Code: {phoneNum}</Text> */}
      <Button
        title={"확인"}
        color={"black"}
        onPress={() => {
          console.log("인증번호 확인 API", vrfCode);
        }}
      ></Button>
      <View style={{ height: 20, backgroundColor: "white" }} />
      <Button
        title={"다음"}
        color={"black"}
        onPress={() => {
          navigation.navigate("Basic");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default AuthScreen;
