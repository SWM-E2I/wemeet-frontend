import { StyleSheet, Platform, StatusBar } from "react-native";

const commonStyles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default commonStyles;
