import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { mainColor, subColorBlack } from "../../styles/commonStyles";

const RegisterHeader = ({ navigation, back, onBack }) => {
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={onBack ? onBack : navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 20,
    // backgroundColor: mainColor,
    backgroundColor: subColorBlack,
  },
});

export default RegisterHeader;
