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
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { mainColor, subColorPink } from "../../styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; //대책
import { requestApi, requestMessageApi } from "../../api/home";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../redux/signalSlice";

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
const LikeMatchRequestModalScreen = ({ navigation, route }) => {
  const signal = useSelector((state) => state.signal.signal);
  const dispatch = useDispatch();
  const teamId = route.params.teamId;
  console.log("likematch :", teamId);
  const controller = new AbortController();
  //api보낼때활용!!
  const [useInput, setUseInput] = useState(true);
  const [letter, setLetter] = useState("");
  const heightValue = useRef(
    new Animated.Value(Platform.OS == "ios" ? 350 : 375) //for keyboardavoidingview issue in android
  ).current;
  const onMount = async () => {
    let res = await creditInquiryApi(navigation, controller);
    if (res) {
      dispatch(setSignal(res));
    }
  };
  useEffect(() => {
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  const onRequestPress = async () => {
    let result = false;
    if (!useInput) result = await requestApi(teamId, navigation, controller);
    else
      result = await requestMessageApi(teamId, letter, navigation, controller);
    if (result) {
      Alert.alert("신청 완료", "상대방이 수락하면 문자 메세지를 보내줄게!", [
        {
          text: "확인",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };
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
        behavior={Platform.OS == "ios" ? "padding" : "position"}
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
              <Signal amount={signal} useInput />
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
                      toValue: Platform.OS === "ios" ? 350 : 375,
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
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onRequestPress}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  letterSpacing: -0.4,
                  fontFamily: "pretendard600",
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
    fontFamily: "pretendard600",
    color: "white",
    lineHeight: 33,
    letterSpacing: -0.5,
  },
  buttonText: {
    fontSize: 16,
    color: subColorPink,
    fontFamily: "pretendard600",
  },
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
    height: Platform.OS === "ios" ? 90 : 105,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#2B2B2B",
    marginVertical: 15,
  },
  inputTextBox: {
    height: "95%",
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
    fontSize: 16,
    fontFamily: "pretendard400",
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

export default LikeMatchRequestModalScreen;
