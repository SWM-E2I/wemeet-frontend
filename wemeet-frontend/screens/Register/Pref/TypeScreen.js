import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";

const instruction = "어떤 미팅\n상대를 원하니";
const defaultMeetingType = {
  C001: false,
  C002: false,
  C003: false,
  C004: false,
  C005: true,
};
const typeText = [
  "모두가 활발한 인싸 분위기",
  "술게임 좋아요",
  "친구 만나고 싶어요",
  "설레고 싶어요",
  "상관 없어요",
];
const typeCode = ["C001", "C002", "C003", "C004", "C005"];
/*
C001 : 모두가 활발한 인싸 분위기
C002 : 술게임 좋아요
C003 : 친구 만나고 싶어요
C004 : 설레고 싶어요
C005 : 상관 없어요
*/
const TypeScreen = ({ navigation }) => {
  const [meetingType, setMeetingType] = useState(defaultMeetingType);
  console.log(meetingType);
  const onMeetingTypePressed = (code) => {
    //코드 수정필요!!!
    if (!meetingType[code]) {
      //false -> true
      if (code == "C005") {
        //1. 미선택 -> 선택 && 상관없어요 클릭시
        setMeetingType(defaultMeetingType);
      } else {
        //2. 미선택 -> 선택 && 그 외 클릭시
        let tmpMeetingType = { ...meetingType };
        tmpMeetingType[code] = true;
        tmpMeetingType.C005 = false;
        setMeetingType(tmpMeetingType);
      }
    } else if (code != "C005") {
      //3. 선택 취소
      let tmpMeetingType = { ...meetingType };
      //나머지가 모두 취소된 상태인지 검사
      tmpMeetingType[code] = false;
      for (var c in tmpMeetingType) {
        if (c != code && c != "C005" && tmpMeetingType[c]) {
          setMeetingType(tmpMeetingType);
          return;
        }
      }
      //다 취소된 경우
      setMeetingType(defaultMeetingType);
    }
  };
  const toNext = () => {
    navigation.navigate("AdmissionYear");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        {typeText.map((text, index) => (
          <RegisterSelectView
            key={index}
            text={text}
            disabled={!meetingType[typeCode[index]]}
            onPress={() => onMeetingTypePressed(typeCode[index])}
          />
        ))}
      </View>
      {/* 이부분 다시 생각 */}
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default TypeScreen;
