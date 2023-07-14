import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/RegisterHeader";
import registerStyles from "../../styles/registerStyles";
import RegisterCreditView from "../../components/RegisterCreditView";
import Animated from "react-native-reanimated";
import RegisterAnimatedView from "../../components/RegisterAnimatedView";

const instruction = "휴대폰 번호를\n알려줘";
const PhoneNumScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState("");
  const [data, setData] = useState(["임시닉네임"]);
  const onSubmit = () => {
    navigation.navigate("VerifyScreen");
  };
  useEffect(() => {
    setTimeout(() => {
      setData([...data, "임심"]);
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
      </View>
      <RegisterCreditView currentCredit={5} />
      <View style={{ flex: 1 }}>
        {data.map((item, index) => (
          <RegisterAnimatedView text={item} key={index} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumScreen;
