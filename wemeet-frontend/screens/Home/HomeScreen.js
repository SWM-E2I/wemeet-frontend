import { View, StyleSheet, Dimensions, Alert } from "react-native";
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

//3초마다 넘어감
//매일 밤 11:11분\n새로운 친구들을 만나봐! -> 1/2 , 2/2 // 3초마다 넘어감
//Status Bar 흰색으로하기

// console.log(WIDTH, HEIGHT);

const HomeScreen = ({ navigation }) => {
  //API나오면, 좋아요했는지 여부를 트래킹하는 것이 필요!! (좋아요 누른 경우 하트 채워주기, 안누른 경ㅇ우 빈 하트)
  //MBTI를 모르는 경우도 처리해야함!!! "XXXX"
  // const [progress, setProgress] = useState(0);
  const cardData = useSelector((state) => state.suggest.cards);
  console.log([...cardData, { end: true, teamId: -1 }]);
  const apiCardData = [...cardData, { end: true }];

  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState(false);
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
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <SafeAreaView
      style={commonStyles.safeAreaView} //주석 친 부분을 사용하면 이상하게 배치 되는 이유?
    >
      {/* statusbar까지 영역에 포함하기 위해 safeAreaView 미사용 */}
      <AboveContainer />
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
            stackSize={2}
            horizontalSwipe
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
            cardVerticalMargin={5}
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
