import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorBlack,
  subColorPink,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setRegion } from "../../redux/teamGenerateSlice";
const codeList = ["HONGDAE", "GUNDAE", "GANGNAM", "SINCHON"];
const showList = ["홍대 입구", "건대 입구", "강남", "신촌"];
const RegionScreen = ({ navigation, route }) => {
  const edit = route.params?.edit;
  const region = useSelector((state) => state.teamGenerate.data.region);
  const dispatch = useDispatch();
  const [regionIdx, setRegionIdx] = useState(codeList.indexOf(region)); // [latitude, longitude
  //indexOf 사용!!
  const onNext = () => {
    if (regionIdx <= 3) dispatch(setRegion(codeList[regionIdx]));
    else console.log("setRegion필요, 그외");
    navigation.navigate("Members", { edit: edit });
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
      <ScrollView style={{ flex: 1, paddingHorizontal: "6%" }}>
        <Text style={commonStyles.teamGenerateInstruction}>
          어디서 만나는게 좋아?
        </Text>
        {/* <Text style={commonStyles.teamGenerateInstruction2}>  
          {"가장 만나고 싶은 장소 하나를 골라줘"}
        </Text> */}
        <Text
          style={[
            commonStyles.teamGenerateInstruction2,
            { fontSize: 13, color: subColorPink, lineHeight: 20 },
          ]}
        >
          {
            "🚨 더 많은 장소를 추가해 나갈 예정이야\n🚨 지금은 가장 끌리는 장소 하나만 골라줘"
          }
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
                if (index == 4) console.log("그 외 선택");
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
      </ScrollView>
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
