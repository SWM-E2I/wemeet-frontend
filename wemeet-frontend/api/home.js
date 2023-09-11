import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";

const SUGGESTION_CHECK_URL = "/suggestion/check";
const SUGGESTION_URL = "/suggestion";
const DETAIL_URL = "/team"; // + /teamId
const LIKE_URL = "/heart"; // +/partner_teamId
const REQUEST_URL = "/meeting"; //post, 매칭 신청
const REQUEST_MESSAGE_URL = "/meeting/message"; //post, 쪽지와 함께 신청

export const suggestionCheckApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(SUGGESTION_CHECK_URL, {
      signal: controller.signal,
    });
    console.log("suggestionCheckApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else console.log("suggestionCheckApi :", response.data.message);
  } catch (err) {
    axiosCatch(err, "suggestionCheckApi", navigation);
    return false;
  }
  return false;
};

export const suggestionApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(SUGGESTION_URL, {
      signal: controller.signal,
    });
    console.log("suggestionApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40035) {
      console.log("suggestionApi :", response.data.message);
      Alert.alert("오류", "\n이미 오늘의 추천을 모두 받았어!");
      return false;
    } else console.log("suggestionApi :", response.data.message);
  } catch (err) {
    axiosCatch(err, "suggestionApi", navigation);
    return false;
  }
  return false;
};

export const detailApi = async (teamId, navigation, controller) => {
  try {
    const response = await axiosPrivate.get(DETAIL_URL + "/" + teamId, {
      signal: controller.signal,
    });
    //임시
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    }
  } catch (err) {
    axiosCatch(err, "detailApi", navigation);
    return false;
  }
  Alert.alert("팀 상세 정보 조회에 실패했어", "잠시 후에 다시 시도해줘!");
  return false;
};

export const likeApi = async (teamId, navigation, controller) => {
  try {
    const response = await axiosPrivate.post(
      LIKE_URL + "/" + teamId,
      {},
      {
        signal: controller.signal,
      }
    );
    if (response.data.status == "SUCCESS") {
      Alert.alert("좋아요 전송 성공", "오늘의 좋아요는 여기까지야!");
      return true;
    } else if (response.data.status == "FAIL" && response.data.code == 40029) {
      Alert.alert("팀을 생성해줘", "본인 팀이 없으면 좋아요를 보낼 수 없어");
    } else if (response.data.status == "FAIL" && response.data.code == 40034) {
      Alert.alert("본인 팀에게는 좋아요를 보낼 수 없어");
    } else if (response.data.status == "FAIL" && response.data.code == 40033) {
      Alert.alert(
        "이미 오늘의 좋아요를 모두 소진했어!",
        "좋아요는 하루에 한번만 보낼 수 있어"
      );
    } else Alert.alert("좋아요 전송 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "likeApi", navigation);
    Alert.alert("좋아요 전송 실패", "잠시 후에 다시 시도해줘");
    return false;
  }

  return false;
};

export const requestApi = async (teamId, navigation, controller) => {
  try {
    const response = await axiosPrivate.post(
      REQUEST_URL,
      { partnerTeamId: teamId },
      { signal: controller.signal }
    );
    if (response.data.status == "SUCCESS") {
      return true;
    } else if (response.data.status == "FAIL" && response.data.code == 40029) {
      Alert.alert("팀을 생성해줘", "본인 팀이 없으면 좋아요를 보낼 수 없어");
    } else if (response.data.status == "FAIL" && response.data.code == 40304)
      Alert.alert("요청 실패", "사용 가능한 크레딧이 부족해!");
    else Alert.alert("요청 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "requestApi", navigation);
    return false;
  }
  return false;
};

export const requestMessageApi = async (
  teamId,
  message,
  navigation,
  controller
) => {
  try {
    const response = await axiosPrivate.post(
      REQUEST_MESSAGE_URL,
      { partnerTeamId: teamId, message: message },
      { signal: controller.signal }
    );
    if (response.data.status == "SUCCESS") {
      return true;
    } else if (response.data.code == 40029) {
      Alert.alert("팀을 생성해줘", "본인 팀이 없으면 좋아요를 보낼 수 없어");
    } else if (response.data.code == 40304)
      Alert.alert("요청 실패", "사용 가능한 크레딧이 부족해!");
    else Alert.alert("요청 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "requestMessageApi", navigation);
    return false;
  }
  return false;
};
