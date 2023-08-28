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
import commonStyles, { subColorBlack2 } from "../../../styles/commonStyles";
import registerStyles from "../../../styles/registerStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import { useDispatch } from "react-redux";
import { setHasMainProfileImage } from "../../../redux/persistSlice";
import { CommonActions } from "@react-navigation/native";
import { setProfileImgApi } from "../../../api/photoSet";

const instruction = "너의 사진을\n등록해줘";
const PhotoSetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const controller = new AbortController();
  const onMount = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "사진 라이브러리 접근이 거부됨",
          "설정>we-meet에서 사진 권한을 설정해주세요."
        );
        return null;
      }
    }
  };
  const pickImageAsync = async () => {
    if (!status?.granted) {
      Alert.alert(
        "사진 라이브러리 접근이 거부됨",
        "설정>we-meet에서 사진 권한을 설정해주세요."
      );
      const permission = await requestPermission();
      if (!permission.granted) return null;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      //option finetune필요
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      // console.log(result.assets[0]);
      setProfileImg(result.assets[0]);
    } else console.log("사진을 선택하지 않음");
  };
  const onPress = async () => {
    // loading 넣어야함
    //수정하기, 사진 등록하기 버튼 눌렀을 경우 -> API요청 보내야함
    //API에 result.assets[0]이 담긴 객체인 profileImg 객체 넘겨주기!!
    const res = await setProfileImgApi(profileImg, controller, navigation);
    console.log("photoSetScreen, setProfileImgApi result :", res);
    if (res) {
      dispatch(setHasMainProfileImage(true));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Additional" }],
        })
      );
    }
  };
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  // console.log("photoSet, profileImg : ", profileImg);
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      {/* {status.granted && <Text>'설정'의 'we-meet'에서 사진 권한을 설정해주세요.</Text>} */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {/* 여기에 body내용 입력 */}
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            lineHeight: 20,
            color: "white",
          }}
        >
          {
            "다른 사람에게 보여지는 내 프로필 화면이야!\n미팅 신청을 위해 필수로 등록해줘야해"
          }
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: subColorBlack2,
            // borderWidth: 1,
            marginTop: 45,
            height: 350,
            width: 350,
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
              source={{ uri: profileImg.uri }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 15,
                // backgroundColor: "black",
              }}
              // blurRadius={30}
              resizeMode={"contain"}
            />
          ) : (
            <>
              <FontAwesome5 name="camera" size={40} color="white" />

              <Text
                style={{
                  width: "90%",
                  color: "white",
                  position: "absolute",
                  fontSize: 13,
                  bottom: 40,
                  textAlign: "center",
                }}
              >
                {/* 대표 사진은 자신을 가장 잘 나타낼 수 있는 사진이야!{"\n"} */}
                가급적 본인을 가장 잘 나타낼 수 있는 사진을 올려줘
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <NextButton
        text={"사진 등록하기"}
        onPress={onPress}
        disabled={!profileImg}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default PhotoSetScreen;
