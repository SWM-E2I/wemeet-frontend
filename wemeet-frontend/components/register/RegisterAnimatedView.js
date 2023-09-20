import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Animated, {
  FadeInUp,
  FadeOutUp,
  FadeIn,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import registerStyles from "../../styles/registerStyles";

const RegisterAnimatedView = ({
  label,
  text,
  fade,
  style,
  open,
  duration,
  onPress,
  textStyle,
  down,
}) => {
  //label도 위에 띄워주기, disabled된 view들.
  return (
    <Animated.View
      entering={
        fade
          ? null
          : duration
          ? FadeInUp.duration(duration)
          : FadeInUp.duration(600)
      }
      exiting={
        down
          ? FadeOutDown.duration(400)
          : open && duration
          ? FadeOutUp.duration(duration)
          : null
      }
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
          style,
        ]}
      >
        <Animated.View
          entering={fade ? FadeIn.duration(1200) : null} //FadeIn.duration(1500)
        >
          {onPress ? (
            <TouchableOpacity
              style={[registerStyles.inputTextView, { borderWidth: 0 }]}
              onPress={onPress}
            >
              <Text
                style={[
                  registerStyles.inputText,
                  { color: "gray", textAlign: "center" },
                  textStyle,
                ]}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={[registerStyles.inputTextView, { borderWidth: 0 }]}>
              <Text
                style={[
                  registerStyles.inputText,
                  {
                    color: "gray",
                    alignSelf: "flex-start",
                    marginLeft: "7.5%",
                  },
                  textStyle,
                ]}
              >
                {text}
              </Text>
            </View>
          )}
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
