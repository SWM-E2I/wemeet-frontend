import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../styles/commonStyles";

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
    width: "85%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    // backgroundColor: mainColor,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    width: "85%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    // backgroundColor: subColorBlack2,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  textDisabled: {
    fontSize: 20,
    // color: "#F2F2F2",
    fontFamily: "pretendard500",
    color: "gray",
  },
  textEnabled: {
    fontSize: 20,
    fontFamily: "pretendard500",
    color: "#FFFFFF",
  },
});

export default NextButton;
