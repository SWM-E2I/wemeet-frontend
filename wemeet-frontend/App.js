import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as SecureStore from "expo-secure-store";
import { RegisterStackNavigation } from "./navigations/StackNavigation.js";
import MainScreen from "./screens/MainScreen.js";
import { persistLoginApi } from "./api/persist.js";

// const Stack = createNativeStackNavigator();
async function checkPersistType(
  setLoading,
  setPersistType,
  setPersistData,
  controller
) {
  //이때 실행되는 splash image 필요!!!
  setLoading(true);
  // await SecureStore.setItemAsync("refreshToken", "OHYEAH");
  // await SecureStore.setItemAsync("accessToken", "Bearer OHYEAH");
  let result = await SecureStore.getItemAsync("refreshToken");
  if (result) {
    //persist Api 실행
    const res = await persistLoginApi(controller);
    if (res) {
      setPersistData(res);
      if (!res.emailAuthenticated) {
        Alert.alert("대학생 인증을 완료하지 않았어!", "이메일 인증을 진행해줘");
        //이메일 인증 안된 경우
        console.log("앱 실행, 이메일 인증 페이지로 이동");
        setPersistType("UnivMail");
        setLoading(false);
        return;
      } else if (res.emailAuthenticated && res.hasMainProfileImage) {
        setPersistType("Main");
        console.log("앱 실행, 메인 페이지로 이동");
        setLoading(false);
        return;
      } else {
        console.log("앱 실행, 추가정보 입력 페이지로 이동");
        setPersistType("Additional");
        setLoading(false);
        return;
      }
    }
  }
  //refreshToken이 없는 경우 - 미가입회원이거나 로그아웃한 경우 OR refreshToken이 만료된 경우
  //로그아웃시 Refreshtoken = null로 바꿔주기
  console.log("앱 실행, Initial 페이지로 이동");
  setLoading(false);
  return;
}
export default function App() {
  const [persistType, setPersistType] = useState("Initial"); //persist-type check; true - to MainScreen , false - to AuthScreen
  const [persistData, setPersistData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const controller = new AbortController();
  useEffect(() => {
    checkPersistType(setLoading, setPersistType, setPersistData, controller);
    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!Loading ? (
          <>
            {persistType == "Main" ? (
              <MainScreen />
            ) : (
              <RegisterStackNavigation
                persistType={persistType}
                // persistType={"Additional"} //for test only
                persistData={persistData}
              />
            )}
            {/* <RegisterStackNavigation
              // persistType={persistType}
              persistType={"Additional"} //for test only
              persistData={persistData}
            /> */}
          </>
        ) : (
          //splash Screen 필요!
          <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{ flex: 1 }}
              source={require("./assets/images/splash.png")}
            />
          </SafeAreaView>
        )}
      </NavigationContainer>
    </Provider>
  );
}
