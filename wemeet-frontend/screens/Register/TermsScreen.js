import { Button, View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { Alert } from "react-native";

const TermsScreen = ({ navigation }) => {
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
      navigation.navigate("Auth");
    } else {
      Alert.alert("모두 동의하세용");
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
      <Checkbox
        status={allChecked ? "checked" : "unchecked"}
        onPress={handleAllCheckboxToggle}
      />
      <Text>{s_all}</Text>
      <Checkbox
        status={checked[0] ? "checked" : "unchecked"}
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
      <Text>{s_age}</Text>
      <Checkbox
        status={checked[1] ? "checked" : "unchecked"}
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
      <Text>{s_terms}</Text>
      <Checkbox
        status={checked[2] ? "checked" : "unchecked"}
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
      <Text>{s_privacy}</Text>
      <Checkbox
        status={checked[3] ? "checked" : "unchecked"}
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
      <Text>{s_info}</Text>
      <Button
        title={"다음"}
        onPress={toNext}
        color={"black"}
        disabled={!allChecked}
      ></Button>
    </SafeAreaView>
  );
};

export default TermsScreen;
