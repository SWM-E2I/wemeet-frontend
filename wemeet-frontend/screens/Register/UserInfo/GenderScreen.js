import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";
import RegisterAnimatedView from "../../../components/register/RegisterAnimatedView";
import { useDispatch } from "react-redux";
import { setRegisterGender } from "../../../redux/registerSlice";

const instruction = "위밋은\n너가 궁금해";
const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false); //select 창을 open할지\
  const dispatch = useDispatch();
  const toNext = () => {
    if (gender) {
      dispatch(setRegisterGender(gender === "여자" ? "FEMALE" : "MALE"));
      navigation.navigate("Nickname");
    } else Alert.alert("성별을 선택해줘!");
    //redux state에 성별 저장하기
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <RegisterSelectView
          text={gender ? gender : "성별"}
          onPress={() => {
            setOpen(!open);
          }}
          color={"#E9E9E9"}
        />
        {open ? (
          <>
            <RegisterAnimatedView
              text={"여자"}
              style={{ borderWidth: 2 }}
              open
              duration={300}
              onPress={() => {
                setGender("여자");
                setOpen(false);
              }}
            />
            <RegisterAnimatedView
              text={"남자"}
              style={{ borderWidth: 2 }}
              open
              duration={260}
              onPress={() => {
                setGender("남자");
                setOpen(false);
              }}
            />
          </>
        ) : null}
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

export default GenderScreen;
