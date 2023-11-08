import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { BASE_URL, S3_PROFILE_BASE_URL } from "./baseUrl.js";

const axiosDefault = axios.create({
  baseURL: BASE_URL,
});

axiosDefault.interceptors.response.use(
  //accessToken을 사용하는 모든 요청에 필요
  (response) => {
    // 2xx 범위에 있는 상태 코드
    return response;
  },
  async (error) => {
    // 2XX 외의 범위에 있는 상태 코드
    console.log("axiosDefault response error", error.message);
    if (error.message === "Network Error" && !error.response) {
      console.log("Network Error");
      Alert.alert("네트워크 에러", "네트워크 연결을 확인해주세요.");
    }
    return Promise.reject(error);
  }
);
const refresh = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  console.log(
    "refresh 실행 전, accessToken, refreshToken :",
    accessToken,
    refreshToken
  );
  try {
    const response = await axiosDefault.post(
      "/auth/refresh",
      {},
      { headers: { AccessToken: accessToken, RefreshToken: refreshToken } }
    );
    //SecureStore에 새로운 accessToken, refreshToken 저장
    if (response.data.status == "SUCCESS") {
      console.log(
        "refresh 실행 후, accessToken, refreshToken :",
        response.headers.accesstoken,
        response.headers.refreshtoken
      );
      await SecureStore.setItemAsync(
        "accessToken",
        response.headers.accesstoken
      );
      await SecureStore.setItemAsync(
        "refreshToken",
        response.headers.refreshtoken
      );
      return response.headers.accesstoken;
    } else {
      console.log("token refresh : ", response.data?.message);
      return null;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      //로그아웃 시키기 -> 인증 페이지로 돌아가기
      //refresh token이 서버에 없거나 다를때 뜬다.
      console.log("token refresh : refreshToken만료 (401)");
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
    } else {
      console.log("token refresh 중 에러 발생");
      console.log(error.response, error.request, error.message);
    }
    return null;
  }
};

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { AccessToken: null },
});

axiosPrivate.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  // console.log("axiosPrivate interceptor request:", config.headers);
  config.headers = { ...config.headers, AccessToken: accessToken };
  // console.log("axiosPrivate interceptor, request header:", config.headers);
  return config;
});
axiosPrivate.interceptors.response.use(
  //accessToken을 사용하는 모든 요청에 필요
  (response) => {
    // 2xx 범위에 있는 상태 코드
    return response;
  },
  async (error) => {
    // 2XX 외의 범위에 있는 상태 코드
    console.log("axiosPrivate response error", error);
    if (error.message === "Network Error" && !error.response) {
      console.log("Network Error");
      Alert.alert("네트워크 에러", "네트워크 연결을 확인해주세요.");
    } else if (error.response?.status === 401) {
      //토큰이 만료되었을 경우, refresh token을 이용해 access token을 재발급 받습니다.
      //그리고 이전에 요청한 페이지로 이동합니다.
      console.log("401 error : 토큰 만료");
      const prevRequest = error?.config;
      const accessToken = await refresh();
      if (accessToken) {
        //소문자로 바꿔줘야하는지 확인하기
        prevRequest.headers["AccessToken"] = accessToken;
        return axiosPrivate.request(error.config);
      } else return Promise.reject("LOGOUT");
    }
    return Promise.reject(error);
  }
);

export const axiosCatch = (err, funcName, navigation) => {
  if (err == "LOGOUT") {
    Alert.alert("로그아웃 되었습니다", "다시 로그인해주세요.");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "PhoneNum" }],
      })
    );
    return "LOGOUT";
  } else {
    // Alert.alert("오류","팀 정보를 불러오는 중 오류가 발생했습니다."); //오류발생시 분기하는 페이지로 이동하게 수정...
    if (err.response) {
      console.log(
        funcName,
        ": ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
        err.response
      );
    } else if (err.request) {
      console.log(
        funcName,
        ": ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다.",
        err.request._response
      );
    } else {
      console.log(
        funcName,
        ": ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.",
        err.message
      );
    }
  }
  return null;
};
export { refresh, axiosDefault, axiosPrivate };
