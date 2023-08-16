import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { mainColor } from "../../styles/commonStyles";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.7;
const CARD_HEIGHT = HEIGHT * swiperHeightPercentage * 0.73;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;
const InitialCard = ({ setRecommended }) => {
  const [loading, isLoading] = useState(false);
  const onPress = () => {
    isLoading(true);
    setTimeout(() => {
      //여기서 API호출, 응답 성공시 넘어가기!!
      //응답 성공 못하면 loading false로 바꾸고, setrecommended는 그대로, alert띄워주기!
      setRecommended(true);
      isLoading(false);
    }, 3000);
  };
  return !loading ? (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardImageView}>
        <Image
          source={require("../../assets/images/recommend.gif")}
          style={styles.cardImage}
          resizeMode={"contain"}
        ></Image>
      </View>
      <Text style={styles.touchText}>터치해서 친구들 불러오기</Text>
    </TouchableOpacity>
  ) : (
    <View onPress={onPress} style={styles.card}>
      <View style={styles.cardImageView}>
        <Image
          source={{ uri: "https://www.quescafe.com/images/character/q.gif" }}
          width={CARD_WIDTH}
          height={CARD_HEIGHT * 0.8}
          //   style={styles.cardImage}
          resizeMode={"contain"}
        ></Image>
      </View>
      <Text style={styles.touchText}>오늘의 추천 친구를 불러오는 중</Text>
    </View>
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
    borderWidth: 1,
    alignSelf: "center",
    shadowColor: "rgba(0, 0, 0, 0.79)",
    shadowOffset: { width: 0, height: 4 },
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
  },
});

export default InitialCard;
