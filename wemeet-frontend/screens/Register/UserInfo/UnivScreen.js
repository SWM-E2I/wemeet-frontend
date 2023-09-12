import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles, { subColorPink } from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import UnivSet from "../../../components/register/UnivSet";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterCollegeInfo } from "../../../redux/registerSlice";
import { registerApi } from "../../../api/register";

const instruction = "너의 학교가\n궁금해";
const UnivScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const registerInfo = useSelector((state) => state.register);
  const [stage, setStage] = useState(1); //1 : 학교선택 -> 2 : 단과대선택 -> 3 : 학번입력
  const [univ, setUniv] = useState(""); //대학
  const [college, setCollege] = useState(""); //단과대
  const [admissionYear, setAdmissionYear] = useState(""); //입학년도
  const controller = new AbortController();
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  const toNext = async () => {
    switch (stage) {
      case 1:
        if (univ != "") setStage(stage + 1);
        break;
      case 2:
        if (college != "") setStage(stage + 1);
        break;
      case 3:
        if (admissionYear != "") {
          //여기서 회원가입 api 실행해야함! (수정필요)
          dispatch(
            setRegisterCollegeInfo({
              college: univ,
              collegeType: college,
              admissionYear: admissionYear,
            })
          );
          let registerData = {
            ...registerInfo,
            collegeInfo: {
              collegeCode: univ,
              collegeType: college,
              admissionYear: admissionYear,
            },
          };
          console.log(registerData);
          // await 회원가입 api 실행
          let result = await registerApi(registerData, controller);
          if (result) {
            Alert.alert(
              "위밋 회원이 된 걸 환영해!",
              "이제 대학생 인증만 완료하면\n서비스를 정상적으로 이용할 수 있어"
            );
            console.log("회원가입 성공, 추가정보 분기 페이지로 이동");
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Additional" }],
              })
            );
          } else Alert.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
        break;
      default:
        return;
    }
  };

  const onBack = () => {
    if (stage > 1) setStage(stage - 1);
    else navigation.goBack();
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back onBack={onBack} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView
          currentCredit={stage == 1 ? 34 : stage == 2 ? 37 : 40}
        />
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
          setStage={setStage}
          navigation={navigation}
        />
      </View>
      {/* 이부분 다시 생각 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <NextButton
          text={"다음"}
          onPress={toNext}
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: subColorPink,
          }}
          // disabled={admissionYear.length > 0 ? false : true}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UnivScreen;
