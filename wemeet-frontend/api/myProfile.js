import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import mime from "mime";
import * as SecureStore from "expo-secure-store";

const PROFILE_INQUIRY_URL = "/member";
const DELETE_ACCOUNT_URL = "/member";

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
    axiosCatch(err, "myProfileInquiryApi", navigation);
    return null;
  }
};

export const accountDeleteApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.delete(DELETE_ACCOUNT_URL, {
      signal: controller.signal,
    });
    console.log("accountDeleteApi :", response.data);
    if (response.data.status == "SUCCESS") {
      Alert.alert("회원탈퇴가 완료되었습니다.");
      return true;
    } else Alert.alert("회원탈퇴 실패", response.data.message);
    return false;
  } catch (err) {
    axiosCatch(err, "accountDeleteApi", navigation);
    Alert.alert("회원 탈퇴 실패", "잠시 후 다시 시도해주세요");
    return false;
  }
};

export const logoutApi = async (navigation) => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "PhoneNum" }],
    })
  );
};
