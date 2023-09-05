import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import commonStyles, { mainColor } from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
const ChatLinkScreen = ({ navigation }) => {
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
          어디서 만나는게 좋아?
        </Text>
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

export default ChatLinkScreen;
