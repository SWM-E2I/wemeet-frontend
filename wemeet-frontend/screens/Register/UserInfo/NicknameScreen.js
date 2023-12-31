import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles, { subColorPink } from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import SkipButton from "../../../components/SkipButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setRegisterNickName } from "../../../redux/registerSlice";

const instruction = "원하는\n닉네임을 알려줘";
const NicknameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const toNext = () => {
    var koreanRegExp = /^[가-힣]+$/;
    if (koreanRegExp.test(nickName)) {
      dispatch(setRegisterNickName(nickName)); //redux state에 성별 저장하기
      navigation.navigate("Mbti");
    } else
      Alert.alert(
        "유효하지 않은 닉네임이야!",
        "닉네임은 한글만 입력 가능해\n공백,특수문자 없이 입력해줘!"
      );
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={20} />
      </View>
      <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
        닉네임
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <View style={[registerStyles.inputTextView]}>
          <TextInput
            value={nickName}
            onChangeText={(text) => {
              setNickName(text.slice(0, 5));
            }}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            autoFocus
            enablesReturnKeyAutomatically
            placeholder={"5자 이내로 입력 가능해!"}
            maxLength={6}
            placeholderTextColor={"#C4C4C4"}
          ></TextInput>
        </View>
      </View>
      {/* 이부분 다시 생각 */}
      {/* <ScrollView> */}
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
            backgroundColor: nickName.length > 0 ? subColorPink : "black",
          }}
          disabled={nickName.length > 0 ? false : true}
        />
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default NicknameScreen;
