import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { subColorPink } from "../../styles/commonStyles";

const LeaderCard = ({ style }) => {
  return (
    <View style={[styles.infoBox, style]} opacity={1}>
      <LinearGradient
        colors={["rgba(27, 27, 27, 1)", "rgba(13, 14, 17, 1)"]}
        style={styles.gradientBox}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JSRii_41Xvrc6OL8oQiC0bStzp1HwbNHfA&usqp=CAU",
          }}
          style={styles.profileImage}
          resizeMode={"cover"}
        />

        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            height: "100%",
            justifyContent: "space-between",
            // backgroundColor: "yellow",
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
                fontFamily: "pretendard600",
              }}
            >
              째리미추워 / ENFJ
            </Text>
            <View style={styles.verifiedLabel}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "pretendard600",
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
              fontFamily: "pretendard600",
              marginBottom: 5,
            }}
          >
            고려대학교 (서울)
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    width: "100%",
    height: 86,
    borderRadius: 10,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    marginTop: 10,
    overflow: "hidden",
  },
  gradientBox: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
    flexDirection: "row",
  },
  profileImage: {
    aspectRatio: 1,
    height: "100%",
    borderRadius: 50,
  },
  verifiedLabel: {
    width: 85,
    height: 22,
    borderRadius: 3,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LeaderCard;
