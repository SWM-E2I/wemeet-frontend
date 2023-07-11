import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as SecureStore from "expo-secure-store";
import { RegisterStackNavigation } from "./navigations/StackNavigation.js";
import MainScreen from "./screens/MainScreen.js";
import { refresh } from "./api/axios.js";

// const Stack = createNativeStackNavigator();
async function checkPersistType(setLoading, setPersistType) {
  //이때 실행되는 splash image 필요!!!
  setLoading(true);
  await SecureStore.setItemAsync("refreshToken", "임시rT");
  await SecureStore.setItemAsync("accessToken", "임시aT");
  let result = await SecureStore.getItemAsync("refreshToken");
  if (result) {
    //refresh 실행
    const accessToken = await refresh();
    if (accessToken) {
      //refresh 성공
      setPersistType(0);
      console.log("앱 실행, 로그인 유지");
    } else {
      //refresh 실패 (refreshToken만료 or else)
      console.log("앱 실행, refreshToken 만료 혹은 refresh 실패");
      setPersistType(1);
    }
  } else {
    //refreshToken이 없는 경우 - 미가입회원이거나 로그아웃한 경우
    //로그아웃시 Refreshtoken = null로 바꿔주기
    console.log("앱 실행, 미가입 혹은 로그아웃 회원");
    setPersistType(2);
  }
  setLoading(false);
}
export default function App() {
  const [persistType, setPersistType] = useState(0); //persist-type check; 0 : to Main Page, 1 : to AuthScreen , 2 : to Register Page (from scratch;termscreen)
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    checkPersistType(setLoading, setPersistType);
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!Loading ? (
          <>
            {persistType === 0 ? (
              <MainScreen />
            ) : (
              <RegisterStackNavigation persistType={persistType} />
            )}
          </>
        ) : (
          //splash Screen 필요!
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>초기 로딩 페이지 (스플래시 구현) </Text>
          </View>
        )}
      </NavigationContainer>
    </Provider>
  );
}
