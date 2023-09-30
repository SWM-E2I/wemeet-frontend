import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Image, Alert, Dimensions } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as SecureStore from "expo-secure-store";
import { RootStackNavigation } from "./navigations/RootStackNavigation.js";
import { persistLoginApi } from "./api/persist.js";
import { mainColor } from "./styles/commonStyles.js";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import Constants from "expo-constants";

// const Stack = createNativeStackNavigator();
async function checkPersistType(
  setLoading,
  setPersistType,
  setPersistData,
  controller
) {
  //이때 실행되는 splash image 필요!!!
  // Alert.alert("업데이트 실행", "잠시만 기다려주세요"); //for test only
  setLoading(true);
  let result = await SecureStore.getItemAsync("refreshToken");
  if (result) {
    //persist Api 실행
    const res = await persistLoginApi(controller);
    if (res) {
      setPersistData(res);
      if (res.hasMainProfileImage) {
        setPersistType("MainTab");
        setLoading(false);
        return;
      } else {
        setPersistType("Additional");
        setLoading(false);
        return;
      }
    }
  }
  //refreshToken이 없는 경우 - 미가입회원이거나 로그아웃한 경우 OR refreshToken이 만료된 경우
  //로그아웃시 Refreshtoken = null로 바꿔주기
  setLoading(false);
  return;
}
export default function App() {
  const [fontsLoaded] = useFonts({
    pretendard400: require("./assets/fonts/Pretendard400.otf"),
    pretendard500: require("./assets/fonts/Pretendard500.otf"),
    pretendard600: require("./assets/fonts/Pretendard600.otf"),
    pretendard700: require("./assets/fonts/Pretendard700.otf"),
  });

  const [persistType, setPersistType] = useState("Initial"); //persist-type check; true - to MainScreen , false - to AuthScreen
  const [persistData, setPersistData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const controller = new AbortController();

  const onFetchUpdateAsync = async () => {
    console.log("onFetchUpdateAsync 실행");
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert("업데이트 실행", "잠시만 기다려주세요");
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
      console.log("업데이트 없음");
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      Alert.alert(
        "최신 업데이트 정보를 가져오는 중 에러가 발생했습니다.",
        `${error}`
      );
    }
  };
  useEffect(() => {
    const prepare = async () => {
      console.log("Current App Version : ", Constants.expoConfig.version); //version 찾는법!!!
      await onFetchUpdateAsync();
      await SplashScreen.preventAutoHideAsync();
      checkPersistType(setLoading, setPersistType, setPersistData, controller);
    };
    prepare();
    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);

  if (!fontsLoaded) return null; //각종 이미지, gif도 마찬가지!!
  else {
    SplashScreen.hideAsync();
  }
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      {/* <StatusBar translucent={false} style="light" /> */}
      {/* 나중에 status bar도 customize하기 */}
      {!Loading ? (
        <RootStackNavigation
          persistType={persistType}
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
        ></View>
      )}
    </Provider>
  );
}
