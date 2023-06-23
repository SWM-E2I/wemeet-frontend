import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
//로그인 정보 확인, 새로 설치한 경우 여기서 member type및 화면에 따라 분기.
const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    console.log("initial screen mount");
    navigation.navigate("Terms");
    return () => {
      console.log("initial screen unmount");
    };
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>InitialScreen</Text>
    </SafeAreaView>
  );
};

export default InitialScreen;
