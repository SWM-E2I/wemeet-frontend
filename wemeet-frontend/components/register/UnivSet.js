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

const UnivSet = ({
  univ,
  setUniv,
  college,
  setCollege,
  admissionYear,
  setAdmissionYear,
  navigation,
}) => {
  return (
    <>
      <View style={{ width: "100%" }}>
        <Text style={[registerStyles.labelText, { marginLeft: "10%" }]}>
          대학교
        </Text>
      </View>
      <TouchableOpacity
        style={[
          registerStyles.inputTextView,
          {
            backgroundColor: mainColor,
            borderColor: univ.length > 0 ? mainColor : "#C9C9C9",
            flexDirection: "row",
            borderWidth: 0.5,
          },
        ]}
        onPress={() => {
          navigation.navigate("UnivSearch", {
            setUniv: setUniv,
          });
        }}
      >
        <Text
          style={{
            color: univ.length > 0 ? subColorPink : "white",
            fontFamily: "pretendard500",
            fontSize: 18,
            textAlign: "left",
            marginRight: 10,
          }}
        >
          {univ.length > 0
            ? univNameList[univCodeList.indexOf(univ)]
            : "학교를 선택해줘 (터치)"}
        </Text>
        <FontAwesome
          name="search"
          size={16}
          color={univ.length > 0 ? subColorPink : "white"}
        />
      </TouchableOpacity>
      <View style={{ width: "100%" }}>
        <Text
          style={[
            registerStyles.labelText,
            { marginTop: 10, marginLeft: "10%" },
          ]}
        >
          계열 / 학번
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: Dimensions.get("window").width * 0.85,
          justifyContent: "space-between",
        }}
      >
        <SelectList
          setSelected={setCollege}
          data={collegeList}
          save="key"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.41,
              justifyContent: "space-between",
              backgroundColor: subColorBlack2,
              borderColor: college.length > 0 ? mainColor : "#C9C9C9",
              // marginBottom: 0,
              borderWidth: 0.5,
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            {
              fontFamily: "pretendard400",
              fontSize: 15,
              textAlign: "left",
              color: college.length > 0 ? subColorPink : "white",
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
          maxHeight={200}
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
            <FontAwesome
              name="chevron-down"
              size={12}
              color={college.length > 0 ? subColorPink : "white"}
            />
          }
        />
        <SelectList
          setSelected={(val) => {
            setAdmissionYear(val.toString());
          }}
          data={yearList}
          save="value"
          boxStyles={[
            registerStyles.inputTextView,
            {
              width: Dimensions.get("window").width * 0.41,
              justifyContent: "space-between",
              backgroundColor: subColorBlack2,
              borderColor: admissionYear.length > 0 ? mainColor : "#C9C9C9",
              borderWidth: 0.5,
              // marginBottom: 0,
            },
          ]}
          inputStyles={[
            registerStyles.inputText,
            {
              fontFamily: "pretendard400",
              fontSize: 15,
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
          maxHeight={200}
          dropdownStyles={{
            marginTop: 0,
            borderWidth: 0.5,
            backgroundColor: subColorBlack2,
          }}
          dropdownItemStyles={{
            height: 35,
            justifyContent: "center",
          }}
          arrowicon={
            <FontAwesome
              name="chevron-down"
              size={12}
              color={admissionYear.length > 0 ? subColorPink : "white"}
            />
          }
          searchicon={<FontAwesome name="search" size={15} color={"white"} />}
        />
      </View>

      <Text
        style={[
          registerStyles.warningText,
          {
            marginTop: 5,
            marginLeft: "8%",
            color: "white",
            alignSelf: "flex-start",
          },
        ]}
      >
        한번 입력된 대학 정보는 수정이 불가능해!
      </Text>
    </>
  );
};

export default UnivSet;
