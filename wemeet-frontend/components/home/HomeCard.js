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

const HomeCard = ({ card, navigation, end, noData }) => {
  // console.log("noData?", noData);
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
      {Dimensions.get("window").height > 695 && (
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
      )}
    </TouchableOpacity>
  ) : !noData ? (
    <View
      style={[
        styles.card,
        {
          height:
            Dimensions.get("window").height > 695
              ? CARD_WIDTH + 86
              : CARD_WIDTH,
          backgroundColor: mainColor,
          overflow: "hidden",
        },
      ]}
    >
      <Text
        style={[
          styles.endText,
          { fontFamily: "pretendard600", fontSize: 22, left: 30, top: 50 },
        ]}
      >
        {"지금은 추천 해줄 친구가 없어⏰"}
      </Text>
      <Text
        style={[
          styles.endText,
          {
            fontFamily: "pretendard600",
            fontSize: 16,
            left: 30,
            top: 90,
            color: "#9C9C9C",
          },
        ]}
      >
        {"새로운 친구를 금방 소개해줄게"}
      </Text>
      <View style={{ position: "absolute", left: 30, bottom: 20 }}>
        <Image
          source={require("../../assets/images/elevenEleven.png")}
          style={{
            width: 180,
            alignSelf: "flex-start",
          }}
          resizeMode={"contain"}
        />
      </View>
      <Text style={[styles.endText, { left: 30, bottom: 50 }]}>
        {"잠시 후에 다시 시도해줘!"}
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
      />
    </View>
  ) : (
    <View
      style={[
        styles.card,
        {
          height:
            Dimensions.get("window").height > 695
              ? CARD_WIDTH + 86
              : CARD_WIDTH,
          backgroundColor: mainColor,
          overflow: "hidden",
        },
      ]}
    >
      <Text
        style={[
          styles.endText,
          { fontFamily: "pretendard600", fontSize: 22, left: 30, top: 30 },
        ]}
      >
        오늘의 친구들은 어땠어?
      </Text>
      <Text
        style={[
          styles.endText,
          {
            fontFamily: "pretendard600",
            fontSize: 16,
            left: 30,
            top: 70,
            color: "#9C9C9C",
          },
        ]}
      >
        {
          "오늘의 추천 친구는 여기까지야\n용기를 내서 '좋아요', '신청하기'를 눌러봐!"
        }
      </Text>
      <View style={{ position: "absolute", left: 30, bottom: 20 }}>
        <Image
          source={require("../../assets/images/elevenEleven.png")}
          style={{
            width: 180,
            alignSelf: "flex-start",
          }}
          resizeMode={"contain"}
        />
      </View>
      <Image
        source={require("../../assets/characters/EndCharacter.png")}
        style={{
          // aspectRatio: 1,
          position: "absolute",
          bottom: Dimensions.get("window").height <= 695 ? 40 : 80,
          right: -30,
          height: 185,
          width: Dimensions.get("window").height <= 695 ? 100 : 150,
        }}
        resizeMode={"contain"}
      ></Image>
      <Text style={[styles.endText, { left: 30, bottom: 70, fontSize: 12 }]}>
        {
          "❤️ '좋아요' 누르면 매칭 확률이 올라가!\n‼️ 하루 한번만 누를 수 있으니 신중하게!"
        }
      </Text>
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
    overflow: Dimensions.get("window").height <= 695 ? "hidden" : null, //Device 크기 따라 분기 -> 작으면 hidden, 크면 visible
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
