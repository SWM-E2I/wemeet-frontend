import {
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  subColorBlack2,
  subColorPink,
} from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import SkipButton from "../../../components/SkipButton";
import RegisterSelectView from "../../../components/register/RegisterSelectView";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import MbtiComponent from "../../../components/register/MbtiComponent";
import { useDispatch } from "react-redux";
import { setRegisterMbti } from "../../../redux/registerSlice";

const instruction = "MBTI는 필수지";

const MbtiScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [mbti, setMbti] = useState("XXXX"); //redux state에 mbti 저장하기
  const toNext = () => {
    dispatch(setRegisterMbti(mbti));
    navigation.navigate("Univ");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      {/* <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
        MBTI를 선택해줘
      </Text> */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Animated.View
          entering={FadeInUp.duration(220)}
          exiting={FadeOutUp.duration(220)}
          style={styles.rowContainer}
        >
          <MbtiComponent
            mbti={mbti}
            setMbti={setMbti}
            letters={["E", "S", "T", "P"]}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(260)}
          exiting={FadeOutUp.duration(260)}
          style={[styles.rowContainer, { marginTop: 10 }]}
        >
          <MbtiComponent
            mbti={mbti}
            setMbti={setMbti}
            letters={["I", "N", "F", "J"]}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutUp.duration(300)}
          style={{
            height: 35,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "85%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F2F2F2",
              borderRadius: 8,
              marginTop: 15,
              backgroundColor: mbti == "XXXX" ? "black" : subColorBlack2,
            }}
            onPress={() => {
              setMbti("XXXX");
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "pretendard500",
                color: mbti == "XXXX" ? subColorPink : "white",
              }}
            >
              아직 잘 몰라
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    height: 70,
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mbtiComponent: {
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default MbtiScreen;
