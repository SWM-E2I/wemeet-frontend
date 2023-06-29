import {
  TextInput,
  Button,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBasicInfo } from "../../redux/registerSlice.js";

const MALE = "MALE";
const FEMALE = "FEMALE";
const DEFAULT_MBTI = "ESTP"; //상관없어요 : 'nothing'

const BasicInfoSetScreen = ({ navigation }) => {
  const phoneNumber = useSelector((state) => {
    return state.register.phone_number;
  });
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState(MALE);
  const [mbti, setMbti] = useState(DEFAULT_MBTI);
  //다 선택해야 넘어갈 수 있게 구현
  //클릭시 색깔 바뀌도록 (구별되도록) 구현 -> 초기값 (남성, "",)

  const onMbtiClick = (chr, idx) => {
    const tmpMbti = mbti === "0000" ? DEFAULT_MBTI : mbti;
    switch (idx) {
      case 0:
        setMbti(chr + tmpMbti.substring(1));
        break;
      case 1:
        setMbti(tmpMbti[0] + chr + tmpMbti.substring(2));
        break;
      case 2:
        setMbti(tmpMbti.substring(0, 2) + chr + tmpMbti[3]);
        break;
      case 3:
        setMbti(tmpMbti.substring(0, 3) + chr);
        break;
      default:
        console.log("Error while setting mbti");
    }
  };

  const onNext = () => {
    //' 다음 ' 버튼 클릭시
    if (nickName.length <= 0)
      Alert.alert("닉네임을 한 글자 이상 입력해주세요!");
    else {
      Alert.alert(
        "입력하신 정보를 확인해주세요",
        `닉네임 : ${nickName}\n성별 : ${
          gender === "MALE" ? "남성" : "여성"
        }\nMBTI : ${mbti === "0000" ? "상관없어요" : mbti}`,
        [
          {
            text: "다시 입력",
          },
          {
            text: "네 맞아요",
            onPress: () => {
              dispatch(
                setBasicInfo({
                  phone_number: phoneNumber,
                  nickname: nickName,
                  gender: gender,
                  mbti: mbti === "0000" ? "NOTHING" : mbti,
                })
              );
              navigation.navigate("Pref");
            },
          },
        ],
        {
          cancelable: true, //for Android only
        }
      );
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
            setGender(MALE);
          }}
        ></Button>
        <Button
          title={"여성"}
          color={gender === FEMALE ? "pink" : "gray"}
          onPress={() => setGender(FEMALE)}
        ></Button>
      </View>
      <Text>닉네임*</Text>
      <TextInput
        onChangeText={(text) => {
          setNickName(text);
        }}
        value={nickName}
        placeholder="한 글자 이상 입력해주세요"
        maxLength={10}
        inputMode={"text"}
        style={{
          height: 35,
          width: 200,
          borderWidth: 0.5,
          margin: 10,
          padding: 5,
          borderRadius: 10,
        }}
      />
      <Text>MBTI*</Text>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          title={"E"}
          color={mbti[0] === "E" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("E", 0);
          }}
        ></Button>
        <Button
          title={"S"}
          color={mbti[1] === "S" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("S", 1);
          }}
        ></Button>
        <Button
          title={"T"}
          color={mbti[2] === "T" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("T", 2);
          }}
        ></Button>
        <Button
          title={"P"}
          color={mbti[3] === "P" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("P", 3);
          }}
        ></Button>
      </View>
      <View
        style={{
          width: "50%",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          title={"I"}
          color={mbti[0] === "I" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("I", 0);
          }}
        ></Button>
        <Button
          title={"N"}
          color={mbti[1] === "N" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("N", 1);
          }}
        ></Button>
        <Button
          title={"F"}
          color={mbti[2] === "F" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("F", 2);
          }}
        ></Button>
        <Button
          title={"J"}
          color={mbti[3] === "J" ? "pink" : "gray"}
          onPress={() => {
            onMbtiClick("J", 3);
          }}
        ></Button>
        <Button
          title={"잘 몰라요"}
          color={mbti === "0000" ? "pink" : "gray"}
          onPress={() => {
            setMbti("0000");
          }}
        ></Button>
      </View>
      <Button title={"다음"} color={"black"} onPress={onNext}></Button>
    </SafeAreaView>
  );
};

export default BasicInfoSetScreen;
