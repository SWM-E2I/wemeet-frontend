import { StyleSheet, Dimensions } from "react-native";
import { subColorPink } from "./commonStyles";

const width = Dimensions.get("window").width;
const registerStyles = StyleSheet.create({
  instContainer: {
    height: 85,
    // paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  instText: {
    marginLeft: "8%",
    fontSize: 30,
    color: "white",
    fontFamily: "pretendard500",
  },
  inputTextView: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: width * 0.85,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#C9C9C9",
    // borderColor: "white",
    marginBottom: 5,
  },
  inputTextBox: {
    height: 55,
    width: "85%",
    // width: "70%",
    borderWidth: 0,
  },
  codeInputTextBox: {
    height: 55,
    width: "70%",
  },
  inputTimerView: {
    height: 55,
    width: "20%",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontFamily: "pretendard400",
    color: "white",
    fontSize: 22,
  },
  warningText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
    fontFamily: "pretendard400",
  },
  labelText: {
    fontSize: 14,
    color: "white",
    fontFamily: "pretendard500",
    marginBottom: 10,
    marginLeft: "10%",
  },
  agreement: {
    fontSize: 14,
    // color: subColorPink,
    color: "#9C9C9C",
    fontFamily: "pretendard500",
  },
});

export default registerStyles;
