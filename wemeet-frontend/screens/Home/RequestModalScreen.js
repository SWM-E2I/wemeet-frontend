import {
  SafeAreaView,
  Pressable,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  Keyboard,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { mainColor, subColorPink } from "../../styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import Animated, {
//     useSharedValue,
//     useAnimatedStyle,
//   } from 'react-native-reanimated';

const Signal = ({ amount, useInput }) => {
  return (
    <View style={styles.signalContainer}>
      <MaterialCommunityIcons
        name="lightning-bolt"
        size={22}
        color={useInput ? subColorPink : "#575757"}
      />
      <Text
        style={[
          styles.buttonText,
          { color: useInput ? subColorPink : "#575757" },
        ]}
      >
        {amount}
      </Text>
      {/* 임시 시그널수 */}
    </View>
  );
};
const RequestModalScreen = ({ navigation }) => {
  const [useInput, setUseInput] = useState(true);
  const [letter, setLetter] = useState("");
  const heightValue = useRef(new Animated.Value(350)).current;
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          if (Keyboard.isVisible()) Keyboard.dismiss();
          else navigation.goBack();
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        {/* <KeyboardAwareScrollView> */}
        <Animated.View style={[styles.modalContainer, { height: heightValue }]}>
          <Pressable
            style={styles.pressableContainer}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <Text style={styles.titleText}>
                {"친구들에게 \n같이 놀자고 해볼까?"}
              </Text>
              <Signal amount={25} useInput />
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  if (!useInput) {
                    Animated.timing(heightValue, {
                      toValue: 350,
                      delay: 100,
                      duration: 500, // 애니메이션 지속 시간 (밀리초)
                      useNativeDriver: false, // 네이티브 드라이버 사용 여부 (true 또는 false)
                    }).start();
                    setUseInput(true);
                  }
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: useInput ? subColorPink : "#575757" },
                  ]}
                >
                  쪽지와 함께 신청
                </Text>
                <Signal amount={12} useInput={useInput} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  if (useInput) {
                    Animated.timing(heightValue, {
                      toValue: 250,
                      delay: 100,
                      duration: 500, // 애니메이션 지속 시간 (밀리초)
                      useNativeDriver: false, // 네이티브 드라이버 사용 여부 (true 또는 false)
                    }).start();
                    setUseInput(false);
                    setLetter("");
                  }
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: !useInput ? subColorPink : "#575757" },
                  ]}
                >
                  일반 신청
                </Text>
                <Signal amount={10} useInput={!useInput} />
              </TouchableOpacity>
            </View>
            {useInput && (
              <View style={styles.inputTextView}>
                <TextInput
                  value={letter}
                  onChangeText={(text) => {
                    setLetter(text);
                  }}
                  style={styles.inputTextBox}
                  autoFocus={false}
                  enablesReturnKeyAutomatically
                  placeholder={"두 문장 정도로 입력해줘! (50자 이내)"}
                  placeholderTextColor={"#717171"}
                  editable={useInput}
                  multiline
                ></TextInput>
              </View>
            )}
            <TouchableOpacity style={styles.confirmButton}>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  letterSpacing: -0.4,
                  fontWeight: 600,
                }}
              >
                신청하기
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Animated.View>
        {/* </KeyboardAwareScrollView> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalContainer: {
    // height: 390,
    width: "100%",
    backgroundColor: mainColor,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  pressableContainer: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  signalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: 600,
    color: "white",
    lineHeight: 33,
    letterSpacing: -0.5,
  },
  buttonText: { fontSize: 16, color: subColorPink, fontWeight: "bold" },
  selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
    marginRight: 14,
  },
  inputTextView: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 80,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#2B2B2B",
    marginVertical: 20,
  },
  inputTextBox: {
    height: "95%",
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 22,
    textAlignVertical: "top", //for Android
    // color: "#717171",
    color: "white",
  },
  confirmButton: {
    position: "absolute",
    bottom: 15,
    left: 20,
    width: "100%",
    paddingVertical: 15,
    backgroundColor: subColorPink,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RequestModalScreen;
