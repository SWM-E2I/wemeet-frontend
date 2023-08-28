import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SkipButton = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonEnabled, style]}
      onPress={onPress}
      activeOpacity={0.2}
    >
      <Text style={styles.textEnabled}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    width: "85%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    marginTop: 15,
  },
  textEnabled: {
    fontSize: 15,
    fontFamily: "pretendard500",
    color: "black",
  },
});

export default SkipButton;
