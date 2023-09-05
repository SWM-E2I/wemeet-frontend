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
import { useDispatch } from "react-redux";
import { setChatLink } from "../../redux/teamGenerateSlice";
import { AntDesign } from "@expo/vector-icons";
const ChatLinkScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");
  const onNext = () => {
    if (!link || link.length == 0)
      Alert.alert(
        "입력 오류",
        "오픈 채팅 링크를 올바르게\n복사+붙여넣기 했는지 확인해줘!"
      );
    else {
      dispatch(setChatLink(link));
      navigation.navigate("TeamPhoto");
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
          오픈채팅 링크를 입력해줘
        </Text>
        <Text style={commonStyles.teamGenerateInstruction2}>
          {
            "매칭 수락후 연락할 수 있는\n카카오톡 오픈 채팅방 링크를 알려줄래?\n위밋에서 쓰는 닉네임으로 일대일 채팅을 만들어줘!"
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
            카카오톡 오픈 채팅방 링크를 복사+붙여넣기 해줘
          </Text>
        </View>
        <TextInput
          value={link}
          onChangeText={(text) => {
            // 정규식을 사용하여 http로 시작하는 링크 추출
            const regex = /https?:\/\/\S+/g;
            const link = text.match(regex);
            if (link) {
              console.log(link[0]);
              setLink(link[0]);
            } else setLink("");
          }}
          style={styles.textInput}
          autoFocus
          placeholder={"여기에 채팅방 링크를 붙여넣기 해줘!"}
          // enablesReturnKeyAutomatically
          placeholderTextColor={"#C4C4C4"}
        />
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
