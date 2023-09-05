import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
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

const NoTeamScreen = ({ navigation }) => {
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("TeamPhoto");
          }}
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
