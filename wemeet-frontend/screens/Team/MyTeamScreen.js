import { SafeAreaView, View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { teamInquiryApi, teamGenerateApi } from "../../api/team";
import commonStyles, { mainColor } from "../../styles/commonStyles";
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
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [images, setImages] = useState([]); //리스트 형태
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
    // await teamInquiryApi(navigation, controller); //임시로 주석!!
  };
  const pickImageAsync = async () => {
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
    let result = await ImagePicker.launchImageLibraryAsync({
      //finetune필요
      quality: 1,
      aspect: [1, 1],
      allowsMultipleSelection: true,
      orderedSelection: true, //only for iOS
      selectionLimit: 10, //최대 10장까지만 선택가능하다고 알려주기
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
    console.log("MyTeamScreen, teamGenerateApi result :", res);
    if (res) {
      // dispatch(setHasMainProfileImage(true));
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: "Additional" }],
      //   })
      // );
    }
  };
  useEffect(() => {
    console.log("MyTeamScreen mounted");
    onMount();
    return () => {
      console.log("MyTeamScreen unmounted");
      controller.abort();
    };
  }, []);
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <Text>
        MyTeamScreen(임시) : (팀이 있는 경우) 팀 생성 화면 , (팀이 없는 경우) 팀
        조회 & 팀 삭제
      </Text>
      <Button title={"임시 사진등록"} onPress={pickImageAsync} />
      {/* {status.granted && <Text>'설정'의 'we-meet'에서 사진 권한을 설정해주세요.</Text>} */}
      <Button title={"팀 생성하기"} onPress={onPress} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {images.map((image, index) => {
          console.log(image.uri);
          return (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{ width: 100, height: 100 }}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default MyTeamScreen;
