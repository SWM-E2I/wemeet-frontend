import {
  SafeAreaView,
  Button,
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import commonStyles from "../../../styles/commonStyles";
import registerStyles from "../../../styles/registerStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import { useDispatch } from "react-redux";
import { setHasMainProfileImage } from "../../../redux/persistSlice";
import { CommonActions } from "@react-navigation/native";

const instruction = "너의 사진을\n등록해줘";
const PhotoSetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(null);
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
  const pickImageAsync = async () => {
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
      // aspect: [4, 3],
    });
    if (!result.canceled) setProfileImg(result.assets[0].uri);
    else console.log("사진을 선택하지 않음");
  };
  const onPress = () => {
    //수정하기, 사진 등록하기 버튼 눌렀을 경우 -> API요청 보내야함

    dispatch(setHasMainProfileImage(true));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Additional" }],
      })
    );
  };
  useEffect(() => {
    getPermission();
  }, []);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      {/* {granted && <Text>'설정'의 'we-meet'에서 사진 권한을 설정해주세요.</Text>} */}
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            lineHeight: 20,
            color: "gray",
          }}
        >
          {
            "다른 사람에게 보여지는 내 프로필 화면이에요\n서로 매칭되기 전까지는 사진 원본이 공개되지 않아요"
          }
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            // borderWidth: 1,
            marginTop: 10,
            height: 400,
            width: "85%",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            pickImageAsync(0);
          }}
        >
          {profileImg ? (
            //resizeMode 다시 보기, 누르고 있는 동안은 원본 사진 볼 수 있게! (pressable 활용!)
            <Image
              source={{ uri: profileImg }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 15,
              }}
              blurRadius={30}
              resizeMode={"cover"}
            />
          ) : (
            <>
              <FontAwesome5 name="camera" size={40} color="gray" />
              <Text
                style={{
                  color: "gray",
                  fontSize: 20,
                  letterSpacing: 2,
                  textAlign: "center",
                }}
              >
                1/2
              </Text>
              <Text
                style={{
                  width: "90%",
                  color: "gray",
                  position: "absolute",
                  fontSize: 13,
                  bottom: 40,
                  textAlign: "center",
                }}
              >
                대표 사진은 자신을 가장 잘 나타낼 수 있는 사진이야!{"\n"}
                눈코입을 전부 확인할 수 있는 사진을 올려줘
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <NextButton text={"사진 등록하기"} onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default PhotoSetScreen;
