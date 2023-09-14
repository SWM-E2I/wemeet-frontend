import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";

const SENT_LIKE_URL = "/heart/sent";
const RECEIVED_LIKE_URL = "/heart/received";
const SENT_MATCH_URL = "/meeting/sent";
const RECEIVED_MATCH_URL = "/meeting/received";
const ACCEPT_URL = "/meeting/accept"; //// +/meeting_request_id
const REJECT_URL = "/meeting/reject"; //// +/meeting_request_id
const ACCEPTED_URL = "/meeting/accepted";

export const sentLikeApi = async (navigation, controller) => {
  // return false;
  try {
    const response = await axiosPrivate.get(SENT_LIKE_URL, {
      signal: controller.signal,
    });
    console.log("sentLikeApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40029) {
      //팀이 존재하지 않는경우!!
      // console.log("sentLikeApi :", response.data.message);
      return 40029;
    } else {
      // Alert.alert("조회 실패", response.data?.message);
    }
  } catch (err) {
    axiosCatch(err, "sentLikeApi", navigation);
    return false;
  }
  return false;
};

export const receivedLikeApi = async (navigation, controller) => {
  // return true;
  try {
    const response = await axiosPrivate.get(RECEIVED_LIKE_URL, {
      signal: controller.signal,
    });
    console.log("receivedLikeApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40029) {
      //팀이 존재하지 않는경우!!
      // console.log("receivedLikeApi :", response.data.message);
      return 40029;
    } else {
      // Alert.alert("조회 실패", response.data?.message);
    }
  } catch (err) {
    axiosCatch(err, "receivedLikeApi", navigation);
    return false;
  }
  return false;
};

export const sentMatchApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(SENT_MATCH_URL, {
      signal: controller.signal,
    });
    console.log("sentMatchApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40029) {
      //팀이 존재하지 않는 경우
      // console.log("sentMatchApi :", response.data.message);
      return 40029;
    }
    // else Alert.alert("조회 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "sentMatchApi", navigation);
    return false;
  }
  return false;
};

export const receivedMatchApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(RECEIVED_MATCH_URL, {
      signal: controller.signal,
    });
    console.log("receivedMatchApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40029) {
      //팀이 존재하지 않는 경우
      // console.log("receivedMatchApi :", response.data.message);
      return 40029;
    }
    // else console.log("receivedMatchApi :", response.data?.message);
  } catch (err) {
    axiosCatch(err, "receivedMatchApi", navigation);
    return false;
  }
};

export const acceptApi = async (meetingRequestId, navigation, controller) => {
  try {
    const response = await axiosPrivate.post(
      ACCEPT_URL + "/" + meetingRequestId,
      {},
      { signal: controller.signal }
    );
    console.log("acceptApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return true;
    } else if (response.data.code == 40029)
      //팀이 존재하지 않는 경우
      Alert.alert("요청 실패", "본인 팀이 없으면 매칭을 신청할 수 없어!");
    else if (response.data.code == 40304) {
      Alert.alert("요청 실패", "사용 가능한 크레딧이 부족해!");
    } else Alert.alert("요청 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "acceptApi", navigation);
    Alert.alert("요청 실패", "잠시 후 다시 시도해주세요");
    return false;
  }
  return false;
};

export const rejectApi = async (meetingRequestId, navigation, controller) => {
  try {
    const response = await axiosPrivate.post(
      REJECT_URL + "/" + meetingRequestId,
      {},
      { signal: controller.signal }
    );
    console.log("rejectApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return true;
    } else if (response.data.code == 40029)
      //팀이 존재하지 않는 경우
      Alert.alert("요청 실패", "본인 팀이 없으면 매칭을 신청할 수 없어!");
    else if (response.data.code == 40304) {
      Alert.alert("요청 실패", "사용 가능한 크레딧이 부족해!");
    } else Alert.alert("요청 실패", response.data?.message);
  } catch (err) {
    axiosCatch(err, "rejectApi", navigation);
    Alert.alert("요청 실패", "잠시 후 다시 시도해줘");
    return false;
  }
  return false;
};
export const acceptedApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(ACCEPTED_URL, {
      signal: controller.signal,
    });
    console.log("acceptedApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else if (response.data.code == 40029)
      //팀이 존재하지 않는 경우
      return 40029;
    // else
    // Alert.alert("요청 실패 :", response.data?.message);
  } catch (err) {
    axiosCatch(err, "acceptedApi", navigation);
    // Alert.alert("요청 실패", "잠시 후 다시 시도해줘");
    return false;
  }
  return false;
};
