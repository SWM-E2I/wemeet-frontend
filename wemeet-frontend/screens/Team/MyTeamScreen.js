import { SafeAreaView, Text, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { teamInquiryApi, teamGenerateApi } from "../../api/team";
import commonStyles from "../../styles/commonStyles";
import * as ImagePicker from "expo-image-picker";

const sampleData = {
  memberNum: 3,
  region: "HONGDAE",
  drinkRate: "HIGH",
  drinkWithGame: "MASTER",
  additionalActivity: "SHOW",
  introduction: "안녕안녕 나는 나야",
  members: [
    {
      college: "CE-001",
      collegeType: "Social",
      admissionYear: "19",
      mbti: "XXXX",
    },
    {
      college: "CE-002",
      collegeType: "Arts",
      admissionYear: "19",
      mbti: "XXXX",
    },
  ],
}; //for Test only, 임시
const MyTeamScreen = ({ navigation }) => {
  const [granted, setGranted] = useState(false);
  const [images, setImages] = useState([]);
  const controller = new AbortController();
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
      //   allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      console.log(result.assets);
      setImages(result.assets);
    } else console.log("사진을 선택하지 않음");
  };
  const onPress = async () => {
    //수정하기, 사진 등록하기 버튼 눌렀을 경우 -> API요청 보내야함
    //API에 result.assets[0]이 담긴 객체인 profileImg 객체 넘겨주기!!
    const res = await teamGenerateApi(
      images,
      sampleData,
      navigation,
      controller
    );
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
    console.log("MyTeamScreen mounted");
    getPermission();
    teamInquiryApi(navigation, controller);
    return () => {
      console.log("MyTeamScreen unmounted");
      controller.abort();
    };
  });
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <Text>
        MyTeamScreen(임시) : (팀이 있는 경우) 팀 생성 화면 , (팀이 없는 경우) 팀
        조회 & 팀 삭제
      </Text>
      <Button title={"임시 사진등록"} onPress={pickImageAsync} />
      <Button title={"팀 생성하기"} onPress={onPress} />
    </SafeAreaView>
  );
};

export default MyTeamScreen;
