import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import LeaderCard from "./LeaderCard";
import { AntDesign } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.7;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;

const Card = ({
  card,
  navigation,
  style,
  isLike,
  isSent,
  isArrived,
  isMatched,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        //임시,  like, sent, arrived, matched따라 모두 분기해야함
        if (isArrived) navigation.navigate("ArrivedDetail");
        else if (isMatched) navigation.navigate("MatchedDetail");
        else console.log("isLike or isSent clicked");
      }}
      style={[styles.card, style]}
    >
      <View style={{ overflow: "hidden" }}>
        <Image
          source={{ uri: card.mainImageURL }}
          style={[styles.cardImage, { width: "100%" }]}
          resizeMode={"cover"} //or, cover?
        />
        {isLike && (
          //임시!!
          <View style={styles.likeInfoContainer}>
            <AntDesign
              name="exclamationcircleo"
              size={20}
              //   color={subColorPink}
              // color={"#575757"}
              color={"white"}
            />
            <Text style={styles.infoText}>만료까지 23시간</Text>
          </View>
        )}
        {isSent && (
          <>
            <View
              style={{
                position: "absolute",
                left: "5%",
                top: "3%",
                backgroundColor: subColorBlack,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                수락 대기중
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: "5%",
                top: "3%",
                backgroundColor: subColorBlack,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                D-3
              </Text>
            </View>
          </>
        )}
        {isArrived && (
          //임시!!!
          <>
            <View
              style={{
                position: "absolute",
                left: "5%",
                top: "3%",
                backgroundColor: subColorBlack,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                응답 대기중
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: "5%",
                top: "3%",
                backgroundColor: subColorBlack,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                D-3
              </Text>
            </View>
          </>
        )}
        {isMatched && (
          //임시!!
          <View
            style={{
              position: "absolute",
              left: "5%",
              top: "3%",
              backgroundColor: subColorBlack,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 4,
            }}
          >
            <Text style={styles.infoText}>매칭완료</Text>
          </View>
        )}
        <Text
          style={{
            fontSize: 30,
            fontFamily: "pretendard600",
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
              marginLeft: 3,
              fontSize: 30,
              color: "white",
              fontFamily: "pretendard500",
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
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  likeInfoContainer: {
    // width: "100%",
    paddingHorizontal: 10,
    // backgroundColor: "rgba(19, 20, 23, 0.7)",
    backgroundColor: subColorBlack,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    paddingVertical: 6,
    position: "absolute",
    top: "3%",
    right: "5%",
  },
  infoText: {
    // color: subColorPink,
    color: "white",
    fontSize: 16,
    fontFamily: "pretendard600",
    marginLeft: 5,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: cardBorderRadius,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
    // elevation: 10, //for android
    // shadowColor: "rgba(0, 0, 0, 0.79)",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 1,
    // shadowRadius: 25,
    // overflow: "hidden",
    // borderColor: "white",
    // borderWidth: 1,
    // overflow: "hidden",
    // backgroundColor: mainColor
    // marginVertical: "10%",
    //   "linear-gradient(180deg, rgba(39, 39, 39, 0.70) 0%, rgba(19, 20, 23, 0.70) 100%)",
  },
  cardImage: {
    aspectRatio: 1,
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
  },
});

export default Card;
