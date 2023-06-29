import {
  TextInput,
  Button,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPrefInfo } from "../../redux/registerSlice.js";
/*
C001 : 모두가 활발한 인싸 분위기
C002 : 술게임 좋아요
C003 : 친구 만나고 싶어요
C004 : 설레고 싶어요
C005 : 상관 없어요
*/
const PrefSetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [drinking, setDrinking] = useState(2);
  const defaultMeetingType = {
    C001: false,
    C002: false,
    C003: false,
    C004: false,
    C005: true,
  };
  const [meetingType, setMeetingType] = useState(defaultMeetingType); //multiple select 구현, 마지막에 구현하기
  const [startAdmissionYear, setStartAdmissionYear] = useState("");
  const [endAdmissionYear, setEndAdmissionYear] = useState("");
  const [sameCollege, setSameCollege] = useState(2);
  const [prefMbti, setPrefMbti] = useState("ESTP");
  const onMeetingPressed = (code) => {
    //코드 수정필요!!!
    if (!meetingType[code]) {
      //false -> true
      if (code == "C005") {
        setMeetingType(defaultMeetingType);
      } else {
        let tmpMeetingType = meetingType;
        tmpMeetingType[code] = true;
        tmpMeetingType.C005 = false;
        setMeetingType({ ...tmpMeetingType });
        console.log(tmpMeetingType);
      }
    } else if (code != "C005") {
      //클릭 취소인데 다 취소된경우 (C005를 True로 바꿔줘야함!!)
      //true -> false
      // let tmpMeetingType = meetingType;
      // tmpMeetingType[code] = false;
      // setMeetingType({ ...tmpMeetingType });
      // let codeList = ['C001', 'C002', 'C003', 'C004'];
      // for (var i =0; i<4; i++){
      //   if (codeList[i] != code && meetingType.codeList[i])
      // }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/* multiple select 가능하게 */}
      <ScrollView>
        <Text>선호 상대에 대해 알려주세요</Text>
        <Text>술자리 여부*</Text>
        <Button
          title={"술자리 괜찮아요"}
          color={drinking == 0 ? "pink" : "gray"}
          onPress={() => {
            setDrinking(0);
          }}
        />
        <Button
          title={"술 없이도 즐거워요"}
          color={drinking == 1 ? "pink" : "gray"}
          onPress={() => {
            setDrinking(1);
          }}
        />
        <Button
          title={"상관없어요"}
          color={drinking == 2 ? "pink" : "gray"}
          onPress={() => {
            setDrinking(2);
          }}
        />
        <Text>선호하는 만남 특징*</Text>
        <Button
          title={"모두가 활발한 인싸 분위기"}
          color={meetingType.C001 ? "pink" : "gray"}
          onPress={() => {
            onMeetingPressed("C001");
          }}
        />
        <Button
          title={"술게임 좋아요"}
          color={meetingType.C002 ? "pink" : "gray"}
          onPress={() => {
            onMeetingPressed("C002");
          }}
        />
        <Button
          title={"친구 만나고 싶어요"}
          color={meetingType.C003 ? "pink" : "gray"}
          onPress={() => {
            onMeetingPressed("C003");
          }}
        />
        <Button
          title={"설레고 싶어요"}
          color={meetingType.C004 ? "pink" : "gray"}
          onPress={() => {
            onMeetingPressed("C004");
          }}
        />
        <Button
          title={"상관없어요"}
          color={meetingType.C005 ? "pink" : "gray"}
          onPress={() => {
            onMeetingPressed("C005");
          }}
        />
        <Text>선호하는 학번*</Text>
        {/* 선호하는 학번 -> range로 구현!! */}
        <TextInput />
        <Button title={"상관없어요"} color={"pink"} />
        <Text>같은 학교 여부*</Text>
        <Button title={"같은 학교가 좋아요"} color={"pink"} />
        <Button title={"같은 학교는 싫어요"} color={"pink"} />
        <Button title={"상관없어요"} color={"pink"} />
        {/* MVP 이후 아는사람 피하기&연락처 연동 기능 추가 */}
        <Text>상대 팀 MBTI*</Text>
        <View style={{ flexDirection: "row" }}>
          <Button title={"E"} />
          <Button title={"I"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"S"} />
          <Button title={"N"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"T"} />
          <Button title={"F"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title={"P"} />
          <Button title={"J"} />
          <Text>가 많으면 좋아요</Text>
          <Button title={"상관없어요"} />
        </View>
        <Button
          title={"다음"}
          color={"pink"}
          onPress={() => {
            navigation.navigate("UnivSet");
          }}
        ></Button>
        {/* 술자리 여부 선호 만남 특징 선호 학번 같은 학교 여부 아는사람 피하기 상대팀MBTI */}
        {/* 선호학번은 range로 설정할수있게 구현 */}
        {/*아는 사람 피하기 (모달로 구현)*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrefSetScreen;
