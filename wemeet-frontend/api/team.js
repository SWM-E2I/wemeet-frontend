import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import mime from "mime";
import * as SecureStore from "expo-secure-store";

const TEAM_INQUIRY_URL = "/team";
const TEAM_GENERATE_URL = "/team";
const TEAM_DELETE_URL = "/team";

const teamInquiryApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(TEAM_INQUIRY_URL, {
      signal: controller.signal,
    });
    console.log("TeamInquiryApi response data :", response.data);
    if (response.data.status == "SUCCESS" && response.data.data.hasTeam) {
      return response.data.data;
    } else return false;
  } catch (err) {
    axiosCatch(err, "teamInquiryApi", navigation);
    return false;
  }
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
    console.log("팀생성 : 재발급된 accessToken, refreshToken 저장완료");
  } catch (err) {
    console.log(err);
  }
};

const teamGenerateApi = async (images, data, navigation, controller) => {
  //이미지와 Object Data를 받아서 multipart/ form으로 보내기
  //images = 사진 데이터 객체 리스트 (pickImageAsync의 result.assets)
  //아 몰랑 내일할래
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", {
      uri: image.uri,
      type: mime.getType(image.uri),
      name: image.uri.split("/").pop(),
    });
  });
  const stringified = JSON.stringify(data);
  formData.append("data", { string: stringified, type: "application/json" });

  // console.log("teamGenerateApi, formData :", formData);
  try {
    const response = await axiosPrivate.post(TEAM_GENERATE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
    });
    console.log("TeamGenerateApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      await storeAccessToken(response);

      return true;
    } else Alert.alert("팀 생성 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "teamGenerateApi", navigation);
    Alert.alert("팀 생성 실패", "잠시 후 다시 시도해줘");
  }
  return false;
};

const teamDeleteApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.delete(TEAM_DELETE_URL, {
      signal: controller.signal,
    });
    console.log("TeamDeleteApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      await storeAccessToken(response);
      Alert.alert("팀이 삭제되었어", "언제라도 새로운 팀을 생성해줘!");
      return true;
    } else if (response.data.status == "FAIL") {
      Alert.alert("팀 삭제 실패", "잠시 후 다시 시도해줘");
    }
  } catch (err) {
    axiosCatch(err, "teamDeleteApi", navigation);
    Alert.alert("팀 삭제 실패", "잠시 후 다시 시도해줘");
  }
  return false;
};

const teamEditApi = async (images, data, navigation, controller) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", {
      uri: image.uri,
      type: mime.getType(image.uri),
      name: image.uri.split("/").pop(),
    });
    console.log(mime.getType(image.uri), image.uri.split("/").pop());
  });
  const stringified = JSON.stringify(data);
  formData.append("data", { string: stringified, type: "application/json" });
  try {
    const response = await axiosPrivate.put(TEAM_GENERATE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
    });
    console.log("TeamEditApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return true;
    } else Alert.alert("팀 수정 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "teamEditApi", navigation);
    Alert.alert("팀 수정 실패", "잠시 후 다시 시도해줘");
  }
  return false;
};

export { teamInquiryApi, teamGenerateApi, teamDeleteApi, teamEditApi };
