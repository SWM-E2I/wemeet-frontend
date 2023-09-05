import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
const MembersScreen = ({ navigation }) => {
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
          아래 버튼을 눌러 함께 나갈 친구 정보를 입력해줘
        </Text>
        <TouchableOpacity
          style={[styles.selectContainer]}
          // key={index}
          onPress={() => {
            // setRegionIdx(index);
          }}
        >
          <Text style={[styles.selectText]}>+ 친구 추가하기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={commonStyles.buttonContainer}
        //   onPress={onNext}
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
    fontFamily: "pretendard400",
    letterSpacing: -0.5,
    // color: "#9C9C9C",
    color: subColorPink,
  },
});

export default MembersScreen;
