import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";
import NextButton from "../../components/NextButton";

const instruction = "위밋은\n너가 궁금해";
const GenderScreen = ({ navigation }) => {
  const [gender, setGender] = useState("여자");
  const toNext = () => {
    navigation.navigate("Nickname");
    //redux state에 성별 저장하기
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 200,
        }}
      >
        성별 : 남성 ? 여성?
      </Text>
      {/* <TextInput style={{ flex: 1, borderWidth: 10 }} /> */}
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{ alignSelf: "center", position: "absolute", bottom: 30 }}
      />
    </SafeAreaView>
  );
};

export default GenderScreen;
