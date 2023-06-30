import { SafeAreaView, Button, View, Text } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const PhotoSetScreen = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("카메라 롤에 접근하기 위한 권한이 필요합니다!");
      }
    })();
  }, []);
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
