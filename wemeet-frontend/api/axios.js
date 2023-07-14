import axios from "axios";
import * as SecureStore from "expo-secure-store";
const BASE_URL = "https://we.meet.api.com/v1";

const axiosDefault = axios.create({
  baseURL: BASE_URL,
});

const refresh = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  console.log("refresh 실행", accessToken, refreshToken);
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
      //로그아웃 시키기
      console.log("refresh token 만료");
      await SecureStore.setItemAsync("accessToken", null);
      await SecureStore.setItemAsync("refreshToken", null);
    }
    console.log("token refresh 중 에러 발생");
    return null;
  }
};

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { AccessToken: null },
});

axiosPrivate.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  config.headers = { AccessToken: accessToken };
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
    console.log(error.config);
    if (error.message === "Network Error" && !error.response) {
      print(error.config);
      console.log("Network Error");
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
    } else {
      console.log("그 외 response error");
    }
    return Promise.reject(error);
  }
);
export { refresh, axiosPrivate };
