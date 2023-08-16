import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { subColorPink, mainColor } from "../../styles/commonStyles";

const memberInfo = [
  {
    mbti: "ENFJ",
    univ: "고려대",
    college: "인문사회대",
    admissionYear: "19",
  },
  {
    mbti: "ENFJ",
    univ: "경동대 (메트로폴캠)",
    college: "인문사회대",
    admissionYear: "19",
  },
  {
    mbti: "ENFJ",
    univ: "고려대",
    college: "인문사회대",
    admissionYear: "19",
  },
];
const drinkType = [
  "술 없이도 즐거워",
  "술은 기분 좋을 정도로만",
  "술자리를 즐겨",
  "술에 진심이야",
];
const InfoSection = () => {
  let drinkingRate = 3; //임시, 0 1 2 3
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
          <Text style={styles.descriptionText}>{member.univ}</Text>
          <Text
            style={{ color: "#8F8F8F", fontSize: 14 }}
          >{`  ${member.college}  ${member.admissionYear}학번`}</Text>
        </View>
      ))}
      <Text style={styles.labelText}>음주 수치</Text>
      <View style={styles.drinkingBarContainer}>
        <View style={[styles.drinkingBar, { backgroundColor: subColorPink }]} />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 1 ? subColorPink : "white" },
          ]}
        />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 2 ? subColorPink : "white" },
          ]}
        />
        <View
          style={[
            styles.drinkingBar,
            { backgroundColor: drinkingRate >= 3 ? subColorPink : "white" },
          ]}
        />
      </View>
      <Text style={styles.descriptionText}>{drinkType[drinkingRate]}</Text>
      <Text style={styles.labelText}>술게임 여부</Text>
      <Text style={styles.descriptionText}>상관없어</Text>
      <Text style={styles.labelText}>팀 소개</Text>
      <Text
        style={[styles.descriptionText, { lineHeight: 24, marginBottom: 25 }]}
      >
        나는야 강북 멋쟁이 나는야 강북 멋쟁이 나는야 강북 멋쟁이 나는야 강북
        멋쟁이 나는야 강북 멋쟁이 나는야 강북 멋쟁이 나는야 강북 멋쟁이 나는야
        강북 멋쟁이 나는야 강북 멋쟁이 나는야 강북 멋쟁이
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  labelText: {
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
