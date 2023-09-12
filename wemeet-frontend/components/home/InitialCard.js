import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { mainColor } from "../../styles/commonStyles";
import { useDispatch } from "react-redux";
import { setSuggestState } from "../../redux/suggestSlice";
import { suggestionApi } from "../../api/home";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.7;
const CARD_HEIGHT = HEIGHT * swiperHeightPercentage * 0.73;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;

const InitialCard = ({ setRecommended, navigation }) => {
  const dispatch = useDispatch();
  const controller = new AbortController();
  const [loading, isLoading] = useState(false);
  const onPress = () => {
    isLoading(true);
    setTimeout(async () => {
      let result = await suggestionApi(navigation, controller);
      if (result == 40035) {
        Alert.alert("이미 오늘의 추천을 모두 받았어!");
        setRecommended(true);
        setTimeUntilActivation(timeLeft());
      } else if (result) {
        dispatch(setSuggestState(result)); //추천받은 카드데이터 들고있기!
        console.log(result);
        setRecommended(true);
        setTimeUntilActivation(timeLeft());
      }
      isLoading(false);
    }, 2000);
    // setTimeout(() => {
    //   //여기서 API호출, 응답 성공시 넘어가기!!
    //   //응답 성공 못하면 loading false로 바꾸고, setrecommended는 그대로, alert띄워주기!
    //   setRecommended(true);
    //   isLoading(false);
    // }, 3000);
  };
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardImageView}>
        <Image
          source={require("../../assets/images/recommend.gif")}
          style={styles.cardImage}
          resizeMode={"contain"}
        ></Image>
      </View>
      <Text style={styles.touchText}>
        {!loading
          ? "터치해서 친구들 불러오기"
          : "오늘의 추천 친구를 불러오는 중"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: cardBorderRadius,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: mainColor,
    borderColor: "#2E2E32",
    borderWidth: 2,
    alignSelf: "center",
    elevation: 10,
    shadowColor: "rgba(0, 0, 0, 0.79)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 25,
    marginVertical: 20,
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
  touchText: {
    color: "white",
    fontSize: 16,
    fontFamily: "pretendard400",
  },
});

export default InitialCard;
