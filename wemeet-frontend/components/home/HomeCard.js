import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  mainColor,
  subColorBlue,
  subColorPink,
} from "../../styles/commonStyles";
// import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import LeaderCard from "./LeaderCard";
import { detailApi } from "../../api/home";

const WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;

const HomeCard = ({ card, navigation, end, short }) => {
  console.log(card);
  const controller = new AbortController();
  const onPress = async () => {
    //HomeDetail Screen으로 이동하면서 parameter로 teamId를 전달
    navigation.navigate("HomeDetail", { teamId: card.teamId });
  };
  useEffect(() => {
    return () => {
      controller.abort();
      //dfs
    };
  }, []);
  return !end ? (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View>
        <Image
          source={{
            // uri: "www.naver.com", //임시
            uri: card.mainImageURL, //요게 진짜
          }}
          style={styles.cardImage}
          resizeMode={"cover"} //or, cover?
          // blurRadius={10}
        />
        <LinearGradient
          colors={["#141519", "rgba(20, 21, 25, 0.00)"]}
          start={[0, 1]}
          end={[0, 0]}
          style={{
            position: "absolute",
            width: CARD_WIDTH,
            height: CARD_WIDTH / 2,
            bottom: 0,
          }}
        />
        <Text
          style={{
            fontFamily: "pretendard600",
            fontSize: 30,
            left: "5%",
            bottom: "5%",
            position: "absolute",
            color: "white",
          }}
        >
          {card.region}
        </Text>
        <View
          style={{
            position: "absolute",
            right: "5%",
            bottom: "5%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="person" size={30} color={"white"} />
          <Text
            style={{
              fontFamily: "pretendard500",
              marginLeft: 3,
              fontSize: 30,
              color: "white",
            }}
          >
            {card.memberNum}
          </Text>
        </View>
      </View>
      <LeaderCard
        style={{
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        nickName={card.leader.nickname}
        mbti={card.leader.mbti}
        college={card.leader.college}
        profile={card.profileImageURL}
      />
    </TouchableOpacity>
  ) : (
    <View
      style={[
        styles.card,
        {
          height: CARD_WIDTH + 86,
          backgroundColor: mainColor,
          overflow: "hidden",
        },
      ]}
    >
      <Text style={[styles.endText, { left: 30, bottom: 100 }]}>
        오늘의 친구 추천은 여기까지야!
      </Text>
      <Text style={[styles.endText, { left: 30, bottom: 50 }]}>
        {"친구들한테 내 카드를\n보여줄 수 있는 좋아요는 어떄?"}
      </Text>
      <Image
        source={require("../../assets/characters/EndCharacter.png")}
        style={{
          // aspectRatio: 1,
          position: "absolute",
          bottom: 60,
          right: -30,
          height: 185,
          width: 150,
        }}
        resizeMode={"contain"}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: cardBorderRadius,
    alignItems: "center",
    backgroundColor: "transparent",
    alignSelf: "center",
    borderColor: "#2E2E32",
    borderWidth: 1,
    elevation: 10, //for android
    shadowColor: "rgba(0, 0, 0, 0.79)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 25,
    // overflow: "hidden", //Device 크기 따라 분기 -> 작으면 hidden, 크면 visible
    // borderColor: "white",
    // borderWidth: 1,
    // overflow: "hidden",
    // backgroundColor: mainColor
    // marginVertical: "10%",
    //   "linear-gradient(180deg, rgba(39, 39, 39, 0.70) 0%, rgba(19, 20, 23, 0.70) 100%)",
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
    backgroundColor: "black",
  },
  infoBox: {
    width: "100%",
    height: 86,
    borderBottomLeftRadius: cardBorderRadius,
    borderBottomRightRadius: cardBorderRadius,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    backgroundColor: Platform.OS == "android" ? mainColor : null, //android는 blurview적용이 안됨
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "5%",
    flexDirection: "row",
  },
  verifiedLabel: {
    width: 85,
    height: 22,
    borderRadius: 3,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    aspectRatio: 1,
    height: "100%",
    borderRadius: 50,
  },
  endText: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    fontFamily: "pretendard400",
  },
});

export default HomeCard;
