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

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.7;

console.log("HEIGHT : ", HEIGHT, "WIDTH : ", WIDTH);

//3초마다 넘어감
//매일 밤 11:11분\n새로운 친구들을 만나봐! -> 1/2 , 2/2 // 3초마다 넘어감
// 700이하인경우?

const timeLeft = () => {
  const activationTime = 23 * 3600 + 11 * 60 + 0; //11시 11분 0초
  let currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  // 문자열에서 각 요소 추출
  const currentTimeString = currentTime.split(", ")[1].split(" ")[0];
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
  // console.log(
  //   "현재시간! :",
  //   Math.floor(currentTime / 3600),
  //   Math.floor((currentTime % 3600) / 60),
  //   (currentTime % 3600) % 60
  // );
  // console.log(
  //   "남은시간! :",
  //   Math.floor(timeUntilActivation / 3600),
  //   Math.floor((timeUntilActivation % 3600) / 60),
  //   (timeUntilActivation % 3600) % 60
  // );
  return timeUntilActivation;
};
console.log("Device height : ", HEIGHT, "Device width : ", WIDTH); //700이하인경우
const HomeScreen = ({ navigation }) => {
  //API나오면, 좋아요했는지 여부를 트래킹하는 것이 필요!! (좋아요 누른 경우 하트 채워주기, 안누른 경우 빈 하트)
  //MBTI를 모르는 경우도 처리해야함!!! "XXXX"
  const cardData = useSelector((state) => state.suggest.cards);
  // const [apiCardData, setApiCardData] = useState([]) // 이후 useEffect로 관리 -> 아래 코드는 일회성, 추가로 추천을 받거나 하면..ㅇㅇ 필요
  const apiCardData = [...cardData, { end: true, teamId: -1 }]; //수정필요함!! cardData의 업데이트 내용을 반영하지 못해!!
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState(false);
  const [timeUntilActivation, setTimeUntilActivation] = useState(timeLeft());
  const controller = new AbortController();
  const onMount = async () => {
    let result = await suggestionCheckApi(navigation, controller);
    if (result) {
      if (result.isReceivedSuggestion) {
        dispatch(setSuggestState(result.teams)); //추천받은 카드데이터 들고있기!
        setRecommended(true);
      } else setRecommended(false);
    }
  };

  // console.log(timeUntilActivation); //잘 동작함. 단 mount되기 전까지 계속 실행된다는 점 인지
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setTimeUntilActivation(timeLeft());
    }, 1000);
    // console.log(timeUntilActivation);
    return () => clearTimeout(timeOutId);
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
      />
      <View style={styles.swiperContainer}>
        {recommended ? (
          <Swiper
            //몇번째 카드인지 보여주기!!
            cards={apiCardData}
            renderCard={(card) => (
              <HomeCard
                card={card}
                navigation={navigation}
                end={card.end ? true : false}
                key={card.teamId}
              />
            )}
            cardIndex={0}
            stackSize={apiCardData.length == 1 ? 1 : 2}
            horizontalSwipe={apiCardData.length == 1 ? false : true}
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
          />
        )}
      </View>
    </SafeAreaView>
  );
};
// console.log(getStatusBarHeight(true));
const styles = StyleSheet.create({
  swiperContainer: {
    flex: swiperHeightPercentage,
    alignItems: "center",
    backgroundColor: subColorBlack,
  },
});

export default HomeScreen;
