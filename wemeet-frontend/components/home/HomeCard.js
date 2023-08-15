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
  subColorBlue,
  subColorPink,
} from "../../styles/commonStyles";
import { BlurView } from "expo-blur";
// import { BlurView } from "@react-native-community/blur";
import { LinearGradient } from "expo-linear-gradient";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const swiperHeightPercentage = 0.8;
const CARD_HEIGHT = HEIGHT * swiperHeightPercentage * 0.7;
const CARD_WIDTH = WIDTH * 0.88;
const cardBorderRadius = 10;

const HomeCard = ({ card, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("HomeDetail");
      }}
      style={styles.card}
    >
      <View>
        <Image
          source={{ uri: card.mainImageURL }}
          style={styles.cardImage}
          resizeMode={"cover"} //or, cover?
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 900,
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
          <Text style={{ marginLeft: 3, fontSize: 30, color: "white" }}>
            {card.memberNum}
          </Text>
        </View>
      </View>
      <View style={[styles.infoBox, { overflow: "hidden" }]} opacity={1}>
        <BlurView
          intensity={20}
          tint={"dark"}
          style={{ width: "100%", height: "100%" }}
        >
          <LinearGradient
            colors={["rgba(39, 39, 39, 0.70)", "rgba(19, 20, 23, 0.70)"]}
            style={styles.gradientBox}
          >
            <Image
              source={{ uri: card.profileImageURL }}
              // height={CARD_HEIGHT - CARD_WIDTH - 22}
              // width={CARD_HEIGHT - CARD_WIDTH - 22} //임시
              style={styles.profileImage}
              resizeMode={"cover"}
            ></Image>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 14,
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  {`${card.leader.nickName} / ${card.leader.mbti}`}
                </Text>
                <View style={styles.verifiedLabel}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    대학 인증 완료
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: "white",
                  fontWeight: 600,
                  marginBottom: 5,
                }}
              >
                {card.leader.college}
              </Text>
            </View>
          </LinearGradient>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: cardBorderRadius,
    alignItems: "center",
    backgroundColor: "transparent",
    // backgroundColor: "yellow",
    alignSelf: "center",
    elevation: 10, //for android
    shadowColor: "rgba(0, 0, 0, 0.79)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 25,
    // overflow: "hidden",
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
    height: CARD_HEIGHT - CARD_WIDTH,
    borderBottomLeftRadius: cardBorderRadius,
    borderBottomRightRadius: cardBorderRadius,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    backgroundColor: Platform.OS == "android" ? mainColor : null, //android는 blurview적용이 안됨
  },
  gradientBox: {
    width: "100%",
    height: CARD_HEIGHT - CARD_WIDTH,
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
});

export default HomeCard;
