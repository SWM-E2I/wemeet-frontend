import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
  instContainer: {
    height: 85,
    paddingLeft: 20,
  },
  instText: {
    fontSize: 25,
    color: "black",
  },
  inputTextView: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "85%",
    borderWidth: 2,
    borderRadius: 15,
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
    marginTop: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default registerStyles;
