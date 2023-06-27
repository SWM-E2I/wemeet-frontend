import { SafeAreaView, Button, View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddInfoSetScreen = ({ navigation }) => {
  //취미 및 관심사 - 모달 구현
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>추가 정보 입력</Text>
      {/* (취미 및 관심사-최대 4개, 자기소개, 추천인 코드 입력) */}
      <Button
        title={"다음"}
        onPress={() => {
          navigation.replace("Main");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default AddInfoSetScreen;
