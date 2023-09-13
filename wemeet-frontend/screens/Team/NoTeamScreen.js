import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
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

const NoTeamScreen = ({ navigation, onRefresh }) => {
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
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태를 나타내는 상태 변수
  const onRefreshing = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };
  return (
    // <SafeAreaView
    //   style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    // >
    //   <View style={styles.logoContainer}>
    //     <Logo width={90} height={20} />
    //   </View>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      refreshControl={
        // RefreshControl을 ScrollView에 추가
        <RefreshControl
          refreshing={refreshing} // 새로고침 중일 때 true, 아닐 때 false
          onRefresh={onRefreshing} // 당겨서 새로고침 작업을 수행하는 함수
          progressViewOffset={30} // 로딩 바가 어느 위치에서 시작할지 설정
          colors={["white"]} // 로딩 바의 색상 설정
          tintColor={"white"} // 로딩 바의 색상 설정
          title={"새로고침 중..."}
          titleColor={"white"}
        />
      }
    >
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
    </ScrollView>
    // </SafeAreaView>
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
