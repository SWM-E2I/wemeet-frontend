import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import registerStyles from "../../styles/registerStyles";
import RegisterAnimatedView from "./RegisterAnimatedView";
import { SelectList } from "react-native-dropdown-select-list";

const labels = ["학교명", "단과대", "학번"];
const placeholders = [
  "학교선택(미구현)",
  "단과대선택(미구현)",
  "학번입력(미구현)",
];
const UnivSet = ({
  stage,
  univ,
  setUniv,
  college,
  setCollege,
  admissionYear,
  setAdmissionYear,
}) => {
  const values = [univ, college, admissionYear];
  const [animatedCards, setAnimatedCards] = useState([]);
  //임시
  const data = [
    { key: "1", value: "고려대학교(서울)" },
    { key: "2", value: "고려대학교(세종)" },
    { key: "3", value: "연세대학교(서울)" },
    { key: "4", value: "연세대학교(원주)" },
    { key: "5", value: "제주대학교" },
    { key: "6", value: "MIT" },
    { key: "7", value: "Harvard" },
  ];
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          {labels[stage - 1]}
        </Text>
      </View>
      {/* <TextInput
          value={values[stage - 1]}
          onChangeText={(text) => {
            switch (stage) {
              case 1:
                setUniv(text);
                break;
              case 2:
                setCollege(text);
                break;
              case 3:
                setAdmissionYear(text);
                break;
            }
          }}
          style={[registerStyles.inputTextBox, registerStyles.inputText]}
          autoFocus
          placeholder={placeholders[stage - 1]}
          inputMode={stage === 3 ? "numeric" : "none"}
        ></TextInput> */}
      {/* arrow 아이콘 검색 아이콘 변경 및 사이즈 바꾸기 + 바로 검색창 뜨게 가능한지?*/}
      <SelectList
        setSelected={(val) => setUniv(val)}
        data={data}
        save="value"
        boxStyles={[
          registerStyles.inputTextView,
          {
            width: Dimensions.get("window").width * 0.85,
            justifyContent: "space-between",
          },
        ]}
        inputStyles={[registerStyles.inputText]}
        dropdownTextStyles={{ fontSize: 15 }}
        placeholder={"대학교를 선택해주세요"}
        searchPlaceholder={"학교명으로 검색"}
        notFoundText={"검색 결과가 없습니다"}
        search
        onSelect={() => {
          //클릭시 Keyboard.dismiss()
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
