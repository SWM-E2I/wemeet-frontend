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
import {
  setRegisterCollegeInfo,
  setRegisterPhoneNum,
} from "../../../redux/registerSlice";
import { registerApi } from "../../../api/register";
import { AntDesign } from "@expo/vector-icons";

const instruction = "대학 정보를\n입력해줘";

const UnivScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // dispatch(setRegisterPhoneNum("+821083761996")); //임시
  const registerInfo = useSelector((state) => state.register);
  // console.log(registerInfo);
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
    if (univ != "" && college != "" && admissionYear != "") {
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
          "추가 정보를 입력하면\n서비스를 정상적으로 이용할 수 있어"
        );
        console.log("회원가입 성공, 추천인 입력 페이지로 이동");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Recommender" }],
          })
        );
      } else Alert.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } else {
      Alert.alert("학교, 계열, 학번을 모두 선택해줘");
    }
  };

  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back onBack={onBack} />
      <View style={[registerStyles.instContainer, { marginBottom: 5 }]}>
        <Text style={registerStyles.instText}>{`${instruction}`}</Text>
        <RegisterCreditView currentCredit={40} />
      </View>
      <Text
        style={[
          commonStyles.teamGenerateInstruction2,
          {
            fontSize: 13,
            color: subColorPink,
            lineHeight: 20,
            marginBottom: 10,
            marginLeft: "6%",
          },
        ]}
      >
        🚨 더 많은 대학은 곧 업데이트 예정이니 조금만 기다려줘!
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <UnivSet
          univ={univ}
          setUniv={setUniv}
          college={college}
          setCollege={setCollege}
          admissionYear={admissionYear}
          setAdmissionYear={setAdmissionYear}
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
