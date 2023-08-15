import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import {
  mainColor,
  subColorBlue,
  subColorPink,
} from "../../styles/commonStyles";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Logo from "../../assets/vectors/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const notices = [
  "매일 밤 11:11분\n새로운 친구들을 만나봐!",
  "좋아요는 오늘 한번만!\n하트로 상대팀에게 우리를 알려봐!",
];
const swiperHeightPercentage = 0.7;
const AboveContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={90} height={20} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={24}
            color={subColorPink}
          />
          <Text
            style={{ fontSize: 15, color: subColorPink, fontWeight: "bold" }}
          >
            25
          </Text>
          {/* 임시 시그널수 */}
        </View>
      </View>
      <View style={styles.banner}>
        <View
          style={{
            paddingLeft: 20,
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: -0.47,
              lineHeight: 23.4,
            }}
          >
            {notices[0]}
          </Text>
        </View>
      </View>
      <View style={styles.guidance}>
        <Text style={[styles.guidanceText, { marginBottom: 4 }]}>
          오늘의 친구들을
        </Text>
        <Text style={styles.guidanceText}>만나봐!</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1 - swiperHeightPercentage,
    paddingTop:
      Platform.OS == "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight,
    paddingHorizontal: "6%",
    backgroundColor: mainColor,
    // backgroundColor: "white",
  },
  logoContainer: {
    flex: 0.2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  banner: {
    marginTop: 10,
    flex: 0.35,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  guidance: {
    flex: 0.45,
    width: "100%",
    justifyContent: "center",
  },
  guidanceText: {
    color: "white",
    fontSize: 24,
    fontWeight: 900,
  },
});

export default AboveContainer;
