import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";

const instruction = "너의\n이름을 알려줘";
const NameScreen = ({ navigation }) => {
  const nameRef = useRef();
  const [name, setName] = useState("");
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const onSubmit = () => {
    navigation.navigate("PhoneNum");
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
            ref={nameRef}
            onChangeText={(text) => {
              setName(text);
            }}
            onSubmitEditing={onSubmit}
            value={name}
            placeholder={"이름을 입력하세요"}
            style={registerStyles.inputTextBox}
            maxLength={10}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
