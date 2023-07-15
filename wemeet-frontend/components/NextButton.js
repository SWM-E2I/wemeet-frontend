import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NextButton = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C005C",
    borderRadius: 15,
  },
  text: {
    fontSize: 17,
    color: "#FFFFFF",
  },
});

export default NextButton;
