import { SafeAreaView, Text, Button } from "react-native";
import React from "react";

const InitialProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>InitialProfileScreen</Text>
      <Button
        title={"나의 팀 관리"}
        onPress={() => {
          navigation.navigate("MyTeam");
        }}
      />
    </SafeAreaView>
  );
};

export default InitialProfileScreen;
