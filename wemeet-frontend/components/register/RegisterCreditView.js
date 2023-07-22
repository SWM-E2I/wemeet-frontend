import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const RegisterCreditView = ({ currentCredit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons name="ios-heart" size={20} color="black" />
        <Text style={styles.number}>{`+${currentCredit}`}</Text>
        <Text style={[styles.number, { color: "gray" }]}>/25</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    // alignItems: "flex-end",
    justifyContent: "flex-end",
    // backgroundColor: "black",
  },
  box: {
    width: 90,
    height: 40,
    backgroundColor: "#E2E2E2",
    borderRadius: 40,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    marginLeft: 3,
    fontSize: 15,
    // letterSpacing: 1,
  },
});

export default RegisterCreditView;

//현재까지 쌓이고 있는 시그널 개수 표시
