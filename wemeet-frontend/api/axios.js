import axios from "axios";

axios.interceptors.request.use(async (req) => {
  console.log("interceptor");
  return req;
});
export default axios.create({
  baseURL: "https://we.meet.api.com/v1",
});
const axiosPrivate = axios.create({
  baseURL: "https://we.meet.api.com/v1",
  headers: { AccessToken: "" },
});
axiosPrivate.interceptors.request.use(async (req) => {
  console.log("interceptor");
  return req;
});
axiosPrivate.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    console.log("에잉");
    console.log(error.status);
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
export { axiosPrivate };
