import { axiosDefault } from "./axios.js";
import * as SecureStore from "expo-secure-store";

const REGISTER_URL = "/member";

const storeAccessToken = async (response) => {
  try {
    console.log(
      "storeAccessToken :",
      response.headers.accesstoken,
      response.headers.refreshtoken
    );
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

const registerApi = async (registerInfo, controller) => {
  //test code begins
  // return true;
  //test code ends
  try {
    const response = await axiosDefault.post(REGISTER_URL, registerInfo, {
      signal: controller.signal,
    });
    console.log(response.data);
    if (response.data.status == "SUCCESS") {
      console.log("회원 가입 성공");
      await storeAccessToken(response);
      return true;
    } else {
      console.log("회원 가입 실패, status == ERROR");
      console.log(response?.message);
    }
  } catch (err) {
    if (err.response) {
      console.log(
        "registerApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
      );
    } else if (err.request) {
      console.log(
        "registerApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "registerApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return false;
};

export { registerApi };
