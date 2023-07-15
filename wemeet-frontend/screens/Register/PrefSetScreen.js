import {
  TextInput,
  Button,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
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
const getCurrentYear = () => {
  //올해 학번 리턴
  const now = new Date();
  return now.getFullYear() % 100;
};
const PrefSetScreen = ({ navigation }) => {
  const curYear = getCurrentYear();
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
  const onPrefMbtiClick = (chr, idx) => {
    switch (idx) {
      case 0:
        setPrefMbti(chr + prefMbti.substring(1));
        break;
      case 1:
        setPrefMbti(prefMbti[0] + chr + prefMbti.substring(2));
        break;
      case 2:
        setPrefMbti(prefMbti.substring(0, 2) + chr + prefMbti[3]);
        break;
      case 3:
        setPrefMbti(prefMbti.substring(0, 3) + chr);
        break;
      default:
        console.log("Error while setting mbti");
    }
  };
  const onNext = () => {
    dispatch(
      setPrefInfo({
        preference_meeting_type: meetingType,
        start_preference_admission_year: "",
        end_preference_admission_year: "",
        same_college_state: sameCollege,
        drinking_option: drinking,
        e_or_i: prefMbti[0],
        s_or_n: prefMbti[1],
        t_or_f: prefMbti[2],
        j_or_p: prefMbti[3],
      })
    );
    navigation.navigate("UnivSet");
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
            onMeetingTypePressed("C001");
          }}
        />
        <Button
          title={"술게임 좋아요"}
          color={meetingType.C002 ? "pink" : "gray"}
          onPress={() => {
            onMeetingTypePressed("C002");
          }}
        />
        <Button
          title={"친구 만나고 싶어요"}
          color={meetingType.C003 ? "pink" : "gray"}
          onPress={() => {
            onMeetingTypePressed("C003");
          }}
        />
        <Button
          title={"설레고 싶어요"}
          color={meetingType.C004 ? "pink" : "gray"}
          onPress={() => {
            onMeetingTypePressed("C004");
          }}
        />
        <Button
          title={"상관없어요"}
          color={meetingType.C005 ? "pink" : "gray"}
          onPress={() => {
            onMeetingTypePressed("C005");
          }}
        />
        <Text>선호하는 학번*</Text>
        {/* 선호하는 학번 -> range로 구현!! */}
        <Button title={"상관없어요"} color={"pink"} />
        <Text>같은 학교 여부*</Text>
        <Button
          title={"같은 학교가 좋아요"}
          color={sameCollege == 0 ? "pink" : "gray"}
          onPress={() => {
            setSameCollege(0);
          }}
        />
        <Button
          title={"같은 학교는 싫어요"}
          color={sameCollege == 1 ? "pink" : "gray"}
          onPress={() => {
            setSameCollege(1);
          }}
        />
        <Button
          title={"상관없어요"}
          color={sameCollege == 2 ? "pink" : "gray"}
          onPress={() => {
            setSameCollege(2);
          }}
        />
        {/* MVP 이후 아는사람 피하기&연락처 연동 기능 추가 */}
        <Text>상대 팀 MBTI*</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            title={"E"}
            color={prefMbti[0] == "E" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("E", 0);
            }}
          />
          <Button
            title={"I"}
            color={prefMbti[0] == "I" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("I", 0);
            }}
          />
          <Text>가 많으면 좋아요</Text>
          <Button
            title={"상관없어요"}
            color={prefMbti[0] == "0" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("0", 0);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            title={"S"}
            color={prefMbti[1] == "S" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("S", 1);
            }}
          />
          <Button
            title={"N"}
            color={prefMbti[1] == "N" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("N", 1);
            }}
          />
          <Text>가 많으면 좋아요</Text>
          <Button
            title={"상관없어요"}
            color={prefMbti[1] == "0" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("0", 1);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            title={"T"}
            color={prefMbti[2] == "T" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("T", 2);
            }}
          />
          <Button
            title={"F"}
            color={prefMbti[2] == "F" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("F", 2);
            }}
          />
          <Text>가 많으면 좋아요</Text>
          <Button
            title={"상관없어요"}
            color={prefMbti[2] == "0" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("0", 2);
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Button
            title={"P"}
            color={prefMbti[3] == "P" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("P", 3);
            }}
          />
          <Button
            title={"J"}
            color={prefMbti[3] == "J" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("J", 3);
            }}
          />
          <Text>가 많으면 좋아요</Text>
          <Button
            title={"상관없어요"}
            color={prefMbti[3] == "0" ? "pink" : "gray"}
            onPress={() => {
              onPrefMbtiClick("0", 3);
            }}
          />
        </View>
        <Button title={"다음"} color={"pink"} onPress={onNext} />
        {/* 술자리 여부 선호 만남 특징 선호 학번 같은 학교 여부 아는사람 피하기 상대팀MBTI */}
        {/* 선호학번은 range로 설정할수있게 구현 */}
        {/*아는 사람 피하기 (모달로 구현)*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrefSetScreen;
