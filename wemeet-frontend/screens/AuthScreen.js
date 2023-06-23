import { Button, View, Text, SafeAreaView } from "react-native";
import React from "react";

const AuthScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Phone Verification</Text>
      <Button
        title={"다음"}
        onPress={() => {
          navigation.navigate("Basic");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default AuthScreen;
