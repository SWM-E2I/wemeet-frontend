import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Alert,
  Dimensions,
  Platform,
  Linking,
} from "react-native";
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

const APPSTORE_LINK =
  "https://apps.apple.com/kr/app/%EC%9C%84%EB%B0%8B-%EB%8C%80%ED%95%99%EC%83%9D-%EB%AF%B8%ED%8C%85-%EA%B3%BC%ED%8C%85-%EC%97%AC%EA%B8%B0%EC%84%9C-%EB%A7%8C%EB%82%98/id6466416689?l=en-GB";
const PLAYSTORE_LINK =
  "https://play.google.com/store/apps/details?id=net.andrewjsy.wemeet&pcampaignid=web_share";
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
      console.log(
        "최신 업데이트 정보를 가져오는 중 에러가 발생했습니다.",
        `${error}`
      );
    }
  };
  useEffect(() => {
    const prepare = async () => {
      console.log("Current App Version : ", Constants.expoConfig.version); //version 찾는법!!!
      if (Constants.expoConfig.version != "1.0.5")
        Alert.alert("업데이트 필요", "앱을 최신 버전으로 업데이트 해줘!", [
          {
            text: "나중에 할래",
          },
          {
            text: "지금 업데이트",
            onPress: () => {
              Linking.openURL(
                Platform.OS == "ios" ? APPSTORE_LINK : PLAYSTORE_LINK
              ).catch((err) =>
                console.error(
                  "AboveContainer : An error occurred while opening browswer",
                  err
                )
              );
            },
          },
        ]);

      await onFetchUpdateAsync();
      await SplashScreen.preventAutoHideAsync();
      await checkPersistType(
        setLoading,
        setPersistType,
        setPersistData,
        controller
      );
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
      {!Loading ? (
        <RootStackNavigation
          persistType={persistType}
          // persistType={"MainTab"} //임시
          persistData={persistData}
        />
      ) : (
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
