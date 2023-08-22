import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { mainColor, subColorPink } from "../../styles/commonStyles";

const PopUp = ({ navigation }) => {
  return (
    <View style={styles.popUpContainer}>
      <Text style={styles.popUpText}>매칭 신청 완료!</Text>
      <Image
        source={require("../../assets/characters/RequestDoneCharacter.png")}
        style={styles.characterContainer}
        resizeMode={"contain"}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          //응답 성공인 경우 바로 '성사된 미팅'으로 이동
          navigation.pop(2);
          navigation.navigate("Matched");

          //   navigation.pop(2); //응답 실패인경우
        }}
      >
        <Text style={styles.popUpText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const MatchDoneModalScreen = ({ navigation }) => {
  //Api 연결 후, 성공 및 실패(가령 이미 신청한 경우)에 따라 다른 화면을 보여줄 예정
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <PopUp navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  popUpContainer: {
    padding: 24,
    backgroundColor: mainColor,
    borderRadius: 10,
    alignItems: "center",
  },
  popUpText: {
    color: "white",
    fontSize: 22,
    fontFamily: "pretendard500",
  },
  characterContainer: {
    marginTop: 24,
    marginBottom: 32,
    width: Dimensions.get("window").width * 0.65,
  },
  buttonContainer: {
    backgroundColor: subColorPink,
    width: Dimensions.get("window").width * 0.65,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MatchDoneModalScreen;
