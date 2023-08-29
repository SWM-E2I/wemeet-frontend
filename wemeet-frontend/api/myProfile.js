import { axiosPrivate } from "./axios";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import mime from "mime";

const PROFILE_INQUIRY_URL = "/member";

export const myProfileInquiryApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(PROFILE_INQUIRY_URL, {
      signal: controller.signal,
    });
    if (response.data.status == "SUCCESS" && response.data.data) {
      return response.data.data;
    } else {
      Alert.alert("요청에 실패했습니다.", response.data.message);
      console.log(
        "myProfileInquiryApi response message :",
        response.data.message
      );
      return null;
    }
  } catch (err) {
    if (err == "LOGOUT") {
      Alert.alert("로그아웃 되었습니다.", "다시 로그인해주세요.");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "PhoneNum" }],
        })
      );
    } else {
      Alert.alert("오류", "내 정보를 불러오는 중 오류가 발생했습니다.");
      if (err.response) {
        console.log(
          "myProfileInquiryApi : ",
          "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
          err.response
        );
      } else if (err.request) {
        console.log(
          "myProfileInquiryApi : ",
          "요청이 이루어 졌으나 응답을 받지 못했습니다.",
          err.request._response
        );
      } else {
        console.log(
          "myProfileInquiryApi : ",
          "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
          err.message
        );
      }
    }
    return null;
  }
};
