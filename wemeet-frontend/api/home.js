import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

const SUGGESTION_CHECK_URL = "/suggestion/check";
const SUGGESTION_URL = "/suggestion";
const DETAIL_URL = "/v1/team/"; // + teamId

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
      return 40035;
    } else console.log("suggestionApi :", response.data.message);
  } catch (err) {
    axiosCatch(err, "suggestionApi", navigation);
    return false;
  }
  return false;
};

export const detailApi = async (teamId, navigation, controller) => {
  try {
    const response = await axiosPrivate.get(DETAIL_URL + teamId, {
      signal: controller.signal,
    });
    //임시
    console.log(response.data);
  } catch (err) {
    axiosCatch(err, "detailApi", navigation);
    return false;
  }
  return false;
};
