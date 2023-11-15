import { axiosDefault, axiosPrivate } from "./axios.js";
import * as SecureStore from "expo-secure-store";

const PUSH_URL = "/push";

export const pushTokenApi = async (withAccessToken, controller) => {
  //withAccessToken TF여부에 따라 분기
  const expoPushToken = await SecureStore.getItemAsync("expoPushToken");
  if (!expoPushToken) {
    console.log("expoPushToken 없음");
    return false;
  }
  if (withAccessToken) {
    try {
      const response = await axiosPrivate.post(
        PUSH_URL,
        {
          pushToken: expoPushToken,
        },
        {
          signal: controller.signal,
        }
      );
      console.log("pushTokenApi response data :", response.data);
      if (response.data.status == "SUCCESS") {
        return true;
      } else {
        // Alert.alert("조회 실패", response.data?.message);
        return false;
      }
    } catch (err) {
      console.timeLog(err?.response, err?.message, err?.request?._response);
      return false;
    }
  } else {
    //accessToken이 없는 경우
    try {
      const response = await axiosDefault.post(
        PUSH_URL,
        {
          pushToken: expoPushToken,
        },
        {
          signal: controller.signal,
        }
      );
      console.log("pushTokenApi response data :", response.data);
      if (response.data.status == "SUCCESS") {
        return true;
      } else {
        // Alert.alert("조회 실패", response.data?.message);
        return false;
      }
    } catch (err) {
      console.timeLog(err?.response, err?.message, err?.request?._response);
      return false;
    }
  }
};
