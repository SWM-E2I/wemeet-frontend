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
import commonStyles, {
  mainColor,
  subColorPink,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIntroduction, resetState } from "../../redux/teamGenerateSlice";
import { setHasTeam } from "../../redux/persistSlice";
import { teamGenerateApi, teamEditApi } from "../../api/team";
import { CommonActions } from "@react-navigation/native";

const IntroScreen = ({ navigation, route }) => {
  const edit = route.params?.edit;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const introduction = useSelector(
    (state) => state.teamGenerate.data.introduction
  );
  const [intro, setIntro] = useState(introduction);
  const images = useSelector((state) => state.teamGenerate.images);
  const data = useSelector((state) => state.teamGenerate.data);
  const controller = new AbortController();

  const onPress = async () => {
    if (intro.length < 10) Alert.alert("소개글은 10자 이상 입력해줘!");
    else {
      setLoading(true);
      dispatch(setIntroduction(intro));
      let res = false;
      if (edit) {
        res = await teamEditApi(
          images,
          { ...data, introduction: intro },
          navigation,
          controller
        );
        console.log("IntroScreen, teamEditApi result :", res);
      } else {
        res = await teamGenerateApi(
          images,
          { ...data, introduction: intro },
          navigation,
          controller
        );
        console.log("IntroScreen, teamGenerateApi result :", res);
      }
      if (res) {
        dispatch(setHasTeam(true));
        dispatch(resetState(true));
        if (edit) {
          Alert.alert("수정 완료", "팀 정보를 성공적으로 수정했어", [
            {
              text: "확인",
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "InitialTeam" }],
                  })
                );
              },
            },
          ]);
        } else {
          Alert.alert("팀 생성 성공!", "이제 매칭을 신청하고 수락할 수 있어", [
            {
              text: "확인",
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "InitialTeam" }],
                  })
                );
              },
            },
          ]);
        }
      }
      setLoading(false);
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
        disabled={loading}
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
            editable={!loading}
          />
          <Text
            style={{
              color: "#C4C4C4",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          >{`${intro.length} / 150`}</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <TouchableOpacity
          style={[
            commonStyles.buttonContainer,
            { backgroundColor: loading ? "#9C9C9C" : subColorPink },
          ]}
          onPress={onPress}
          disabled={loading}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "pretendard600",
            }}
          >
            {edit
              ? loading
                ? "수정 중.. (최대 1분 소요)"
                : "수정 완료"
              : loading
              ? "생성 중.. (최대 1분 소요)"
              : "팀 만들기"}
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
