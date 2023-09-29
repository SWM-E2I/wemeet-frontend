import {
  SafeAreaView,
  Pressable,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { subColorBlack, subColorPink } from "../../styles/commonStyles";
import { SelectList } from "react-native-dropdown-select-list";
import {
  univNameList,
  univCodeList,
  univList2,
  collegeList,
  yearList,
} from "../../assets/datasets";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import MbtiComponent from "../../components/team/MbtiComponent";
import { useDispatch } from "react-redux";
import { addMember } from "../../redux/teamGenerateSlice";

const MemberModalScreen = ({ navigation, route }) => {
  const edit = route.params?.edit;
  const dispatch = useDispatch();
  //univSet과 마찬가지로 추후에 최적화하기.
  const [univ, setUniv] = useState(null);
  const [college, setCollege] = useState(null);
  const [admissionYear, setAdmissionYear] = useState(null);
  const [mbti, setMbti] = useState("XXXX"); //redux state에 mbti 저장하기
  const onAdd = () => {
    if (univ && college && admissionYear) {
      dispatch(
        addMember({
          collegeInfo: {
            collegeCode: univ,
            collegeType: college,
            admissionYear: admissionYear.toString(),
          },
          mbti: mbti,
        })
      );
      navigation.navigate("Members", { edit: edit });
    } else Alert.alert("학교/학과, 학번, MBTI를 모두 선택해줘");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        style={{ flex: 0.5 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : null} //일단 안드로이드는 포기...
      >
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{
            paddingHorizontal: "7%",
            paddingVertical: 10,
            paddingBottom: 20,
          }}
        >
          <Text style={styles.labelText}>학교</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UnivSearchModal", { setUniv: setUniv });
              }}
              style={[
                styles.selectBox,
                {
                  width: Dimensions.get("window").width * 0.5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
                univ ? { backgroundColor: "black", borderWidth: 0 } : null,
              ]}
            >
              <Text
                style={[
                  styles.selectInput,
                  univ
                    ? { marginRight: 0, color: subColorPink }
                    : { marginRight: 10 },
                ]}
              >
                {univ ? univNameList[univCodeList.indexOf(univ)] : "학교 검색"}
              </Text>
              {!univ && <FontAwesome name="search" size={16} color="white" />}
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>계열 / 학번</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <SelectList
              setSelected={setCollege}
              data={collegeList}
              save="key"
              boxStyles={[
                styles.selectBox,
                college
                  ? {
                      backgroundColor: "black",
                      borderColor: "black",
                      justifyContent: "center",
                    }
                  : null,
              ]}
              inputStyles={[
                styles.selectInput,
                college ? { color: subColorPink } : null,
              ]}
              dropdownTextStyles={styles.dropdownText}
              dropdownStyles={styles.dropdownBox}
              dropdownItemStyles={styles.dropdownItem}
              placeholder={"단과대 선택"}
              search={false}
              maxHeight={130}
              arrowicon={
                college ? (
                  <></>
                ) : (
                  <FontAwesome name="chevron-down" size={14} color="white" />
                )
              }
              closeicon={<AntDesign name="close" size={18} color={"white"} />}
              searchicon={<></>}
            />
            <SelectList
              setSelected={setAdmissionYear}
              data={yearList}
              save="value"
              boxStyles={[
                styles.selectBox,
                { width: Dimensions.get("window").width * 0.3, marginLeft: 20 },
                admissionYear
                  ? {
                      backgroundColor: "black",
                      borderColor: "black",
                      justifyContent: "center",
                    }
                  : null,
              ]}
              inputStyles={[
                styles.selectInput,
                { marginLeft: 0 },
                admissionYear ? { color: subColorPink } : null,
              ]}
              dropdownTextStyles={styles.dropdownText}
              dropdownStyles={[
                styles.dropdownBox,
                {
                  width: Dimensions.get("window").width * 0.3,
                  marginLeft: 20,
                },
              ]}
              dropdownItemStyles={styles.dropdownItem}
              placeholder={"학번 선택"}
              search={false}
              maxHeight={130}
              arrowicon={
                admissionYear ? (
                  <></>
                ) : (
                  <FontAwesome name="chevron-down" size={14} color="white" />
                )
              }
              closeicon={<AntDesign name="close" size={18} color={"white"} />}
              searchicon={<></>}
            />
          </View>
          <Text style={styles.labelText}>MBTI</Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <MbtiComponent
              mbti={mbti}
              setMbti={setMbti}
              letters={["E", "S", "T", "P"]}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <MbtiComponent
              mbti={mbti}
              setMbti={setMbti}
              letters={["I", "N", "F", "J"]}
            />
            <TouchableOpacity
              style={{
                height: 45,
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: mbti == "XXXX" ? "black" : subColorBlack,
                borderColor: mbti == "XXXX" ? null : "white",
                borderWidth: mbti == "XXXX" ? 0 : 0.5,
              }}
              onPress={() => {
                setMbti("XXXX");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "pretendard400",
                  color: mbti == "XXXX" ? subColorPink : "white",
                }}
              >
                아직 잘 몰라
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.buttonContainer} onPress={onAdd}>
          <Text style={styles.buttonText}>추가하기</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1, //임시
    backgroundColor: subColorBlack,
  },
  labelText: {
    fontSize: 16,
    fontFamily: "pretendard500",
    color: "white",
    paddingTop: 20,
    paddingBottom: 10,
  },
  selectBox: {
    width: Dimensions.get("window").width * 0.41,
    paddingVertical: 10,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  selectInput: {
    color: "white",
    fontFamily: "pretendard400",
    fontSize: 15,
    textAlign: "left",
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "pretendard400",
    color: "white",
  },
  dropdownBox: {
    borderColor: "white",
    borderWidth: 0.5,
    width: Dimensions.get("window").width * 0.41,
  },
  dropdownItem: {
    paddingVertical: 6,
  },
  buttonContainer: {
    width: "86%",
    alignSelf: "center",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: subColorPink,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "pretendard500",
    letterSpacing: -0.5,
  },
});

export default MemberModalScreen;
