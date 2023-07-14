import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import registerStyles from "../styles/registerStyles";

const RegisterAnimatedView = ({ label, text, disabled }) => {
  //label도 위에 띄워주기, disabled 여부 전달
  return (
    <Animated.View style={styles.animatedContainer}>
      <View style={registerStyles.inputTextView}>
        <TextInput
          value={text}
          style={[registerStyles.inputTextBox, registerStyles.inputText]}
        ></TextInput>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
export default RegisterAnimatedView;
