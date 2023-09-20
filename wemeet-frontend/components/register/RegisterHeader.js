import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { mainColor, subColorBlack } from "../../styles/commonStyles";
import registerStyles from "../../styles/registerStyles";

const RegisterHeader = ({ navigation, back, onBack }) => {
  const onMoveToAgreement = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-ad22cdd1adb74bee8a6283c9cf8cf405"
    ).catch((err) =>
      console.error(
        "onMoveToAgreement : An error occurred while opening browswer",
        err
      )
    );
  };
  const onMoveToPrivacy = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-f842efb5bda44d59ba846be0f12f586d"
    ).catch((err) =>
      console.error(
        "onMoveToPrivacy : An error occurred while opening browswer",
        err
      )
    );
  };
  return (
    <View style={styles.container}>
      {back ? (
        <TouchableOpacity onPress={onBack ? onBack : navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          right: "8%",
          top: "30%",
        }}
      >
        <TouchableOpacity onPress={onMoveToPrivacy}>
          <Text style={[registerStyles.agreement, { marginRight: 20 }]}>
            개인정보처리방침
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onMoveToAgreement}>
          <Text style={registerStyles.agreement}>이용약관</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 10,
    paddingLeft: 20,
    // backgroundColor: mainColor,
    backgroundColor: subColorBlack,
  },
});

export default RegisterHeader;
