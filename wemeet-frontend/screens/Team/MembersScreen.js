import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { delMember } from "../../redux/teamGenerateSlice";
const MemberCard = ({
  mbti,
  univ,
  college,
  admissionYear,
  index,
  dispatch,
}) => {
  console.log(index);
  return (
    <View style={styles.memberCard}>
      <Ionicons name="person" size={20} color="white" />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={styles.infoText1}>{`${mbti}  ${univ}`}</Text>
        <Text
          style={styles.infoText2}
        >{`${college}  ${admissionYear}학번`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(delMember(index));
        }}
      >
        <Ionicons name="trash-outline" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const MembersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.teamGenerate.data.members);
  console.log(members);
  const onNext = () => {
    if (members.length > 0) {
      navigation.navigate("DrinkRate");
    } else {
      Alert.alert("최소 한명의 팀원을 추가해줘");
    }
  };
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <TouchableOpacity
        style={{ paddingTop: 10, paddingBottom: 15, paddingHorizontal: "5%" }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: "6%" }}>
        <Text style={commonStyles.teamGenerateInstruction}>
          친구들을 소개해줘
        </Text>
        <Text style={commonStyles.teamGenerateInstruction2}>
          함께 나갈 친구 정보를 입력해줘 (최대 3명)
        </Text>
        {members.map((member, index) => (
          <MemberCard
            mbti={member.mbti}
            univ={member.collegeInfo.collegeCode}
            college={member.collegeInfo.collegeType}
            admissionYear={member.collegeInfo.admissionYear}
            dispatch={dispatch}
            key={index}
            index={index}
          />
        ))}
        <TouchableOpacity
          style={[styles.selectContainer]}
          // key={index}
          onPress={() => {
            //최대 3명까지 추가 가능.
            navigation.navigate("MemberModal");
          }}
          disabled={members.length >= 3}
        >
          <Text
            style={[
              styles.selectText,
              members.length >= 3 ? { color: "#9C9C9C" } : null,
            ]}
          >
            + 친구 추가하기
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={commonStyles.buttonContainer}
        onPress={onNext} //최소 한명 추가 필요
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "pretendard600",
          }}
        >
          다음
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  selectContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: subColorBlack,
    width: "95%",
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  selectText: {
    fontSize: 18,
    fontFamily: "pretendard500",
    letterSpacing: -0.5,
    // color: "#9C9C9C",
    color: subColorPink,
  },
  memberCard: {
    borderRadius: 10,
    marginTop: 20,
    width: "95%",
    backgroundColor: subColorBlack,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoText1: {
    fontSize: 16,
    fontFamily: "pretendard500",
    color: "white",
    marginBottom: 3,
  },
  infoText2: {
    fontSize: 15,
    fontFamily: "pretendard400",
    color: "#9C9C9C",
  },
});

export default MembersScreen;
