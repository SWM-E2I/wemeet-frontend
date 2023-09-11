import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import commonStyles, {
  subColorBlack2,
  subColorBlack,
  subColorPink,
  mainColor,
} from "../../styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../assets/vectors/Logo";
import NoTeamCharacter from "../../assets/characters/NoTeamCharacter";
import { useSelector } from "react-redux";

const NoTeamScreen = ({ navigation }) => {
  const emailAuthenticated = useSelector(
    (state) => state.persist.emailAuthenticated
  );
  const hasMainProfileImage = useSelector(
    (state) => state.persist.hasMainProfileImage
  );
  const onNext = () => {
    if (emailAuthenticated && hasMainProfileImage)
      navigation.navigate("ChatLink");
    else {
      Alert.alert(
        // "프로필 사진, 이메일\n인증을 완료해줘",
        // "마이페이지에서 완료 후에 다시 시도해줘",
        "앗, 잠깐!",
        "\n안전한 위밋 미팅을 위해\n대학생 인증과 프로필 사진 등록이 필요해\n",
        [
          {
            text: "마이페이지로 이동", // 버튼 텍스트
            onPress: () => navigation.navigate("ProfileStack"),
          },
        ]
      );
    }
    // navigation.navigate("ProfileStack"); // 임시
  };
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <View style={styles.logoContainer}>
        <Logo width={90} height={20} />
      </View>
      <View style={styles.infoContainer}>
        <NoTeamCharacter />
        <Text style={styles.text1}>아직 소속된 팀이 없네 😲</Text>
        <Text style={styles.text2}>
          {
            "위밋은 팀이 있어야 미팅을 신청할 수 있어\n함께 미팅에 나갈 팀을 생성해줘"
          }
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={onNext}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: "6%",
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    paddingVertical: 15,
    fontSize: 20,
    fontFamily: "pretendard600",
    color: "white",
  },
  text2: {
    paddingVertical: 5,
    fontSize: 17,
    fontFamily: "pretendard400",
    color: "#8E8E8E",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "88%",
    paddingVertical: 12,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default NoTeamScreen;
