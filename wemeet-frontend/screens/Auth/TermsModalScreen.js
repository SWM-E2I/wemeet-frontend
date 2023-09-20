import { View, Text, Linking, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { Alert } from "react-native";
import NextButton from "../../components/NextButton";
import { CommonActions } from "@react-navigation/native";
import {
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import { useDispatch } from "react-redux";
import { setAllowMarketing } from "../../redux/registerSlice";

const TermsModalScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const nextPage = route.params.next;
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false]);
  const handleAllCheckboxToggle = () => {
    if (!allChecked) {
      setChecked([true, true, true, true]);
    } else {
      setChecked([false, false, false, false]);
    }
    setAllChecked(!allChecked);
  };
  const title = "서비스 이용을 위한 동의 안내";
  const subtitle = "여러분의 개인정보와 서비스 이용 권리 잘 지켜 드릴게요.";
  const s_all = "아래 약관에 모두 동의합니다.";
  const s_age = "(필수) 만 18세 이상입니다.";
  const s_terms = "(필수) 서비스 이용약관 동의";
  const s_privacy = "(필수) 개인정보 처리 방침 동의";
  const s_info = "(선택) 혜택 및 마케팅 정보 수신 동의";
  const toNext = () => {
    if (checked[0] && checked[1] && checked[2]) {
      if (checked[3]) dispatch(setAllowMarketing(true));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: nextPage }],
        })
      );
    } else {
      Alert.alert(
        "알림",
        "필수정보에 대해 모두 동의하셔야\n서비스 이용이 가능합니다."
      );
    }
  };
  const onMoveToAgreement = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-ad22cdd1adb74bee8a6283c9cf8cf405"
    ).catch((err) =>
      console.error(
        "TermsModalScreen : An error occurred while opening browswer",
        err
      )
    );
  };
  const onMoveToPrivacy = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-f842efb5bda44d59ba846be0f12f586d"
    ).catch((err) =>
      console.error(
        "TermsModalScreen : An error occurred while opening browswer",
        err
      )
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderWidth: 1,
          borderBottomWidth: 0,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: subColorBlack2,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 27,
            fontFamily: "pretendard600",
            marginBottom: 5,
            alignSelf: "flex-start",
            marginLeft: "6%",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            // color: "#9C9C9C",
            color: subColorPink,
            fontSize: 13,
            fontFamily: "pretendard500",
            alignSelf: "flex-start",
            marginLeft: "6%",
          }}
        >
          {subtitle}
        </Text>

        <Checkbox.Item
          status={allChecked ? "checked" : "unchecked"}
          label={s_all}
          position={"leading"}
          mode={"android"}
          onPress={handleAllCheckboxToggle}
          color={"white"}
          uncheckedColor={"white"}
          labelStyle={{
            fontFamily: "pretendard500",
            color: "white",
            textAlign: "left",
            fontSize: 20,
          }}
        />
        <View
          style={{
            height: 10,
            width: "93%",
            backgroundColor: subColorBlack2,
            borderTopWidth: 1,
            borderTopColor: "white",
            marginLeft: "5%",
          }}
        />

        <Checkbox.Item
          status={checked[0] ? "checked" : "unchecked"}
          label={s_age}
          position={"leading"}
          mode={"android"}
          onPress={() => {
            if (allChecked && checked[0]) setAllChecked(false);
            else if (
              !allChecked &&
              checked.toString() == [false, true, true, true].toString()
            )
              setAllChecked(true);
            setChecked([!checked[0], checked[1], checked[2], checked[3]]);
          }}
          color={"white"}
          uncheckedColor={"white"}
          labelStyle={{
            fontFamily: "pretendard500",
            color: "white",
            textAlign: "left",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Checkbox.Item
            status={checked[1] ? "checked" : "unchecked"}
            label={s_terms}
            position={"leading"}
            mode={"android"}
            onPress={() => {
              if (allChecked && checked[1]) setAllChecked(false);
              else if (
                !allChecked &&
                checked.toString() == [true, false, true, true].toString()
              )
                setAllChecked(true);
              setChecked([checked[0], !checked[1], checked[2], checked[3]]);
            }}
            color={"white"}
            uncheckedColor={"white"}
            labelStyle={{
              fontFamily: "pretendard500",
              color: "white",
              textAlign: "left",
            }}
          />

          <TouchableOpacity onPress={onMoveToAgreement}>
            <Text style={{ color: subColorPink, marginRight: "6%" }}>
              [보기]
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Checkbox.Item
            status={checked[2] ? "checked" : "unchecked"}
            label={s_privacy}
            position={"leading"}
            mode={"android"}
            onPress={() => {
              if (allChecked && checked[2]) setAllChecked(false);
              else if (
                !allChecked &&
                checked.toString() == [true, true, false, true].toString()
              )
                setAllChecked(true);
              setChecked([checked[0], checked[1], !checked[2], checked[3]]);
            }}
            color={"white"}
            uncheckedColor={"white"}
            labelStyle={{
              fontFamily: "pretendard500",
              color: "white",
              textAlign: "left",
            }}
          />
          <TouchableOpacity onPress={onMoveToPrivacy}>
            <Text style={{ color: subColorPink, marginRight: "6%" }}>
              [보기]
            </Text>
          </TouchableOpacity>
        </View>
        <Checkbox.Item
          status={checked[3] ? "checked" : "unchecked"}
          label={s_info}
          position={"leading"}
          mode={"android"}
          onPress={() => {
            if (allChecked && checked[3]) setAllChecked(false);
            else if (
              !allChecked &&
              checked.toString() == [true, true, true, false].toString()
            )
              setAllChecked(true);
            setChecked([checked[0], checked[1], checked[2], !checked[3]]);
          }}
          color={"white"}
          uncheckedColor={"white"}
          labelStyle={{
            fontFamily: "pretendard500",
            color: "white",
            textAlign: "left",
          }}
        />
        <NextButton
          text={"동의하고 진행하기"}
          onPress={toNext}
          // disabled={!allChecked}
          style={{ marginTop: 10, backgroundColor: subColorPink }}
        />
      </View>
    </View>
  );
};

export default TermsModalScreen;
