import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import registerStyles from "../styles/registerStyles";
import RegisterAnimatedView from "./RegisterAnimatedView";

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
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          {labels[stage - 1]}
        </Text>
      </View>
      <View style={[registerStyles.inputTextView]}>
        <TextInput
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
        ></TextInput>
      </View>
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
