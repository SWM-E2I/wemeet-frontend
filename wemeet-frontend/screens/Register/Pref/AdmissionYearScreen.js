import {
  SafeAreaView,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../styles/commonStyles";
import RegisterHeader from "../../../components/register/RegisterHeader";
import registerStyles from "../../../styles/registerStyles";
import RegisterCreditView from "../../../components/register/RegisterCreditView";
import NextButton from "../../../components/NextButton";
import SkipButton from "../../../components/SkipButton";
import { SelectList } from "react-native-dropdown-select-list";

const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};

const instruction = "어떤 미팅\n상대를 원하니";
const AdmissionYearScreen = ({ navigation }) => {
  const currentYear = getCurrentYear() % 100;
  const yearList = [
    { key: "1", value: currentYear },
    { key: "2", value: currentYear - 1 },
    { key: "3", value: currentYear - 2 },
    { key: "4", value: currentYear - 3 },
    { key: "5", value: currentYear - 4 },
    { key: "6", value: currentYear - 5 },
    { key: "7", value: currentYear - 6 },
    { key: "8", value: currentYear - 7 },
    { key: "9", value: currentYear - 8 },
    { key: "10", value: currentYear - 9 },
  ];
  const [startYear, setStartYear] = useState(currentYear);
  const [endYear, setEndYear] = useState(currentYear);
  const toNext = () => {
    navigation.navigate("SameUniv");
  };
  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <RegisterHeader navigation={navigation} back />
      <View style={registerStyles.instContainer}>
        <Text style={registerStyles.instText}>{instruction}</Text>
        <RegisterCreditView currentCredit={5} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* 여기에 body내용 입력 */}
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          최소
        </Text>
        <SelectList
          setSelected={(val) => {
            setStartYear(val);
          }}
          data={yearList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: 100,
              height: 60,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            { fontSize: 17, textAlign: "left", fontWeight: "bold" },
          ]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={currentYear}
          search={false}
          maxHeight={160}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
        />
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          최대
        </Text>
        <SelectList
          setSelected={(val) => {
            setStartYear(val);
          }}
          data={yearList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: 100,
              height: 60,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            { fontSize: 17, textAlign: "left", fontWeight: "bold" },
          ]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={currentYear}
          search={false}
          maxHeight={160}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
        />
        <SkipButton text={"상관 없어!"} style={{ marginTop: 10 }} />
      </View>
      <NextButton
        text={"다음"}
        onPress={toNext}
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default AdmissionYearScreen;
