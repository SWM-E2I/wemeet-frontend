import { axiosDefault, axiosPrivate } from "./axios.js";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

//for phone and email verification
const PHONE_VRF_ISSUE_URL = "/auth/phone/issue";
const PHONE_VRF_VALIDATE_URL = "/auth/phone/validate";
const phoneVrfIssueApi = async (phoneNum, controller) => {
  //테스트용 시작
  // return true;
  //테스트용 끝
  try {
    const response = await axiosDefault.post(
      PHONE_VRF_ISSUE_URL,
      {
        target: `+82${phoneNum.slice(1)}`,
      },
      { signal: controller.signal }
    );
    console.log(response.data);
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
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
        err.response.data,
        err.response.status
      );
    } else if (err.request) {
      console.log(
        "phoneVrfIssueApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다.",
        err.request
      );
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
  console.log("storeAccessToken :", response.headers);
  try {
    await SecureStore.setItemAsync("accessToken", response.headers.accesstoken);
    await SecureStore.setItemAsync(
      "refreshToken",
      response.headers.refreshtoken
    );
    console.log("accessToken, refreshToken 저장완료");
  } catch (err) {
    console.log(err);
  }
};
//회원가입이 안되어있는 사람은 token 안온다!!!!
//회원가입이 되어있는 사람은 token이 온다!!!
const phoneVrfValidateApi = async (phone, code, controller) => {
  //테스트코드시작
  // return "NOT_REGISTERED";
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
      console.log("휴대폰 인증 성공");
      if (response.data.data.isRegistered) {
        console.log("IsRegistered : true, persist login API요청");
        await storeAccessToken(response);
        //리턴값 추후 수정 필요
        return "REGISTERED";
      } else {
        console.log("회원가입이 안되어있는 사람입니다.");
        return "NOT_REGISTERED";
      }
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

export { phoneVrfIssueApi, phoneVrfValidateApi };
