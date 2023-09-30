import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import commonStyles, { subColorPink } from "../../../styles/commonStyles";
import { useSelector } from "react-redux";
import NextButton from "../../../components/NextButton";
import { recommenderApi } from "../../../api/register";

const instruction = "추천인을 입력해줘 (선택)";
const RecommenderScreen = ({ navigation }) => {
  const controller = new AbortController();
  const [recommender, setRecommender] = useState("010");
  const [warning, setWarning] = useState(null); //잘못 입력했을시 안내 멘트
  const [loading, setLoading] = useState(false); //API응답대기여부
  const onSubmit = async () => {
    if (recommender.substring(0, 3) != "010" || recommender.length < 11) {
      setWarning("휴대폰 번호를 정확히 입력해주세요");
      setRecommender("010");
    } else {
      setWarning("인증번호 요청중입니다. 잠시만 기다려주세요.");
      setLoading(true);
      let result = await recommenderApi(recommender, navigation, controller);
      setLoading(false);
      if (result) {
        console.log("추천인 등록 성공", recommender);
        Alert.alert(
          "추천 친구 등록 성공",
          `추천 친구(${recommender})에게\n시그널이 지급되었어!`
        );
        setWarning(null);
        navigation.navigate("Additional"); //어디로 갈지 UX 상의 후 다시 결정
      } else {
        setWarning("오류가 발생했습니다. 다시 시도해주세요.");
        setRecommender("010");
      }
    }
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={{ marginBottom: 20 }}>
        <Text style={registerStyles.instText}>{instruction}</Text>

        <Text
          style={[
            commonStyles.teamGenerateInstruction2,
            {
              marginLeft: "8%",
              marginTop: 10,
              color: subColorPink,
              fontFamily: "pretendard500",
            },
          ]}
        >
          {"📢 추천 친구에게 20 시그널을 선물해줄게"}
        </Text>
      </View>
      <Text style={registerStyles.labelText}>추천인 번호 입력</Text>
      <Pressable
        style={{ flex: 1, alignItems: "center" }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={recommender}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setRecommender(text);
            }}
            autoFocus
            blurOnSubmit={false}
            keyboardType={"number-pad"}
            maxLength={11}
            placeholder={"예시) 01099999999"}
            onSubmitEditing={onSubmit}
            editable={!loading}
            placeholderTextColor={"#C4C4C4"}
          />
        </View>
        {warning && (
          <View style={{ width: "100%" }}>
            <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
              {warning}
            </Text>
          </View>
        )}
        <NextButton
          text={"건너뛰기"}
          onPress={() => {
            navigation.navigate("Additional");
          }}
          style={{
            alignSelf: "center",
            marginBottom: 20,
            backgroundColor: "black",
            // borderColor: "#9C9C9C",
            // borderWidth: 0.5,
            height: 35,
            borderRadius: 10,
          }}
          textStyle={{ fontSize: 16, color: subColorPink }}
        />
      </Pressable>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <NextButton
          text={"입력 완료"}
          onPress={onSubmit}
          style={{
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: subColorPink,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RecommenderScreen;
