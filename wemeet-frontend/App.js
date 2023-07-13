import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Image } from "react-native";
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
      setPersistType(true);
      console.log("앱 실행, 로그인 유지");
      setLoading(false);
      return;
    }
  }
  //refreshToken이 없는 경우 - 미가입회원이거나 로그아웃한 경우 OR refreshToken이 만료된 경우
  //로그아웃시 Refreshtoken = null로 바꿔주기
  console.log("앱 실행, 인증 페이지로 이동");
  setPersistType(false);
  setLoading(false);
  return;
}
export default function App() {
  const [persistType, setPersistType] = useState(false); //persist-type check; true - to MainScreen , false - to AuthScreen
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
          <>{persistType ? <MainScreen /> : <RegisterStackNavigation />}</>
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
