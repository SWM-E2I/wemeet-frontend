import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";

const instruction = "너의\n이름을 알려줘";
const NameScreen = ({ navigation }) => {
  //redux 전역 상태 변경하기!!
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(null);
  const onSubmit = () => {
    if (name.length < 1) setWarning("이름을 한 글자 이상 입력해주세요");
    else navigation.navigate("PhoneNum", { name: name });
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>

      <Text style={[registerStyles.labelText, {}]}>이름</Text>
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
            // blurOnSubmit={false}
            enablesReturnKeyAutomatically
            returnKeyType={"next"}
          />
        </View>
      </View>
      {name.length < 1 ? (
        <Text style={[registerStyles.warningText, { marginLeft: "10%" }]}>
          {warning}
        </Text>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default NameScreen;
