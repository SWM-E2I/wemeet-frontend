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
import { useDispatch } from "react-redux";
import { setIntroduction } from "../../redux/teamGenerateSlice";
const IntroScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [intro, setIntro] = useState("");
  const onNext = () => {
    if (intro.length < 5) Alert.alert("소개글은 5자 이상 입력해줘!");
    else {
      dispatch(setIntroduction(intro));
      navigation.navigate("ChatLink");
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
            placeholder={"최소 5자, 최대 150자 이내로 입력해줘!"}
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
        <TouchableOpacity style={commonStyles.buttonContainer} onPress={onNext}>
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
    height: 200,
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
