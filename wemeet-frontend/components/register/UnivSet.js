import { View, Text, Dimensions, TextInput, Keyboard } from "react-native";
import React, { useState } from "react";
import registerStyles from "../../styles/registerStyles";
import RegisterAnimatedView from "./RegisterAnimatedView";
import { SelectList } from "react-native-dropdown-select-list";

const labels = ["학교명", "단과대", "학번"];
const UnivSet = ({
  stage,
  univ,
  setUniv,
  college,
  setCollege,
  admissionYear,
  setAdmissionYear,
}) => {
  const [animatedCards, setAnimatedCards] = useState([]);
  //임시
  const univList = [
    { key: "1", value: "고려대학교(서울)" },
    { key: "2", value: "고려대학교(세종)" },
    { key: "3", value: "연새대학교(서울)" },
    { key: "4", value: "참새대학교(원주)" },
    { key: "5", value: "제주대학교" },
    { key: "6", value: "MIT대학교(미국)" },
    { key: "7", value: "Harvard대학교(미국)" },
  ];
  const collegeList = [
    { key: "1", value: "인문사회" },
    { key: "2", value: "자연공학" },
    { key: "3", value: "예술체육" },
    { key: "4", value: "의료" },
    { key: "5", value: "법률" },
    { key: "6", value: "교육" },
    { key: "7", value: "그 외" },
  ];
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          {labels[stage - 1]}
        </Text>
      </View>
      {/* arrow 아이콘 검색 아이콘 변경 및 사이즈 바꾸기 + 바로 검색창 뜨게 가능한지? + 뒤로 가기 구현*/}
      {stage == 3 ? (
        <View style={registerStyles.inputTextView}>
          <TextInput
            value={admissionYear}
            onChangeText={(text) => setAdmissionYear(text)}
            style={[registerStyles.inputTextBox, registerStyles.inputText]}
            maxLength={2}
            autoFocus
            placeholder={"학번입력(미구현)"}
            inputMode={"numeric"}
          ></TextInput>
        </View>
      ) : stage == 1 ? (
        <SelectList
          setSelected={(val) => setUniv(val)}
          data={univList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.85,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[registerStyles.inputText, { fontSize: 18 }]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={"대학교를 선택해주세요"}
          searchPlaceholder={"학교명으로 검색"}
          notFoundText={"검색 결과가 없습니다"}
          search
          onSelect={() => {
            Keyboard.dismiss();
          }}
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
      ) : (
        <SelectList
          setSelected={(val) => setCollege(val)}
          data={collegeList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.85,
              justifyContent: "space-between",
            },
          ]}
          inputStyles={[registerStyles.inputText, { fontSize: 18 }]}
          dropdownTextStyles={{ fontSize: 15 }}
          placeholder={"단과대를 선택해주세요"}
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
      )}

      <Text
        style={[
          registerStyles.warningText,
          {
            marginLeft: "10%",
            color: "black",
            alignSelf: "flex-start",
          },
        ]}
      >
        {"한번 입력된 대학 정보는 수정이 불가능해!"}
      </Text>
      {stage === 2 ? <RegisterAnimatedView text={univ} /> : null}
      {stage === 3 ? (
        <>
          <RegisterAnimatedView text={college} fade />
          <RegisterAnimatedView text={univ} />
        </>
      ) : null}
    </>
  );
};

export default UnivSet;