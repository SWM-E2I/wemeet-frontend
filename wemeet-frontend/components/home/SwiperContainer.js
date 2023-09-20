import { View, Dimensions, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import HomeCard from "./HomeCard";
import Swiper from "react-native-deck-swiper";
import { subColorBlack } from "../../styles/commonStyles";
import { set } from "react-native-reanimated";

const WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = WIDTH * 0.88;
const SwiperContainer = ({ cardData, navigation }) => {
  const animation = useRef(null); //for Lottie
  const [showLottie, setShowLottie] = useState(false);
  useEffect(() => {
    if (cardData.length == 1) {
      setShowLottie(false);
    } else {
      setShowLottie(true);
      setTimeout(() => {
        setShowLottie(false);
      }, 3000);
    }
  }, []);

  return (
    <>
      <Swiper
        //몇번째 카드인지 보여주기!!
        cards={cardData}
        renderCard={(card) => (
          <HomeCard
            card={card}
            navigation={navigation}
            end={card.end ? true : false}
            key={card.teamId}
            noData={cardData.length == 1 ? true : false}
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
      {showLottie && (
        <Pressable
          style={{
            flexDirection: "row",
            position: "absolute",
            alignSelf: "center",
            // height: Dimensions.get("window").height,
            // width: CARD_WIDTH,
          }}
          onPress={() => {
            setTimeout(() => {
              setShowLottie(false);
            }, 1000);
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: CARD_WIDTH / 2,
            }}
            source={require("../../assets/lottie/leftSwipe.json")}
          />
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: CARD_WIDTH / 2,
            }}
            source={require("../../assets/lottie/rightSwipe.json")}
          />
        </Pressable>
      )}
    </>
  );
};

export default SwiperContainer;
