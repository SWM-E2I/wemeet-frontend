import {
  TextInput,
  Button,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBasicInfo } from "../../redux/registerSlice.js";

const MALE = "M";
const FEMALE = "F";
const DEFAULT_MBTI = "0000";

const BasicInfoSetScreen = ({ navigation }) => {
  const phoneNumber = useSelector((state) => {
    return state.register.basic_info.phone_number;
  });
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState(MALE);
  const [mbti, setMbti] = useState(DEFAULT_MBTI);
  //다 선택해야 넘어갈 수 있게 구현
  //클릭시 색깔 바뀌도록 (구별되도록) 구현 -> 초기값 (남성, "",)

  const onNext = () => {
    //' 다음 ' 버튼 클릭시
    dispatch(
      setBasicInfo({
        phone_number: phoneNumber,
        nickname: nickName,
        gender: gender,
        mbti: mbti,
      })
    );
    console.log(basicInfo);
  };

  const checkDone = () => {
    //입력한 내용 띄워주고 확인 누르면 넘어갈 수 있게 구현하기
    if (nickName.length <= 0) {
      Alert.alert("닉네임을 한 글자 이상 입력해주세요.");
    } else {
      Alert.alert("입력하신 정보가 맞는지 확인해주세요. 진행하시겠습니까?");
    }
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
        <Button
          title={"남성"}
          color={gender === MALE ? "pink" : "gray"}
          onPress={() => {
            setGender("M");
          }}
        ></Button>
        <Button
          title={"여성"}
          color={gender === FEMALE ? "pink" : "gray"}
          onPress={() => setGender("F")}
        ></Button>
      </View>
      <Text>닉네임*</Text>
      <TextInput
        onChangeText={(text) => {
          setNickName(text);
        }}
        value={nickName}
        placeholder="Enter Your NickName..."
        style={{ borderWidth: 0.5, margin: 10, padding: 5, borderRadius: 10 }}
      />
      <Text>MBTI*</Text>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button title={"E"} color={"pink"} onPress={() => {}}></Button>
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
          checkDone();
          navigation.navigate("Pref");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default BasicInfoSetScreen;
