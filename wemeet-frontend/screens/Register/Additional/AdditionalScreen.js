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
import commonStyles from "../../../styles/commonStyles";
import registerStyles from "../../../styles/registerStyles";
import NextButton from "../../../components/NextButton";
import { CommonActions } from "@react-navigation/native";

const ButtonContainer = ({ text, done, onPress }) => {
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
          //   fontWeight: "bold",
          color: "#FFFFFF",
          marginLeft: 10,
        }}
      >
        {text}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: done ? "#FFB800" : "#C9C9C9",
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
            // fontWeight: "bold"
          }}
        >
          {done ? "완료" : "완료하기"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const instruction = "추가 정보를 입력하면\n더 많은 친구들을\n만날 수 있어!";
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
      <View style={[registerStyles.instContainer, { height: 200 }]}>
        <Text style={[registerStyles.instText, { width: "70%" }]}>
          {instruction}
        </Text>
      </View>
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
            />
            <ButtonContainer
              text={"대학생 인증"}
              done={emailAuthenticated}
              onPress={() => {
                navigation.navigate("UnivMail");
              }}
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
            />
            <ButtonContainer
              text={"사진 등록"}
              // done={hasMainProfileImage}
              done={false}
              onPress={() => {
                navigation.navigate("PhotoSet");
              }}
            />
          </>
        )}
      </View>
      <NextButton
        text={"위밋 바로 시작하기"}
        onPress={() => {
          //*** Alert띄워서 정말 입력안할거양?!? 해주기 */
          Alert.alert("위밋 시작!");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Main" }],
            })
          );
        }}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default AdditionalScreen;
