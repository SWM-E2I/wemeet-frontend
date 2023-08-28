import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorBlack2,
  subColorBlue,
  subColorPink,
} from "../../../styles/commonStyles";
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
  const [gender, setGender] = useState("WOMAN");
  const dispatch = useDispatch();
  const toNext = () => {
    if (gender) {
      dispatch(setRegisterGender(gender));
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
      <Text style={registerStyles.labelText}>성별을 선택해줘</Text>
      <View style={{ flex: 1, alignItems: "center", paddingHorizontal: "7%" }}>
        {/* 여기에 body내용 입력 */}
        <View
          style={{
            flexDirection: "row",
            height: 60,
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "47%",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: gender == "WOMAN" ? "black" : subColorBlack2,
            }}
            onPress={() => {
              setGender("WOMAN");
            }}
          >
            <Text
              style={{
                fontFamily: "pretendard500",
                fontSize: 20,
                color: gender == "WOMAN" ? subColorPink : "white",
              }}
            >
              여자
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: "100%",
              width: "47%",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: gender == "MAN" ? "black" : subColorBlack2,
            }}
            onPress={() => {
              setGender("MAN");
            }}
          >
            <Text
              style={{
                fontFamily: "pretendard500",
                fontSize: 20,
                color: gender == "MAN" ? subColorPink : "white",
              }}
            >
              남자
            </Text>
          </TouchableOpacity>
        </View>
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
