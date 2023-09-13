import { View, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
} from "../../styles/commonStyles";
import { roughCardData } from "../../assets/mock.js";
import HomeCard from "../../components/home/HomeCard";
import AboveContainer from "../../components/home/AboveContainer";
import Swiper from "react-native-deck-swiper";
import InitialCard from "../../components/home/InitialCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { suggestionCheckApi } from "../../api/home";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestState } from "../../redux/suggestSlice";
// import { refresh } from "../../api/axios";

const swiperHeightPercentage = 0.7;

const timeLeft = () => {
  const activationTime = 23 * 3600 + 11 * 60 + 59; //11시 11분 59초
  // const activationTime = 18 * 3600 + 44 * 60 + 10; //for test only
  let currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  const currentTimeString = currentTime.split(", ")[1].split(" ")[0]; // 문자열에서 각 요소 추출
  let currentHour =
    currentTime.split(", ")[1].split(" ")[1] == "PM"
      ? Number(currentTimeString.split(":")[0]) + 12
      : Number(currentTimeString.split(":")[0]); //24시간제로 변환
  const currentMinute = Number(currentTimeString.split(":")[1]);
  const currentSecond = Number(currentTimeString.split(":")[2]);
  currentTime = currentHour * 3600 + currentMinute * 60 + currentSecond;
  // currentTime = 83461; //for Test only
  let timeUntilActivation =
    currentTime > activationTime
      ? 24 * 3600 - currentTime + activationTime
      : activationTime - currentTime;
  return timeUntilActivation;
};
const HomeScreen = ({ navigation }) => {
  //API나오면, 좋아요했는지 여부를 트래킹하는 것이 필요!! (좋아요 누른 경우 하트 채워주기, 안누른 경우 빈 하트)
  //MBTI를 모르는 경우도 처리해야함!!! "XXXX"
  const cardData = useSelector((state) => state.suggest.cards);
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState(false);
  const [timeUntilActivation, setTimeUntilActivation] = useState(timeLeft());

  const controller = new AbortController();
  const onMount = async () => {
    // return true;
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
      Alert.alert("조회에 실패했습니다.", "잠시 후 다시 시도해주세요");
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
        // ); //추천받은 카드데이터 들고있기!, for test only -> update되는지 확인
        dispatch(setSuggestState(result.teams)); //추천받은 카드데이터 들고있기!
      }
    } else {
      //조회에 실패한경우!!!
      Alert.alert("조회에 실패했습니다.", "잠시 후 다시 시도해주세요");
    }
  };
  useEffect(() => {
    // refresh();
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    let timeOutId = null;
    // timeOutId = setTimeout(() => {
    //   setTimeUntilActivation(timeLeft());
    // }, 1000);
    if (!recommended) setTimeUntilActivation(0);
    else if (recommended && timeUntilActivation == 0) {
      // onMount();
      setTimeUntilActivation(0);
    } else {
      timeOutId = setTimeout(() => {
        setTimeUntilActivation(timeLeft());
      }, 1000);
    }
    // console.log("recommended:", recommended, timeUntilActivation);
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
      {/* statusbar까지 영역에 포함하기 위해 safeAreaView 미사용 */}
      <AboveContainer
        navigation={navigation}
        timeUntilActivation={timeUntilActivation}
        activateButton={!recommended || timeUntilActivation == 0}
        onPress={onRefresh}
      />
      <View style={styles.swiperContainer}>
        {recommended ? (
          //cardData.length == 1 (end 밖에 없는경우)=> 분기해서 만들기?!
          <Swiper
            //몇번째 카드인지 보여주기!!
            cards={cardData}
            renderCard={(card) => (
              <HomeCard
                card={card}
                navigation={navigation}
                end={card.end ? true : false}
                key={card.teamId}
              />
            )}
            cardIndex={0}
            stackSize={cardData.length == 1 ? 1 : 2}
            horizontalSwipe={cardData.length == 1 ? false : true}
            verticalSwipe={false}
            swipeAnimationDuration={500}
            stackSeparation={20} //얼마로 해야할지 다시 무렁보기
            stackScale={5}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            animateCardOpacity
            infinite //임시
            backgroundColor={subColorBlack}
            showSecondCard
            cardVerticalMargin={20} //작은 화면일땐 어떨지... SE로 확인 ㅠ
            stackAnimationFriction={4}
            stackAnimationTension={10}
          />
        ) : (
          <InitialCard
            setRecommended={setRecommended}
            navigation={navigation}
            timeLeft={timeLeft}
            setTimeUntilActivation={setTimeUntilActivation}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  swiperContainer: {
    flex: swiperHeightPercentage,
    alignItems: "center",
    backgroundColor: subColorBlack,
  },
});

export default HomeScreen;
