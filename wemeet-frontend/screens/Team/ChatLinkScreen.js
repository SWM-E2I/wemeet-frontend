import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
} from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setChatLink } from "../../redux/teamGenerateSlice";
import { AntDesign } from "@expo/vector-icons";
const ChatLinkScreen = ({ navigation, route }) => {
  const edit = route.params?.edit;
  console.log(edit);
  const dispatch = useDispatch();
  const chatLink = useSelector((state) => state.teamGenerate.data.chatLink);
  const [link, setLink] = useState(chatLink);
  const onNext = () => {
    if (!link || link.length == 0)
      Alert.alert("입력 오류", "올바른 형식의 닉네임을 입력해줘!");
    else {
      dispatch(setChatLink(link));
      navigation.navigate("TeamPhoto", { edit: edit });
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
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              commonStyles.teamGenerateInstruction,
              { color: subColorPink },
            ]}
          >
            {"카카오톡 아이디"}
          </Text>
          <Text style={commonStyles.teamGenerateInstruction}>
            {"를 입력해줘"}
          </Text>
        </View>
        <Text style={commonStyles.teamGenerateInstruction2}>
          {
            "매칭 수락후 연락할 수 있는\n네 카카오톡 아이디를 알려줄래?\n카톡 아이디는 매칭 성사시 상대방에게 전달돼!"
          }
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <AntDesign name="warning" size={18} color={subColorPink} />
          <Text
            style={[
              commonStyles.teamGenerateInstruction2,
              {
                color: subColorPink,
                fontSize: 13,
                marginLeft: 4,
              },
            ]}
          >
            {"팀 삭제 외 수정은 불가능하니 정확하게 입력해줘!"}
          </Text>
        </View>

        <TextInput
          value={link}
          onChangeText={(text) => {
            setLink(text);
          }}
          style={styles.textInput}
          autoFocus
          placeholder={"여기에 카카오톡 아이디를 입력해줘!"}
          // enablesReturnKeyAutomatically
          placeholderTextColor={"#C4C4C4"}
        />
        <Text
          style={[
            commonStyles.teamGenerateInstruction2,
            { marginTop: 10, color: subColorPink, fontSize: 12, marginLeft: 4 },
          ]}
        >
          {"📢  [ 카카오톡 실행>설정(톱니바퀴)>프로필 관리>카카오톡 ID ]"}
        </Text>
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
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderRadius: 7,
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
export default ChatLinkScreen;
