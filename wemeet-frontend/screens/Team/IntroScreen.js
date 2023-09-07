import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles, { mainColor } from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIntroduction, resetState } from "../../redux/teamGenerateSlice";
import { teamGenerateApi } from "../../api/team";
import { CommonActions } from "@react-navigation/native";

const IntroScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [intro, setIntro] = useState("");
  const images = useSelector((state) => state.teamGenerate.images);
  const data = useSelector((state) => state.teamGenerate.data);
  const controller = new AbortController();

  const onPress = async () => {
    if (intro.length < 10) Alert.alert("소개글은 10자 이상 입력해줘!");
    else {
      dispatch(setIntroduction(intro));
      const res = await teamGenerateApi(
        images,
        { ...data, introduction: intro },
        navigation,
        controller
      );
      console.log("IntroScreen, teamGenerateApi result :", res);
      if (res) {
        // dispatch(resetState(true));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "InitialTeam" }],
          })
        );
      }
    }
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
          너희 팀을 소개해줘
        </Text>
        <Text style={commonStyles.teamGenerateInstruction2}>
          상대방이 너희 팀에 대해 알 수 있도록 작성해줘!
        </Text>
        <View>
          <TextInput
            value={intro}
            onChangeText={(text) => {
              setIntro(text);
            }}
            style={styles.textInput}
            autoFocus
            placeholder={"최소 10자, 최대 150자 이내로 입력해줘!"}
            // enablesReturnKeyAutomatically
            maxLength={150}
            placeholderTextColor={"#C4C4C4"}
            multiline
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <TouchableOpacity
          style={commonStyles.buttonContainer}
          onPress={onPress}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "pretendard600",
            }}
          >
            팀 만들기
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 150,
    borderRadius: 7,
    // backgroundColor: "#F2F2F2",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderColor: "white",
    borderWidth: 0.5,
    fontSize: 16,
    fontFamily: "pretendard400",
    color: "white",
    textAlignVertical: "top", //for Android
  },
});
export default IntroScreen;
