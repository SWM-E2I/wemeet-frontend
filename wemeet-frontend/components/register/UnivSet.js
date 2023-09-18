import {
  View,
  Text,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState, useMemo } from "react";
import registerStyles from "../../styles/registerStyles";
import RegisterAnimatedView from "./RegisterAnimatedView";
import { SelectList } from "react-native-dropdown-select-list";
import {
  univNameList,
  univCodeList,
  univList,
  collegeList,
  collegeObj,
  yearList,
} from "../../assets/datasets";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const labels = ["학교명", "계열", "학번"];

const UnivSet = ({
  stage,
  univ,
  setUniv,
  college,
  setCollege,
  admissionYear,
  setAdmissionYear,
  setStage,
  navigation,
}) => {
  const changeStage = async (stage) => {
    setStage(stage);
  };
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          {labels[stage - 1]}
        </Text>
      </View>
      {/* arrow 아이콘 검색 아이콘 변경 및 사이즈 바꾸기 + 바로 검색창 뜨게 가능한지? + 뒤로 가기 구현*/}
      {stage === 1 ? (
        <TouchableOpacity
          style={[registerStyles.inputTextView, { backgroundColor: mainColor }]}
          onPress={() => {
            navigation.navigate("UnivSearch", {
              setUniv: setUniv,
              setStage: setStage,
            });
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "pretendard500",
              fontSize: 18,
              textAlign: "left",
            }}
          >
            학교를 선택해줘 (터치)
          </Text>
        </TouchableOpacity>
      ) : stage === 2 ? (
        <>
          <SelectList
            setSelected={setCollege}
            onSelect={async () => {
              await changeStage(3);
            }}
            data={collegeList}
            save="key"
            boxStyles={[
              registerStyles.inputTextView,
              {
                width: Dimensions.get("window").width * 0.85,
                justifyContent: "space-between",
                backgroundColor: subColorBlack2,
                borderWidth: 1,
                // marginBottom: 0,
              },
            ]}
            inputStyles={[
              registerStyles.inputText,
              {
                fontFamily: "pretendard400",
                fontSize: 18,
                textAlign: "left",
                color: "white",
              },
            ]}
            dropdownTextStyles={{
              fontSize: 15,
              fontFamily: "pretendard400",
              // color: subColorPink,
              color: "white",
            }}
            placeholder={"계열을 선택해줘"}
            search={false}
            maxHeight={160}
            dropdownStyles={{
              // backgroundColor: "#F2F2F2",
              backgroundColor: subColorBlack2,
              marginTop: 0,
              borderWidth: 0.5,
              marginBottom: 5,
            }}
            dropdownItemStyles={{
              height: 35,
              justifyContent: "center",
            }}
            arrowicon={
              <FontAwesome name="chevron-down" size={12} color={"white"} />
            }
          />
        </>
      ) : (
        <SelectList
          setSelected={(val) => {
            setAdmissionYear(val.toString());
          }}
          data={yearList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.85,
              justifyContent: "space-between",
              backgroundColor: subColorBlack2,
              borderWidth: admissionYear && admissionYear.length > 0 ? 0 : 1,
              // marginBottom: 0,
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            {
              fontFamily: "pretendard400",
              fontSize: 18,
              textAlign: "left",
              // color: "white",
              color: admissionYear.length > 0 ? subColorPink : "white",
            },
          ]}
          dropdownTextStyles={{
            fontSize: 15,
            fontFamily: "pretendard400",
            // color: subColorPink,
            color: "white",
          }}
          placeholder={"학번을 선택해줘"}
          search={false}
          maxHeight={160}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 2,
            backgroundColor: subColorBlack2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
          arrowicon={
            admissionYear.length == 0 ? (
              <FontAwesome name="chevron-down" size={12} color={"white"} />
            ) : (
              <></>
            )
          }
          searchicon={<FontAwesome name="search" size={15} color={"white"} />}
          closeicon={
            <AntDesign
              name="close"
              size={18}
              color={admissionYear.length > 0 ? subColorPink : "white"}
            />
          }
        />
      )}
      {stage === 2 ? (
        <RegisterAnimatedView
          text={univNameList[univCodeList.indexOf(univ)]}
          textStyle={{
            textAlign: "left",
            fontSize: 20,
            fontFamily: "pretendard400",
            color: subColorPink,
          }}
          style={{ backgroundColor: subColorBlack2 }}
          down
        />
      ) : null}
      {stage === 3 ? (
        <>
          <RegisterAnimatedView
            text={collegeObj[college]}
            fade
            textStyle={{
              textAlign: "left",
              fontSize: 20,
              fontFamily: "pretendard400",
              color: subColorPink,
            }}
            style={{
              backgroundColor: subColorBlack2,
              marginBottom: 0,
            }}
          />
          <RegisterAnimatedView
            text={univNameList[univCodeList.indexOf(univ)]}
            textStyle={{
              textAlign: "left",
              fontSize: 20,
              fontFamily: "pretendard400",
              color: subColorPink,
            }}
            style={{
              backgroundColor: subColorBlack2,
              marginBottom: 0,
            }}
          />
        </>
      ) : null}
      <Text
        style={[
          registerStyles.warningText,
          {
            marginLeft: "10%",
            color: "white",
            alignSelf: "flex-start",
          },
        ]}
      >
        {stage === 1
          ? "더 많은 대학은 곧 업데이트 예정이니 조금만 기다려줘!"
          : "한번 입력된 대학 정보는 수정이 불가능해!"}
      </Text>
    </>
  );
};

export default UnivSet;
