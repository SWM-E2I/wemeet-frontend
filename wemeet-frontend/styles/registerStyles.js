import { StyleSheet, Dimensions } from "react-native";

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
    color: "black",
  },
  inputTextView: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: width * 0.85,
    borderWidth: 2,
    borderRadius: 10,
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
    fontSize: 22,
  },
  warningText: {
    fontSize: 12,
    color: "red",
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: "10%",
  },
});

export default registerStyles;
