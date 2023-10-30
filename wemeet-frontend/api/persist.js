import { axiosPrivate } from "./axios.js";
import { CommonActions } from "@react-navigation/native";

const PERSIST_LOGIN_URL = "/auth/persist";

export const persistLoginApi = async (controller) => {
  try {
    const response = await axiosPrivate.get(PERSIST_LOGIN_URL, {
      signal: controller.signal,
    });
    if (response.data.status == "SUCCESS") {
      return response.data.data;
    } else {
      console.log("PersistLogin response status : FAIL");
      return null;
    }
  } catch (err) {
    // if (err == "LOGOUT") {
    //   Alert.alert("로그아웃 되었습니다.", "다시 로그인해주세요.");
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{ name: "PhoneNum" }],
    //     })
    //   );
    // }  => 이걸 persist에서 할지 말지
    if (err.response) {
      console.log(
        "persistLoginApi : ",
        "요청이 이루어 졌으나 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.",
        err.response._response
      );
    } else if (err.request) {
      console.log(
        "persistLoginApi : ",
        "요청이 이루어 졌으나 응답을 받지 못했습니다."
      );
      console.log(err.request._response);
    } else {
      console.log(
        "persistLoginApi : ",
        "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
      );
      console.log(err.message);
    }
  }
  return null;
};
