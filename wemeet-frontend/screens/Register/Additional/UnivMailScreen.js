import { SafeAreaView, View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import NextButton from "../../../components/NextButton";
const instruction = "너가 대학생인걸\n우리에게 알려줘!";
const UnivMailScreen = ({ navigation }) => {
  const onNext = () => {
    navigation.navigate("UnivVerify");
  };
  return (
    <SafeAreaView>
      <Text>UnivMailScreen</Text>
      <NextButton text={"다음"} onPress={onNext} />
    </SafeAreaView>
  );
};

export default UnivMailScreen;
