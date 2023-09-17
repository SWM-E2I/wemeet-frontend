import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Progress from "react-native-progress";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
} from "../../styles/commonStyles";
import HomeCard from "../../components/home/HomeCard";
import AboveContainer from "../../components/home/AboveContainer";
import Swiper from "react-native-deck-swiper";
import InitialCard from "../../components/home/InitialCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { suggestionCheckApi } from "../../api/home";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestState } from "../../redux/suggestSlice";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";
import SwiperContainer from "../../components/home/SwiperContainer";
import { creditInquiryApi } from "../../api/signal";
import { setSignal } from "../../redux/signalSlice";
import { refresh } from "../../api/axios";
import * as Clipboard from "expo-clipboard";

const swiperHeightPercentage = 0.7;
const WIDTH = Dimensions.get("window").width;

const timeLeft = () => {
  const activationTime = 23 * 3600 + 11 * 60 + 10; //11시 11분 59초
  // const activationTime = 18 * 3600 + 44 * 60 + 10; //for test only
  let currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });

  const currentTimeString = currentTime.split(", ")[1].split(" ")[0]; // 문자열에서 각 요소 추출
  let currentHour =
    currentTime.split(", ")[1].split(" ")[1] == "PM"
      ? Number(currentTimeString.split(":")[0]) + 12
      : Number(currentTimeString.split(":")[0]) == 12
      ? 0
      : Number(currentTimeString.split(":")[0]); //24시간제로 변환
  const currentMinute = Number(currentTimeString.split(":")[1]);
  const currentSecond = Number(currentTimeString.split(":")[2]);
  // console.log(currentHour, currentMinute, currentSecond);

  currentTime = currentHour * 3600 + currentMinute * 60 + currentSecond;
  // currentTime = 83461; //for Test only
  let timeUntilActivation =
    currentTime > activationTime
      ? 24 * 3600 - currentTime + activationTime
      : activationTime - currentTime;
  return timeUntilActivation;
};
const HomeScreen = ({ navigation }) => {
  // const animation = useRef(null); //for Lottie
  const cardData = useSelector((state) => state.suggest.cards);
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState(false);
  const [timeUntilActivation, setTimeUntilActivation] = useState(timeLeft());
  const controller = new AbortController();
  const onMount = async () => {
    // return true;
    let res = await creditInquiryApi(navigation, controller);
    if (res == "LOGOUT") {
      return null;
    } else if (res) dispatch(setSignal(res));
    const nomore = await SecureStore.getItemAsync("nomore");
    if (nomore == null) navigation.navigate("Help");
    let result = await suggestionCheckApi(navigation, controller);
    if (result) {
      if (result.isReceivedSuggestion) {
        dispatch(setSuggestState(result.teams)); //추천받은 카드데이터 들고있기!
        setRecommended(true);
        setTimeUntilActivation(timeLeft());
      } else {
        setRecommended(false);
        setTimeUntilActivation(0);
      }
    } else {
      //조회에 실패한경우!!!
      // Alert.alert("조회에 실패했습니다.", "잠시 후 다시 시도해주세요");
    }
  };
  const onRefresh = async () => {
    let result = await suggestionCheckApi(navigation, controller);
    if (result) {
      if (!result.isReceivedSuggestion) {
        setRecommended(false);
        setTimeUntilActivation(0);
      } else {
        //이미 추천이 받아졌던 경우 : 즉, 계산한 시간이 서버보다 빨라서 타이머가 0이 되었던 경우 => 계속해서 '새로고침'가능하게 해줘야함
        // dispatch(
        //   setSuggestState([
        //     { end: true, teamId: -3 },
        //     { end: true, teamId: -4 },
        //     ...result.teams,
        //     { end: true, teamId: -2 },
        //   ])
        // );
        //추천받은 카드데이터 들고있기!, for test only -> update되는지 확인
        dispatch(setSuggestState(result.teams)); //추천받은 카드데이터 들고있기!
      }
    } else {
      //조회에 실패한경우!!!
      Alert.alert("조회에 실패했습니다.", "잠시 후 다시 시도해주세요");
    }
  };
  useEffect(() => {
    onMount();
    return () => {
      // controller.abort();
    };
  }, []);
  useEffect(() => {
    let timeOutId = null;
    // timeOutId = setTimeout(() => {
    //   setTimeUntilActivation(timeLeft());
    // }, 1000);
    if (!recommended) setTimeUntilActivation(0);
    else if (recommended && timeUntilActivation == 0) {
      setTimeUntilActivation(0);
    } else {
      timeOutId = setTimeout(() => {
        setTimeUntilActivation(timeLeft());
      }, 1000);
    }
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, [timeUntilActivation]);

  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        Platform.OS == "android" ? { paddingTop: 0 } : null,
      ]} //안드로이드 버그 해결 -> why?
    >
      <AboveContainer
        navigation={navigation}
        timeUntilActivation={timeUntilActivation}
        activateButton={
          !recommended ||
          timeUntilActivation == 0 ||
          (cardData.length == 1 ? true : false)
        }
        onPress={onRefresh}
      />
      <View style={styles.swiperContainer}>
        {recommended ? (
          <>
            <SwiperContainer cardData={cardData} navigation={navigation} />
          </>
        ) : (
          <>
            <InitialCard
              setRecommended={setRecommended}
              navigation={navigation}
              timeLeft={timeLeft}
              setTimeUntilActivation={setTimeUntilActivation}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: swiperHeightPercentage,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: subColorBlack,
  },
});

export default HomeScreen;
