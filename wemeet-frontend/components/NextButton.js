import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NextButton = ({ onPress, text, style, disabled }) => {
  return (
    <>
      {disabled ? (
        <TouchableOpacity
          style={[styles.buttonDisabled, style]}
          activeOpacity={0.5}
        >
          <Text style={styles.textDisabled}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.buttonEnabled, style]}
          onPress={onPress}
          activeOpacity={0.2}
        >
          <Text style={styles.textEnabled}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonEnabled: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 15,
  },
  buttonDisabled: {
    width: "80%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
  },
  textDisabled: {
    fontSize: 20,
    color: "gray",
  },
  textEnabled: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default NextButton;
