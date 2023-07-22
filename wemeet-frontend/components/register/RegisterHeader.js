import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const RegisterHeader = ({ navigation, back }) => {
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
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
    backgroundColor: "white",
  },
});

export default RegisterHeader;
