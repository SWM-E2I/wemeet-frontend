import { View, Text } from "react-native";
import React from "react";
//https://www.npmjs.com/package/react-native-autocomplete-dropdown?activeTab=readme#options
const univNameList = [
  "고려대학교(서울)",
  "고려대학교(세종)",
  "연세대학교(서울)",
  "연세대학교(원주)",
];
const univCodeList = ["C001", "C002", "C003", "C004"];
const depNameList = [
  "인문대",
  "사회과학대",
  "자연과학대",
  "공대",
  "경영대",
  "신학대",
  "의과대",
  "치과대",
];
const depCodeList = [
  "C001",
  "C002",
  "C003",
  "C004",
  "C005",
  "C006",
  "C007",
  "C008",
];
let univTotalList = [];
for (var i = 0; i < univCodeList.length; i++) {
  univTotalList.push({ id: univCodeList[i], title: univNameList[i] });
}

const DropdownPicker = () => {
  return (
    <View>
      <Text>DropdownPicker</Text>
    </View>
  );
};

export default DropdownPicker;
