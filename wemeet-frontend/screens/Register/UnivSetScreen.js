import {
  SafeAreaView,
  Button,
  View,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import React, { memo, useCallback, useRef, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@miblanchard/react-native-slider";
import DropdownPicker from "../../components/DropdownPicker.js";
// import Slider from "@react-native-community/slider";
// import { Picker } from "@react-native-picker/picker";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear() % 100;
};

const UnivSetScreen = ({ navigation }) => {
  //추후 대학 소속 변경은 불가능해요. 정확하게 입력해주세요.
  /*회원가입 완료 버튼을 누르고 다음으로 navigate하면 대학교 인증 페이지에서 뒤로 가기가 불가능해야함 */
  //state사용 -> 회원가입 api 실행
  const thisYear = getCurrentYear();
  const [univ, setUniv] = useState(univCodeList[0]);
  const [dep, setDep] = useState(depCodeList[0]);
  const [admissionYear, setAdmissionYear] = useState(thisYear);
  // const tmp = useSelector((state) => { //잘 넘어오는지 확인
  //   return state.register.pref_info;
  // });
  // console.log(tmp);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>학교 정보를 등록해 주세요</Text>
      {/* 학교 및 단과대, 학번, 학교랑 단과대는 선택할 수 있도록 구현 */}
      <Text>학교 및 단과대*</Text>
      <DropdownPicker />
      <Text>학번*</Text>
      <Slider
        containerStyle={{ width: 250, height: 25 }}
        trackStyle={{ height: 8, borderRadius: 10 }}
        ㅇㅇ
        value={admissionYear}
        maximumValue={thisYear}
        minimumValue={thisYear - 8}
        minimumTrackTintColor={"pink"}
        maximumTrackTintColor={"pink"}
        // thumbTintcolor={"gray"}
        thumbStyle={{ backgroundColor: "black", width: 20, height: 15 }}
        step={1}
        onValueChange={(value) => setAdmissionYear(value[0])}
      />
      <Text>{`${admissionYear} 학번`}</Text>
      <Button
        title={"회원 가입 완료"}
        color={"pink"}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "UnivAuth" }],
            })
          );
        }}
      ></Button>
    </SafeAreaView>
  );
};

export default UnivSetScreen;
