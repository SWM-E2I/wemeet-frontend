import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { subColorPink } from "../../styles/commonStyles";

const LeaderCard = () => {
  return (
    <View style={[styles.infoBox, { overflow: "hidden" }]} opacity={1}>
      <LinearGradient
        colors={["rgba(27, 27, 27, 1)", "rgba(13, 14, 17, 1)"]}
        style={styles.gradientBox}
      >
        <Image
          source={{
            uri: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/28/newsen/20230428124427010wmwd.jpg",
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
              째리미추워 / ENFJ
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
    height: 100,
    borderRadius: 10,
    borderColor: "#1F1F1F",
    borderWidth: 1,
    marginTop: 10,
  },
  gradientBox: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingHorizontal: "4%",
    paddingVertical: "5%",
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
