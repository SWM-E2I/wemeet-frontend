import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { subColorPink, mainColor } from "../../styles/commonStyles";
import { collegeObj, drinkRateDict } from "../../assets/datasets";
// const memberInfo = [
//   {
//     mbti: "ENFJ",
//     univ: "고려대",
//     college: "인문사회대",
//     admissionYear: "19",
//   },
//   {
//     mbti: "ENFJ",
//     univ: "경동대 (메트로폴캠)",
//     college: "인문사회대",
//     admissionYear: "19",
//   },
//   {
//     mbti: "ENFJ",
//     univ: "고려대",
//     college: "인문사회대",
//     admissionYear: "19",
//   },
// ];
const drinkType = [
  "술 없이도 즐거워",
  "술은 기분 좋을 정도로만",
  "술자리를 즐겨",
  "술에 진심이야",
];
const InfoSection = ({ memberInfo, drinkingRate, drinkWithGame, intro }) => {
  return (
    <>
      <Text style={[styles.labelText, { marginBottom: 0 }]}>팀원 정보</Text>
      {memberInfo.map((member, index) => (
        <View key={index} style={styles.memberInfoContainer}>
          <MaterialIcons
            name="person"
            size={18}
            color={index == 0 ? subColorPink : "white"}
          />
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={styles.descriptionText}>{member.mbti}</Text>
          </View>
          <Text style={styles.descriptionText}>{member.college}</Text>
          <Text style={{ color: "#8F8F8F", fontSize: 14 }}>{`  ${
            collegeObj[member.collegeType]
          }  ${member.admissionYear}학번`}</Text>
        </View>
      ))}
      <Text style={styles.labelText}>음주 수치</Text>
      <View style={styles.drinkingBarContainer}>
        <View style={[styles.drinkingBar, { backgroundColor: "#FC8368" }]} />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 1 ? "#FF7354" : "white" },
          ]}
        />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 2 ? "#FA5B37" : "white" },
          ]}
        />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 3 ? "#FF4116" : "white" },
          ]}
        />
      </View>
      <Text style={styles.descriptionText}>{drinkType[drinkingRate]}</Text>
      <Text style={styles.labelText}>술게임 여부</Text>
      <Text style={styles.descriptionText}>{drinkWithGame}</Text>
      <Text style={styles.labelText}>팀 소개</Text>
      <Text
        style={[styles.descriptionText, { lineHeight: 24, marginBottom: 25 }]}
      >
        {intro}
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  labelText: {
    fontFamily: "pretendard600",
    marginTop: 20,
    color: "#8F8F8F",
    fontSize: 16,
    marginBottom: 14,
  },
  memberInfoContainer: {
    width: "100%",
    paddingTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionText: {
    fontFamily: "pretendard400",
    color: "white",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  drinkingBarContainer: {
    paddingBottom: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  drinkingBar: {
    height: 8,
    width: "23%",
    borderRadius: 10,
  },
});
export default InfoSection;
