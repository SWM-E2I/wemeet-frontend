import { SafeAreaView, View, Text } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";
import { useDispatch } from "react-redux";
import { setPreferenceMeetingTypeList } from "../../../redux/preferSlice";
const instruction = "어떤 미팅\n상대를 원하니";
const defaultMeetingType = {
  C001: false,
  C002: false,
  C003: false,
  C004: false,
  C005: true,
};
const typeText = [
  "모두가 활발한 E들의 모임",
  "미팅은 친구 만들러 가는거야",
  "설레는 미팅이 좋아",
  "술게임이 좋아",
  "상관없어!",
];
const typeCode = ["C001", "C002", "C003", "C004", "C005"];
const TypeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [meetingType, setMeetingType] = useState(defaultMeetingType);

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
    let list = [];
    for (let key in meetingType) {
      if (meetingType[key]) list.push(key);
    }
    dispatch(setPreferenceMeetingTypeList(list));
    console.log(list);
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
