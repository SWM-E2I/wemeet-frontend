import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Animated, { FadeInUp, FadeIn, FadeOut } from "react-native-reanimated";
import registerStyles from "../styles/registerStyles";

const RegisterAnimatedView = ({ label, text, fade }) => {
  //label도 위에 띄워주기, disabled된 view들.
  return (
    <Animated.View
      entering={fade ? null : FadeInUp.duration(1600)}
      style={styles.animatedContainer}
    >
      {label && (
        <View style={{ width: "100%" }}>
          <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
            {label}
          </Text>
        </View>
      )}
      <View
        style={[
          registerStyles.inputTextView,
          { borderWidth: 0, backgroundColor: "#F8F8F8" },
        ]}
      >
        <Animated.View
          entering={fade ? FadeIn.duration(2500) : null}
          exiting={FadeOut.duration(600)}
        >
          <TextInput
            value={text}
            style={[
              registerStyles.inputTextBox,
              registerStyles.inputText,
              { color: "gray" },
            ]}
            editable={false}
          ></TextInput>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
});
export default RegisterAnimatedView;
