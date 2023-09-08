import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";

const SENT_LIKE_URL = "/heart/sent";
const RECEIVED_LIKE_URL = "/heart/received";
const SENT_MATCH_URL = "/meeting/sent";
const RECEIVED_MATCH_URL = "/meeting/received";
const MATCHED_URL = "/meeting"; // +/meeting_request_id

export const sentLikeApi = async (navigation, controller) => {
  return true;
};

export const receivedLikeApi = async (navigation, controller) => {
  return true;
};

export const sentMatchApi = async (navigation, controller) => {};

export const receivedMatchApi = async (navigation, controller) => {};

export const matchedApi = async (navigation, controller) => {};
