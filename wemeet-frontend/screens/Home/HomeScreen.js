import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { mainColor, subColorPink } from "../../styles/commonStyles";
import { roughCardData } from "../../assets/mock.js";
import HomeCard from "../../components/home/HomeCard";
import AboveContainer from "../../components/home/AboveContainer";
import Swiper from "react-native-deck-swiper";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.8;
const CARD_HEIGHT = HEIGHT * swiperHeightPercentage * 0.7;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;

//3초마다 넘어감
//매일 밤 11:11분\n새로운 친구들을 만나봐! -> 1/2 , 2/2 // 3초마다 넘어감
//Status Bar 흰색으로하기

const apiCardData = [...roughCardData, { end: true }];

// console.log(WIDTH, HEIGHT);

const HomeScreen = ({ navigation }) => {
  //API나오면, 좋아요했는지 여부를 트래킹하는 것이 필요!! (좋아요 누른 경우 하트 채워주기, 안누른 경ㅇ우 빈 하트)
  //MBTI를 모르는 경우도 처리해야함!!! "XXXX"
  // const [progress, setProgress] = useState(0);
  // console.log("apiCardData :", apiCardData);
  const [recommended, setRecommended] = useState(false);
  return (
    <View
      style={[
        {
          justifyContent: "space-around",
          flex: 1,
          backgroundColor: mainColor,
        },
        // { flex: 1, justifyContent: "center", alignItems: "center" },
      ]} //주석 친 부분을 사용하면 이상하게 배치 되는 이유?
    >
      {/* statusbar까지 영역에 포함하기 위해 safeAreaView 미사용 */}
      <AboveContainer />
      <View style={styles.swiperContainer}>
        {recommended ? (
          <Swiper
            //몇번째 카드인지 보여주기!!
            cards={apiCardData}
            renderCard={(card) =>
              card.end ? (
                <View style={styles.card}>
                  <Text style={styles.touchText}>
                    오늘의 추천 카드는 여기까지!
                  </Text>

                  <Button title={"더 추천 받기"}></Button>
                </View>
              ) : (
                <HomeCard card={card} navigation={navigation} />
              )
            }
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
            backgroundColor={mainColor}
            showSecondCard
            cardVerticalMargin={20}
            stackAnimationFriction={4}
            stackAnimationTension={10}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setRecommended(true);
            }}
            style={styles.card}
          >
            <View style={styles.cardImageView}>
              <Image
                source={require("../../assets/images/recommend.gif")}
                style={styles.cardImage}
                resizeMode={"contain"}
              ></Image>
            </View>
            <Text style={styles.touchText}>터치해서 친구들 불러오기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
// console.log(getStatusBarHeight(true));
const styles = StyleSheet.create({
  swiperContainer: {
    flex: swiperHeightPercentage,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: mainColor,
    // backgroundColor: "white",
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: cardBorderRadius,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: mainColor,
    borderColor: "#2E2E32",
    borderWidth: 1,
    alignSelf: "center",
    shadowColor: "rgba(0, 0, 0, 0.79)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 25,
  },
  cardImageView: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT * 0.8,
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
    alignItems: "center",
  },
  cardImage: {
    width: CARD_WIDTH * 0.65,
    height: CARD_HEIGHT * 0.75,
  },
  infoBox: {
    width: "100%",
    height: CARD_HEIGHT - CARD_WIDTH,
    borderBottomLeftRadius: cardBorderRadius,
    borderBottomRightRadius: cardBorderRadius,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    // backgroundColor: "#272727",
  },
  touchText: {
    color: "white",
    fontSize: 16,
  },
});

{
  /*아래는 progress bar 참고 코드!! */
}
{
  /* <Progress.Bar
        progress={progress}
        width={250}
        height={10}
        // useNativeDriver => 해 말아?
        color={"#F59B40"}
        unfilledColor={"#ECECEC"}
        borderRadius={16}
        borderWidth={0}
      />
      <Button
        title={"눌러봐"}
        onPress={() => {
          progress >= 1 ? setProgress(0) : setProgress(progress + 0.3);
        }}
      /> */
}

export default HomeScreen;
