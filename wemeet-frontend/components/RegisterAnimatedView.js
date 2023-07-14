import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import registerStyles from "../styles/registerStyles";

const RegisterAnimatedView = ({ label, text }) => {
  //label도 위에 띄워주기, disabled된 view들.
  return (
    <Animated.View
      entering={FadeInUp.duration(700)}
      style={styles.animatedContainer}
    >
      <View
        style={[
          registerStyles.inputTextView,
          { borderWidth: 0, backgroundColor: "#F8F8F8" },
        ]}
      >
        <TextInput
          value={text}
          style={[registerStyles.inputTextBox, registerStyles.inputText]}
          editable={false}
        ></TextInput>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
export default RegisterAnimatedView;
