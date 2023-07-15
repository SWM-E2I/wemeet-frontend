import { axiosDefault, axiosPrivate } from "./axios.js";
import { Alert, Keyboard } from "react-native";
import * as SecureStore from "expo-secure-store";

//for phone and email verification
const PHONE_VRF_ISSUE_URL = "v1/auth/phone/issue";
const PHONE_VRF_VALIDATE_URL = "/v1/auth/phone/validate";
export const phoneVrfIssueApi = async (phoneNum, controller, navigation) => {
  //테스트용 시작
  return true;
  //테스트용 끝
  try {
    const response = await axiosDefault.post(
      PHONE_VRF_ISSUE_URL,
      {
        target: `+82${phoneNum.slice(1)}`,
      },
      { signal: controller.signal }
    );
    if (response.data.status == "SUCCESS") {
      //인증코드 발급됨
      console.log("인증번호 발급 성공");
      return true;
      //navigate to the next page
    } else
      Alert.alert("오류가 발생했습니다. 다시 시도 해주세요", response?.message);
  } catch (err) {
    if (err.response) {
      console.log(
        "phoneVrfIssueApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
      );
    } else if (err.request) {
      console.log(
        "phoneVrfIssueApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "phoneVrfIssueApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return false;
};
//axios로 부터 받은 응답의 header에 들어있는 accesstoken값을 expo secure store에 저장하는 함수
const storeAccessToken = async (response) => {
  try {
    await SecureStore.setItemAsync("accessToken", response.headers.AccessToken);
    await SecureStore.setItemAsync(
      "refreshToken",
      response.headers.RefreshToken
    );
    console.log("accessToken, refreshToken 저장완료");
  } catch (err) {
    console.log(err);
  }
};

export const phoneVrfValidateApi = async (phone, code, controller) => {
  //테스트코드시작
  return "UNREGISTERED";
  //테스트코드끝

  try {
    const response = await axiosDefault.post(
      PHONE_VRF_VALIDATE_URL,
      {
        phone: `+82${phone.slice(1)}`,
        credential: code,
      },
      { signal: controller.signal }
    );
    if (response.data.status == "SUCCESS") {
      await storeAccessToken(response);
      console.log("휴대폰 인증 성공");
      Keyboard.dismiss();
      if (response.data.registered) return "REGISTERED";
      return "UNREGISTERED";
    } else {
      Alert.alert(
        "오류가 발생했습니다. 잠시 후 다시 시도해주세요",
        "인증번호를 올바르게 입력했는데도 오류가 계속 되는 경우 잠시 후 다시 시도해주세요."
      );
    }
  } catch (err) {
    //예외처리
    if (err.response) {
      console.log(
        "phoneVrfValidateApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
      );
      console.log(err.response.data);
    } else if (err.request) {
      console.log(
        "phoneVrfValidateApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "phoneVrfValidateApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return "ERROR";
};
