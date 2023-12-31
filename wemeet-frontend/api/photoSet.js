import { axiosPrivate } from "./axios";
import { CommonActions } from "@react-navigation/native";
import { Alert, Platform } from "react-native";
import mime from "mime";

//개인 프로필 사진 전송하는거
// const SET_PROFILE_IMG_API_URL = "/profile_image";
const SET_PROFILE_IMG_API_URL = "/member/profile-image"; //테스트용
// const SET_PROFILE_IMG_API_URL = "/member/profile_image"; //실제 코드

const setProfileImgApi = async (profileImg, controller, navigation) => {
  //profileImg = 사진 데이터 객체 (pickImageAsync의 result.assets[0])
  const formData = new FormData();
  formData.append("file", {
    uri: profileImg.uri,
    type: mime.getType(profileImg.uri),
    name: profileImg.uri.split("/").pop(),
  });
  try {
    const response = await axiosPrivate.post(
      SET_PROFILE_IMG_API_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal,
      }
    );
    if (response.data.status == "SUCCESS") {
      console.log("프로필 사진 업로드 성공");
      return true;
      //navigate to the next page
    } else
      Alert.alert("프로필 사진 업로드에 실패했습니다.", response.data.message);
  } catch (err) {
    if (err == "LOGOUT") {
      Alert.alert("로그아웃 되었습니다.", "다시 로그인해주세요.");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "PhoneNum" }],
        })
      );
      return false;
    } else {
      Alert.alert("사진 업로드에 실패했습니다.", "잠시 후 다시 시도해주세요.");
      if (err.response) {
        console.log(
          "setProfileImgApi : ",
          "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
          err.response
        );
      } else if (err.request) {
        console.log(
          "setProfileImgApi : ",
          "요청이 이루어 졌으나 응답을 받지 못했습니다.",
          err.request._response
        );
      } else {
        console.log(
          "setProfileImgApi : ",
          "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
          err.message
        );
      }
    }
    return false;
  }
};
//단체 사진 전송하는거 만들기

export { setProfileImgApi };
