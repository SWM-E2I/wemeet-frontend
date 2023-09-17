import { axiosPrivate, axiosCatch } from "./axios";
import { Alert } from "react-native";

const CREDIT_INQUIRY_URL = "/credit";

export const creditInquiryApi = async (navigation, controller) => {
  try {
    const response = await axiosPrivate.get(CREDIT_INQUIRY_URL, {
      signal: controller.signal,
    });
    console.log("creditInquiryApi response data :", response.data);
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else console.log("creditInquiryApi :", response.data?.message);
  } catch (err) {
    let res = axiosCatch(err, "creditInquiryApi", navigation);
    return res;
  }
  return false;
};
