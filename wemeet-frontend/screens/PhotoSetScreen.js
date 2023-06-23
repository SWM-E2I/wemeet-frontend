import { SafeAreaView, Button, View, Text } from "react-native";
import React from "react";

const PhotoSetScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>본인 사진을 등록해주세요 (대표사진 1장, 추가사진 1장)</Text>
      <Button
        title={"다음"}
        onPress={() => {
          navigation.navigate("AddInfoSet");
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default PhotoSetScreen;
