import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { Alert } from "react-native";
import NextButton from "../../components/NextButton";
import { CommonActions } from "@react-navigation/native";

const TermsModalScreen = ({ navigation, route }) => {
  //임시 페이지, Naviagtion modal로 구현 -> 추후 bottomsheet library로 migrate필요.
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
  const s_all = "서비스 이용을 위해 아래 약관에 모두 동의합니다.";
  const s_age = "(필수) 만 14세 이상입니다.";
  const s_terms = "(필수) 서비스 이용약관 동의";
  const s_privacy = "(필수) 개인정보 처리 방침 동의";
  const s_info = "(필수) 민감정보 수집 및 이용 동의";
  const toNext = () => {
    if (allChecked) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: nextPage }],
        })
      );
    } else {
      Alert.alert("모두 동의해야 서비스 이용이 가능합니다.");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderWidth: 1,
          borderBottomWidth: 0,
        }}
      >
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <Checkbox.Item
          status={allChecked ? "checked" : "unchecked"}
          label={s_all}
          position={"leading"}
          mode={"android"}
          onPress={handleAllCheckboxToggle}
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
        />
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
        />
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
        />
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
        />
        <NextButton
          text={"동의하고 진행하기"}
          onPress={toNext}
          disabled={!allChecked}
          style={{ marginTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TermsModalScreen;
