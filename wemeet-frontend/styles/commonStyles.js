import { StyleSheet, Platform, StatusBar } from "react-native";

export const mainColor = "#191A21";
export const subColorBlack = "#2A2B34"; //lighter than mainColor
export const subColorBlack2 = "#141519"; //darker than mainColor
export const subColorPink = "#FC8368";
export const subColorBlue = "#5B66F6";

const commonStyles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: subColorBlack,
  },
  teamGenerateInstruction: {
    fontSize: 24,
    fontFamily: "pretendard600",
    paddingVertical: 10,
    color: "white",
  },
  teamGenerateInstruction2: {
    fontSize: 16,
    fontFamily: "pretendard400",
    letterSpacing: -0.5,
    lineHeight: 24,
    color: "white",
  },
  buttonContainer: {
    alignSelf: "center",
    marginVertical: 20,
    width: "88%",
    paddingVertical: 12,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default commonStyles;
