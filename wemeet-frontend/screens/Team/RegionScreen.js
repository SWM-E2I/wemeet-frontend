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
import { setRegion } from "../../redux/teamGenerateSlice";
const codeList = ["HONGDAE", "GANGNAM", "SINCHON", "GUNDAE"];
const showList = ["홍대 입구", "강남", "신촌", "건대 입구"];
const RegionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [regionIdx, setRegionIdx] = useState(0); // [latitude, longitude
  const onNext = () => {
    dispatch(setRegion(codeList[regionIdx]));
    navigation.navigate("Members");
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
        <Text style={commonStyles.teamGenerateInstruction}>
          어디서 만나는게 좋아?
        </Text>
        <Text style={commonStyles.teamGenerateInstruction2}>
          {"가장 만나고 싶은 장소 하나를 골라줘"}
        </Text>
        {showList.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.selectContainer,
                {
                  backgroundColor: regionIdx == index ? "black" : subColorBlack,
                },
              ]}
              key={index}
              onPress={() => {
                setRegionIdx(index);
              }}
            >
              <Text
                style={[
                  styles.selectText,
                  {
                    color: regionIdx == index ? subColorPink : "#9C9C9C",
                    fontFamily:
                      regionIdx == index ? "pretendard600" : "pretendard400",
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

export default RegionScreen;
