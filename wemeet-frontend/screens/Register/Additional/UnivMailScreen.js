import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import commonStyles from "../../../styles/commonStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";

const instruction = "학생인증을\n완료해줘";
const UnivMailScreen = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [warning, setWarning] = useState(null);
  const onSubmit = () => {
    navigation.navigate("UnivVerify", { mail: mail });
  };
  //loading, warning, 글자 수 최소 등, api, ac.kr 피렅링 등 기능 추가하기
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <Text style={registerStyles.labelText}>학교 메일</Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={mail}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            onChangeText={(text) => {
              setMail(text);
            }}
            autoFocus
            blurOnSubmit={false}
            // enablesReturnKeyAutomatically
            // returnKeyType={phone.length == 11 ? "done" : "none"}
            // inputMode={"numeric"}
            maxLength={40}
            placeholder={"메일 주소를 입력해줘"}
            onSubmitEditing={onSubmit}
            // editable={!loading}
          ></TextInput>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
            {warning}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UnivMailScreen;
