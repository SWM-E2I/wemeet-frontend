import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import RegisterHeader from "../../../components/register/RegisterHeader";
import commonStyles, { subColorPink } from "../../../styles/commonStyles";
import registerStyles from "../../../styles/registerStyles";
import NextButton from "../../../components/NextButton";
import { CommonActions } from "@react-navigation/native";
import NoTeamCharacter from "../../../assets/characters/NoTeamCharacter";
import RequestDoneCharacter from "../../../assets/characters/RequestDoneCharacter";

const ButtonContainer = ({ text, done, onPress, text2 }) => {
  return (
    <View
      style={{
        height: 60,
        width: "85%",
        borderRadius: 8,
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "pretendard500",
          color: "#FFFFFF",
          marginLeft: 10,
        }}
      >
        {text}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: done ? subColorPink : "#C9C9C9",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          width: done ? 70 : 90,
          height: 40,
          marginRight: 10,
        }}
        disabled={done}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#FFFFFF",
            fontFamily: "pretendard500",
          }}
        >
          {done ? "완료" : text2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const instruction = "추가 정보를\n입력해줘";
const AdditionalScreen = ({ navigation }) => {
  //persist Data 받아서 분기하기!
  const emailAuthenticated = useSelector(
    (state) => state.persist.emailAuthenticated
  );
  const hasMainProfileImage = useSelector(
    (state) => state.persist.hasMainProfileImage
  );
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} />
      <View
        style={[
          registerStyles.instContainer,
          // { height: 100, backgroundColor: "yellow" },
          { marginBottom: 10 },
        ]}
      >
        <Text style={[registerStyles.instText, {}]}>{instruction}</Text>
      </View>
      <Text
        style={{
          marginLeft: "8%",
          marginBottom: 10,
          color: subColorPink,
          fontFamily: "pretendard600",
        }}
      >
        건너뛰고 바로 시작해도 좋아!
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {hasMainProfileImage && !emailAuthenticated ? (
          <>
            <ButtonContainer
              text={"사진 등록"}
              done={hasMainProfileImage}
              onPress={() => {
                navigation.navigate("PhotoSet");
              }}
              text2={"등록하기"}
            />
            <ButtonContainer
              text={"대학생 인증"}
              done={emailAuthenticated}
              onPress={() => {
                navigation.navigate("UnivMail");
              }}
              text2={"인증하기"}
            />
          </>
        ) : (
          <>
            <ButtonContainer
              text={"대학생 인증"}
              done={emailAuthenticated}
              onPress={() => {
                navigation.navigate("UnivMail");
              }}
              text2={"인증하기"}
            />
            <ButtonContainer
              text={"사진 등록"}
              // done={false}
              done={hasMainProfileImage}
              onPress={() => {
                navigation.navigate("PhotoSet");
              }}
              text2={"등록하기"}
            />
          </>
        )}
      </View>

      <NextButton
        text={"위밋 바로 시작하기"}
        onPress={() => {
          //*** Alert띄워서 정말 입력안할거양?!? 해주기 */
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "MainTab" }],
            })
          );
        }}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
          backgroundColor: subColorPink,
        }}
      />
    </SafeAreaView>
  );
};

export default AdditionalScreen;
