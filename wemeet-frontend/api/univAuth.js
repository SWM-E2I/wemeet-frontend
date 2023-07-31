import { axiosPrivate } from "./axios.js";
import { Alert } from "react-native";

const EMAIL_VRF_ISSUE_URL = "/auth/mail/request";
const EMAIL_VRF_VALIDATE_URL = "/auth/mail/validate";

const emailVrfIssueApi = async (college, mail, controller) => {
  // //for test only
  return true;
  // //for test ends

  //college는 코드로 주기
  try {
    const response = await axiosPrivate.post(
      EMAIL_VRF_ISSUE_URL,
      {
        college: college,
        mail: mail,
      },
      { signal: controller.signal }
    );
    if (response.data.status == "SUCCESS") {
      console.log("이메일 인증번호 발급 성공");
      return true;
      //navigate to the next page
    } else Alert.alert("요청에 실패했습니다.", response.data.message);
  } catch (err) {
    if (err.response) {
      console.log(
        "emailVrfIssueApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
        err.response._response
      );
    } else if (err.request) {
      console.log(
        "emailVrfIssueApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "emailVrfIssueApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return false;
};

const emailVrfValidateApi = async (mail, code, controller) => {
  //test code begins
  return true;
  //test code ends

  try {
    const response = await axiosPrivate.post(
      EMAIL_VRF_VALIDATE_URL,
      {
        mail: mail,
        authCode: code,
      },
      {
        signal: controller.signal,
      }
    );
    if (response.data.status == "SUCCESS") {
      //인증번호 확인 '요청' 성공
      if (response.data.data) {
        //인증번호 확인 성공
        console.log("이메일 인증 성공", response.data.data);
        return true;
      } else {
        Alert.alert("인증번호가 일치하지 않습니다. 다시 시도해주세요.");
        console.log("이메일 인증 실패", response.data.data);
        return false;
      }
    } else
      Alert.alert(
        "오류가 발생했습니다. 잠시 후 다시 시도해주세요",
        "인증번호를 올바르게 입력했는데도 오류가 계속 되는 경우 잠시 후 다시 시도해주세요."
      ); //해당 번호에 인증번호가 발급되지 않았습니다.
  } catch (err) {
    //예외처리
    if (err.response) {
      console.log(
        "emailVrfValidateApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
      );
      console.log(err.response.data, err.response.status);
    } else if (err.request) {
      console.log(
        "emailVrfValidateApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "emailVrfValidateApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return false;
};

export { emailVrfIssueApi, emailVrfValidateApi };
