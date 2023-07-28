import { SafeAreaView, Button, View, Text, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { CommonActions } from "@react-navigation/native";
import commonStyles from "../../../styles/commonStyles";
import registerStyles from "../../../styles/registerStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
const instruction = "너의 사진을\n등록해줘";
const PhotoSetScreen = ({ navigation }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [subImg, setSubImg] = useState(null);
  const [granted, setGranted] = useState(false);
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "사진 라이브러리 접근 불가",
        "설정>we-meet에서 사진 권한을 설정해주세요."
      );
      //iOS인경우 : wemeet어플 설정에서>사진>권한 부여 필요하다고 전달
      setGranted(false);
      return false;
    }
    setGranted(true);
    return true;
  };
  const pickImageAsync = async (type) => {
    if (!granted) {
      Alert.alert(
        "사진 라이브러리 접근 불가",
        "설정>we-meet에서 사진 권한을 설정해주세요."
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      //option finetune필요
      allowsEditing: true,
      quality: 1,
      // aspect: [4, 3], ->
    });
    if (!result.canceled && type == 0) {
      setProfileImg(result.assets[0].uri);
    } else if (!result.canceled && type == 1) {
      setSubImg(result.assets[0].uri);
    } else {
      console.log("사진을 선택하지 않음");
    }
  };
  useEffect(() => {
    getPermission();
  }, []);
  console.log("프로필", profileImg);
  console.log("추가", subImg);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <Text>
        {
          "다른 사람에게 보여지는 내 프로필 화면이에요\n서로 매칭되기 전까지는 사진 원본이 공개되지 않아요"
        }
      </Text>
      {granted && <Text>'설정'의 'we-meet'에서 사진 권한을 설정해주세요.</Text>}
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {profileImg && (
            <Image
              source={{ uri: profileImg }}
              style={{ width: 150, height: 150 }}
            ></Image>
          )}
          {subImg && (
            <Image
              source={{ uri: subImg }}
              style={{ width: 150, height: 150 }}
            ></Image>
          )}
        </View>

        <Button
          title="대표사진 업로드"
          onPress={() => {
            pickImageAsync(0);
          }}
          color={"pink"}
        />

        <Button
          theme="primary"
          title="추가사진 업로드"
          onPress={() => {
            pickImageAsync(1);
          }}
          color={"pink"}
        />
        <Button
          title={"사진 등록하기"}
          onPress={() => {
            navigation.navigate("AddInfoSet");
            //사진 업로드 API주기
          }}
          color={"pink"}
        ></Button>
        <Button
          title={"건너뛰기"}
          onPress={() => {
            //사진 업로드 API주기
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Main" }],
              })
            );
          }}
          color={"pink"}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

export default PhotoSetScreen;
