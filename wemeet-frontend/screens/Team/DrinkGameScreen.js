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
import { useDispatch } from "react-redux";
import { setDrinkWithGame } from "../../redux/teamGenerateSlice";

const codeList = ["ANY", "MASTER", "BEGINNER", "HATER"];
const showList = [
  "상관없어",
  "나는야 술게임 고수",
  "술게임 잘 몰라",
  "술게임 싫어해",
];
const DrinkGameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [drinkWithGameIdx, setDrinkWithGameIdx] = useState(0); //
  const onNext = () => {
    dispatch(setDrinkWithGame(codeList[drinkWithGameIdx]));
    navigation.navigate("Intro");
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
          술게임은 좋아하는 편이야?
        </Text>
        {showList.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.selectContainer,
                {
                  backgroundColor:
                    drinkWithGameIdx == index ? "black" : subColorBlack,
                },
              ]}
              key={index}
              onPress={() => {
                setDrinkWithGameIdx(index);
              }}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: drinkWithGameIdx == index ? subColorPink : "#9C9C9C",
                    fontFamily:
                      drinkWithGameIdx == index
                        ? "pretendard600"
                        : "pretendard400",
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

export default DrinkGameScreen;
