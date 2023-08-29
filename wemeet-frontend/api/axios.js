import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
// const BASE_URL = "https://we.meet.api.com/v1"; - 실제
export const BASE_URL =
  "http://ec2-52-78-215-171.ap-northeast-2.compute.amazonaws.com:8080/v1/"; //for test only
export const S3_PROFILE_BASE_URL =
  "https://wemeet-profile-image.s3.ap-northeast-2.amazonaws.com/";
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
    "refresh 실행",
    "accessToken :",
    accessToken,
    "refreshToken :",
    refreshToken
  );
  try {
    const response = await axiosDefault.post(
      "/auth/refresh",
      {},
      { headers: { AccessToken: accessToken, RefreshToken: refreshToken } }
    );
    //SecureStore에 새로운 accessToken, refreshToken 저장
    await SecureStore.setItemAsync("accessToken", response.headers.AccessToken);
    await SecureStore.setItemAsync(
      "refreshToken",
      response.headers.RefreshToken
    );
    return accessToken;
  } catch (error) {
    if (error.response?.status === 401) {
      //로그아웃 시키기 -> 인증 페이지로 돌아가기
      console.log("token refresh : refresh token 만료");
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
    } else console.log("token refresh 중 에러 발생");
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
        prevRequest.headers["AccessToken"] = accessToken;
        return axiosPrivate.request(error.config);
      } else return Promise.reject("LOGOUT");
    }
    return Promise.reject(error);
  }
);
export { refresh, axiosDefault, axiosPrivate };
