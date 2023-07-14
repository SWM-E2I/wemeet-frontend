import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";

const instruction = "너의\n이름을 알려줘";
const NameScreen = ({ navigation }) => {
  //redux 전역 상태 변경하기!!
  const [name, setName] = useState("");
  const onSubmit = () => {
    navigation.navigate("PhoneNum");
    //한글자 이상, 예외처리하기
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
      </View>
      <RegisterCreditView currentCredit={5} />
      <View style={{ alignItems: "center" }}>
        <View style={registerStyles.inputTextView}>
          <TextInput
            onChangeText={(text) => {
              setName(text);
            }}
            onSubmitEditing={onSubmit}
            value={name}
            placeholder={"이름을 입력하세요"}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            maxLength={10}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
