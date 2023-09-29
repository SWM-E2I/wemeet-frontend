import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorBlack,
  subColorPink,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setDrinkRate } from "../../redux/teamGenerateSlice";
const codeList = ["HIGH", "MIDDLE", "LOW", "ZERO"];
const showList = [
  "술에 진심이야",
  "술 좋아해",
  "술은 기분 좋을 정도로만",
  "술 없어도 즐거워",
];
const DrinkRateScreen = ({ navigation, route }) => {
  const edit = route.params?.edit;
  console.log(edit);
  const dispatch = useDispatch();
  const drinkRate = useSelector((state) => state.teamGenerate.data.drinkRate);
  const [drinkRateIdx, setDrinkRateIdx] = useState(codeList.indexOf(drinkRate)); //
  const onNext = () => {
    dispatch(setDrinkRate(codeList[drinkRateIdx]));
    navigation.navigate("DrinkGame", { edit: edit });
  };
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <TouchableOpacity
        style={{ paddingTop: 10, paddingBottom: 15, paddingHorizontal: "5%" }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: "6%" }}>
        <Text
          style={[commonStyles.teamGenerateInstruction, { marginBottom: 10 }]}
        >
          선호하는 음주 정도는?
        </Text>
        {showList.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.selectContainer,
                {
                  backgroundColor:
                    drinkRateIdx == index ? "black" : subColorBlack,
                },
              ]}
              key={index}
              onPress={() => {
                setDrinkRateIdx(index);
              }}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: drinkRateIdx == index ? subColorPink : "#9C9C9C",
                    fontFamily:
                      drinkRateIdx == index ? "pretendard600" : "pretendard400",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={commonStyles.buttonContainer} onPress={onNext}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "pretendard600",
          }}
        >
          다음
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: subColorBlack,
    width: "95%",
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  selectText: {
    fontSize: 18,
    fontFamily: "pretendard400",
    letterSpacing: -0.5,
    color: "#9C9C9C",
  },
});
export default DrinkRateScreen;
