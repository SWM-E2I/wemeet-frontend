import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Image, Alert, Dimensions } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as SecureStore from "expo-secure-store";
import { RootStackNavigation } from "./navigations/RootStackNavigation.js";
import { persistLoginApi } from "./api/persist.js";
import { mainColor } from "./styles/commonStyles.js";

// const Stack = createNativeStackNavigator();
async function checkPersistType(
  setLoading,
  setPersistType,
  setPersistData,
  controller
) {
  //이때 실행되는 splash image 필요!!!
  setLoading(true);
  let result = await SecureStore.getItemAsync("refreshToken");
  console.log("앱 실행>refreshToken: ", result);
  if (result) {
    //persist Api 실행
    const res = await persistLoginApi(controller);
    if (res) {
      setPersistData(res);
      if (res.emailAuthenticated && res.hasMainProfileImage) {
        setPersistType("MainTab");
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
      <StatusBar style="light" />
      {/* <StatusBar translucent={false} style="light" /> */}
      {/* 나중에 status bar도 customize하기 */}
      {!Loading ? (
        <RootStackNavigation
          // persistType={persistType}
          // persistType={"Nickname"} // for Test only
          persistType={"MainTab"} //for Test only
          // persistType={"Additional"} //for test only
          persistData={persistData}
        />
      ) : (
        //splash Screen 필요!
        <View
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            backgroundColor: mainColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Image
            height={Dimensions.get("window").height}
            width={Dimensions.get("window").width}
            resizeMode="cover"
            source={require("./assets/images/splash.png")}
          /> */}
        </View>
      )}
    </Provider>
  );
}
