import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { pushTokenApi } from "./api/push.js";

const APPSTORE_LINK =
  "https://apps.apple.com/kr/app/%EC%9C%84%EB%B0%8B-%EB%8C%80%ED%95%99%EC%83%9D-%EB%AF%B8%ED%8C%85-%EA%B3%BC%ED%8C%85-%EC%97%AC%EA%B8%B0%EC%84%9C-%EB%A7%8C%EB%82%98/id6466416689?l=en-GB";
const PLAYSTORE_LINK =
  "https://play.google.com/store/apps/details?id=net.andrewjsy.wemeet&pcampaignid=web_share";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
}); //foreground에서도 notification을 받을 수 있도록
// // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

async function checkPersistType(
  setLoading,
  setPersistType,
  setPersistData,
  controller,
  expoPushToken
) {
  setLoading(true);
  let result = await SecureStore.getItemAsync("refreshToken");
  if (result) {
    //persist Api 실행
    const res = await persistLoginApi(controller);
    if (res) {
      console.log("res.pushTokens : ", res.pushTokens);
      console.log("expoPushToken :", expoPushToken);
      if (!res.pushTokens.includes(expoPushToken)) {
        await pushTokenApi(true, controller);
      }
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
    //가입회원, 로그인 된 경우임 => push TOken 주기 (with accessToken)
  }
  //refreshToken이 없는 경우 - 미가입회원이거나 로그아웃한 경우 OR refreshToken이 만료된 경우
  //로그아웃시 Refreshtoken = null로 바꿔주기
  setLoading(false);
  return;
}
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
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
      console.log("Current App Version : ", Constants.expoConfig.version);
      if (Constants.expoConfig.version != "1.0.6")
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
      registerForPushNotificationsAsync().then(async (token) => {
        console.log("expoPushToken : ", token);
        await SecureStore.setItemAsync("expoPushToken", token);
        setExpoPushToken(token);
      });

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
      await onFetchUpdateAsync();
      await SplashScreen.preventAutoHideAsync();
      await checkPersistType(
        setLoading,
        setPersistType,
        setPersistData,
        controller,
        expoPushToken
      );
    };
    prepare();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
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
