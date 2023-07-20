import { SafeAreaView, Text } from "react-native";
import React from "react";
import NextButton from "../../../components/NextButton";

const instruction = "너가 대학생인걸\n우리에게 알려줘!";
const UnivVerifyScreen = ({ navigation }) => {
  const onNext = () => {
    navigation.navigate("PhotoSet");
  };
  return (
    <SafeAreaView>
      <Text>UnivVerifyScreen</Text>
      <NextButton text={"다음"} onPress={onNext} />
    </SafeAreaView>
  );
};

export default UnivVerifyScreen;
