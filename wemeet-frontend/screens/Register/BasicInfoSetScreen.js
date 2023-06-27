import { TextInput, Button, SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBasicInfo } from "../../redux/registerSlice.js";

const BasicInfoSetScreen = ({ navigation }) => {
  const phoneNum = useSelector((state) => {
    //폰 인증 페이지에서 넘어온 핸드폰 번호
    return state.register.basic_info.phone_number;
  });
  const basicInfo = useSelector((state) => {
    //console.log용도
    return state.register.basic_info;
  });
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");

  const onNext = () => {
    //' 다음 ' 버튼 클릭시
    dispatch(
      setBasicInfo({
        phone_number: phoneNum,
        nickname: nickName,
        gender: gender,
        mbti: mbti,
      })
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>프로필 정보를 알려주세요</Text>
      <Text>성별*</Text>
      <View
        style={{
          width: "70%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button title={"남성"} color={"pink"} onPress={() => {}}></Button>
        <Button title={"여성"} color={"pink"}></Button>
      </View>
      <Text>닉네임*</Text>
      <TextInput
        onChangeText={(text) => {
          setNickName(text);
        }}
        value={nickName}
        placeholder="Enter Your NickName..."
        style={{ borderWidth: 0.5, margin: 10, padding: 5 }}
      />
      <Text>MBTI*</Text>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button title={"E"} color={"pink"}></Button>
        <Button title={"S"} color={"pink"}></Button>
        <Button title={"T"} color={"pink"}></Button>
        <Button title={"P"} color={"pink"}></Button>
      </View>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button title={"I"} color={"pink"}></Button>
        <Button title={"N"} color={"pink"}></Button>
        <Button title={"F"} color={"pink"}></Button>
        <Button title={"J"} color={"pink"}></Button>
        <Button title={"잘 몰라요"} color={"pink"}></Button>
      </View>
      <Button
        title={"다음"}
        color={"black"}
        onPress={() => {
          onNext();
          navigation.navigate("Pref");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default BasicInfoSetScreen;
