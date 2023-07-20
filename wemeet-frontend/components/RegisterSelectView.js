import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import registerStyles from "../styles/registerStyles";

const RegisterSelectView = ({ label, text, disabled, onPress }) => {
  return (
    <View style={styles.container}>
      {label && (
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
            {label}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          registerStyles.inputTextView,
          { borderWidth: !disabled ? 2 : 0, backgroundColor: "#F8F8F8" },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            registerStyles.inputText,
            { color: !disabled ? "black" : "gray" },
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
});

export default RegisterSelectView;
