import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import UnivSet from "../../../components/UnivSet";
import { CommonActions } from "@react-navigation/native";

const instruction = "너의 학교가\n궁금해";
const UnivScreen = ({ navigation }) => {
  //애니메이션 적용, 너의 학교가 궁금해 & animated view 3개
  //학교이름, 단과대, 학번까지 입력받기

  const [stage, setStage] = useState(1); //1 : 학교선택 -> 2 : 단과대선택 -> 3 : 학번입력
  const [univ, setUniv] = useState(""); //대학
  const [college, setCollege] = useState(""); //단과대
  const [admissionYear, setAdmissionYear] = useState(""); //입학년도
  const toNext = () => {
    if (stage === 3) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Drink" }],
        })
      );
    } else setStage(stage + 1);
    //redux state에 성별 저장하기
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
        <UnivSet
          stage={stage}
          univ={univ}
          setUniv={setUniv}
          college={college}
          setCollege={setCollege}
          admissionYear={admissionYear}
          setAdmissionYear={setAdmissionYear}
        />
      </View>
      {/* 이부분 다시 생각 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <NextButton
          text={"다음"}
          onPress={toNext}
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UnivScreen;
