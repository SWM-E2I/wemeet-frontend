import { axiosPrivate } from "./axios";
import { Alert } from "react-native";

const TEAM_INQUIRY_URL = "/team";

const teamInquiryApi = async (controller) => {
  try {
    const response = await axiosPrivate.get(TEAM_INQUIRY_URL, {
      signal: controller.signal,
    });
    if (response.data.status == "SUCCESS" && response.data.data) {
      Alert.alert("팀이 존재합니다.");
      console.log("TeamInquiryApi response data :", response.data.data);
    } else if (response.data.status == "SUCCESS" && !response.data.data) {
      Alert.alert("팀이 존재하지 않습니다.");
    } else {
      Alert.alert("요청에 실패했습니다.", response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export { teamInquiryApi };
