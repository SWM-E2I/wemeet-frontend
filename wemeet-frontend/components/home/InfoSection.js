import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { subColorPink, mainColor } from "../../styles/commonStyles";
import { collegeObj, drinkRateDict } from "../../assets/datasets";

const drinkType = [
  "술 없이도 즐거워",
  "술은 기분 좋을 정도로만",
  "술자리를 즐겨",
  "술에 진심이야",
];
const InfoSection = ({
  memberInfo,
  drinkingRate,
  drinkWithGame,
  intro,
  myTeam,
  chatLink,
  message,
  leader,
}) => {
  console.log(message);
  return (
    <>
      <Text style={[styles.labelText, { marginBottom: 0 }]}>팀원 정보</Text>
      <View style={styles.memberInfoContainer}>
        <MaterialIcons name="person" size={18} color={subColorPink} />
        {leader.mbti != "XXXX" && (
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={styles.descriptionText}>{`${leader.mbti}`}</Text>
          </View>
        )}
        <Text
          style={[
            styles.descriptionText,
            { paddingLeft: leader.mbti == "XXXX" ? 8 : 0 },
          ]}
        >
          {leader.collegeName ? leader.collegeName : leader.college}
        </Text>
        {myTeam ? (
          <Text style={{ color: "#8F8F8F", fontSize: 14 }}>
            {` ${leader.admissionYear}학번`}
          </Text>
        ) : (
          <Text style={{ color: "#8F8F8F", fontSize: 14 }}>{`  ${
            collegeObj[leader.collegeType]
          }  ${leader.admissionYear}학번`}</Text>
        )}
      </View>
      {memberInfo.map((member, index) => (
        <View key={index} style={styles.memberInfoContainer}>
          <MaterialIcons name="person" size={18} color={"white"} />
          {member.mbti != "XXXX" && (
            <View style={{ paddingHorizontal: 8 }}>
              <Text style={styles.descriptionText}>{`${member.mbti}`}</Text>
            </View>
          )}
          <Text
            style={[
              styles.descriptionText,
              { paddingLeft: member.mbti == "XXXX" ? 8 : 0 },
            ]}
          >
            {member.college}
          </Text>
          <Text style={{ color: "#8F8F8F", fontSize: 14 }}>{`  ${
            myTeam ? member.collegeType : collegeObj[member.collegeType]
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
        style={[
          styles.descriptionText,
          { lineHeight: 24, marginBottom: myTeam || message ? 0 : 25 },
        ]}
      >
        {intro}
      </Text>
      {message && (
        <>
          <Text style={styles.labelText}>내게 보낸 쪽지</Text>
          <Text
            style={[
              styles.descriptionText,
              { lineHeight: 24, marginBottom: 25 },
            ]}
          >
            {message}
          </Text>
        </>
      )}
      {myTeam && (
        <>
          <Text style={styles.labelText}>카카오톡 아이디</Text>
          <Text style={[styles.descriptionText, { marginBottom: 25 }]}>
            {chatLink}
          </Text>
        </>
      )}
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
