import axios from "./axios.js";
import { Alert, Keyboard } from "react-native";
import * as SecureStore from "expo-secure-store";

//for phone and email verification
const PHONE_VRF_ISSUE_URL = "v1/auth/phone/issue";
const PHONE_VRF_VALIDATE_URL = "/v1/auth/phone/validate";
export const phoneVrfIssueApi = async (
  phone,
  setSent,
  setTimer,
  setFinalPhone,
  setVrfCode,
  vrfRef,
  controller
) => {
  //테스트용 시작
  if (phone.substring(0, 3) == "010") {
    //인증코드 발급됨
    setSent(true);
    Alert.alert("인증번호가 발송되었습니다.\n1분 30초 내에 입력해주세요.");
    setTimer(90); //1분 30초로 설정
    setFinalPhone(`+82${phone.slice(1)}`);
    console.log("인증번호 전송 API", `+82${phone.slice(1)}`);
    setVrfCode("");
    vrfRef.current.focus();
  } else Alert.alert("올바른 전화번호를 입력해주세요", "예)01099991111");
  //테스트용 끝

  //   if (phone.substring(0, 3) == "010") {
  //   try {
  //     const response = await axios.post(
  //       PHONE_VRF_ISSUE_URL,
  //       {
  //         target: `+82${phone.slice(1)}`,
  //       },
  //       { signal: controller.signal }
  //     );
  //     if (response.data.status == "SUCCESS") {
  //       //인증코드 발급됨
  //       setSent(true);
  //       Alert.alert(
  //         "인증번호가 발송되었습니다.\n1분 30초 내에 입력해주세요."
  //       );
  //       setTimer(90);
  //       setFinalPhone(`+82${phone.slice(1)}`);
  //       setVrfCode("");
  //       vrfRef.current.focus();
  //       //show Keyboard까지 추가하기
  //     } else
  //       Alert.alert(
  //         "오류가 발생했습니다", response?.message
  //       );
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(
  //         "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
  //       );
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else if (err.request) {
  //       // 요청이 이루어 졌으나 응답을 받지 못했습니다.
  //       console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
  //       console.log(err.request._response);
  //     } else {
  //       // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
  //       console.log(
  //         "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
  //         err.message
  //       );
  //     }
  //   }
  //   } else
  //     Alert.alert("올바른 형식의 전화번호를 입력해주세요", "예)01099991111");
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

export const phoneVrfValidateApi = async (
  finalPhone,
  vrfCode,
  setVrfCode,
  setVerified,
  setTimer,
  controller
) => {
  setVerified(true);
  setTimer(null);
  Alert.alert("휴대폰 인증에 성공했습니다.");
  Keyboard.dismiss();
  return "UNREGISTERED";

  //아래는 실제 코드
  //   try {
  //     const response = await axios.post(
  //       PHONE_VRF_VALIDATE_URL,
  //       {
  //         phone: `+82${finalPhone.slice(1)}`,
  //         credential: vrfCode,
  //       },
  //       { signal: controller.signal }
  //     );
  //     if (response.data.status == "SUCCESS") {
  //       await storeAccessToken(response);
  //       setVerified(true);
  //       setTimer(null);
  //       Alert.alert("휴대폰 인증에 성공했습니다.");
  //       Keyboard.dismiss();
  //       if (response.data.registered) return "REGISTERED";
  //       return "UNREGISTERED";
  //     } else {
  //       Alert.alert(
  //         "오류가 발생했습니다",
  //         "인증번호를 올바르게 입력했는데도 오류가 계속 되는 경우 잠시 후 다시 시도해주세요."
  //       );
  //       setVrfCode("");
  //     }
  //   } catch (err) {
  //     setVrfCode("");
  //     Alert.alert("오류가 발생했습니다.", "잠시 후 다시 시도해주세요");
  //     //예외처리
  //     if (err.response) {
  //       console.log(
  //         "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
  //       );
  //       console.log(err.response.data);
  //     } else if (err.request) {
  //       console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
  //       console.log(err.request._response);
  //     } else {
  //       console.log(
  //         "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
  //         err.message
  //       );
  //     }
  //   }
  //   return "ERROR";
};
