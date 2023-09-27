import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack2,
  subColorBlack,
} from "../../styles/commonStyles";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { accountDeleteApi, logoutApi } from "../../api/myProfile";
import { CommonActions } from "@react-navigation/native";
import { resetState } from "../../redux/persistSlice";
import { modifyProfileApi } from "../../api/myProfile";
import { setProfileData } from "../../redux/profileSlice";
import MbtiComponent from "../../components/team/MbtiComponent";

const MyAccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);
  const controller = new AbortController();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState(profileData.nickname);
  const [editMbti, setEditMbti] = useState(false);
  const [mbti, setMbti] = useState(profileData.mbti);
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleTextChange = (inputText) => {
    setNickname(inputText.slice(0, 5));
  };
  const handleSubmit = async () => {
    // 입력된 닉네임을 수정 제출
    //닉네임 변경의 경우 최소 1글자 이상!
    if (nickname.length < 1) {
      Alert.alert("1글자 이상 입력해줘");
      return;
    } else {
      let result = await modifyProfileApi(
        nickname,
        profileData.mbti,
        navigation,
        controller
      );
      if (result) {
        dispatch(setProfileData({ ...profileData, nickname: nickname }));
      }
      hideModal();
    }
  };
  const handleMbtiSubmit = async () => {
    // 입력된 MBTI를 수정 제출
    let result = await modifyProfileApi(
      profileData.nickname,
      mbti,
      navigation,
      controller
    );
    console.log(result);
    if (result) {
      dispatch(setProfileData({ ...profileData, mbti: mbti }));
    }
    hideModal();
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);
  const setPhoto = () => {
    navigation.navigate("PhotoSet", {
      toProfile: true,
    });
  };
  const onNicknamePress = () => {
    setEditMbti(false);
    setTimeout(() => {
      setEditNickname(true);
      showModal();
    }, 100);
  };
  const onMbtiPress = () => {
    setEditNickname(false);
    setTimeout(() => {
      setEditMbti(true);
      showModal();
    }, 100);
  };
  const onDeleteAccount = async () => {
    Alert.alert(
      "위밋 계정 삭제",
      "정말로 탈퇴하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "탈퇴",
          onPress: async () => {
            let result = await accountDeleteApi(navigation, controller);
            if (result) {
              dispatch(resetState(true));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Initial" }],
                })
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        {
          backgroundColor: mainColor,
        },
      ]}
    >
      <ScrollView
        style={{
          // flex: 1,
          paddingHorizontal: 30,
          //backgroundColor: "yellow"
        }}
        contentContainerStyle={{ flex: 1, alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            position: "absolute",
            top: 20,
            left: Platform.OS === "ios" ? -10 : 0,
          }}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontFamily: "pretendard600",
            color: "white",
          }}
        >
          계정 관리
        </Text>
        <View style={{ marginVertical: 30 }}>
          {profileData?.profileImage.basicUrl ? (
            <Image
              source={{
                uri: profileData?.profileImage.basicUrl,
              }}
              style={styles.imageContainer} //borderRadius : width/2
            />
          ) : (
            <TouchableOpacity style={styles.imageContainer} onPress={setPhoto}>
              <Text style={styles.imageText}>사진 등록하기</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={setPhoto}
          >
            <MaterialIcons name="photo" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <Text style={styles.labelText}>기본 정보</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>성별</Text>
          <Text style={styles.infoText2}>
            {profileData.gender == "MAN" ? "남자" : "여자"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>닉네임</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.infoText2, { marginRight: 5 }]}>
              {profileData.nickname}
            </Text>
            <TouchableOpacity onPress={onNicknamePress}>
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color={subColorPink}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>MBTI</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.infoText2, { marginRight: 5 }]}>
              {profileData.mbti == "XXXX" ? "아직 잘 몰라" : profileData.mbti}
            </Text>
            <TouchableOpacity onPress={onMbtiPress}>
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color={subColorPink}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 30,
          }}
        >
          <TouchableOpacity
            style={styles.infoContainer}
            onPress={() => {
              logoutApi(navigation);
            }}
          >
            <Text style={styles.grayText}>로그 아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.infoContainer]}
            onPress={onDeleteAccount}
          >
            <Text style={styles.grayText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hideModal}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {editNickname ? (
            <KeyboardAvoidingView
              style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                width: "75%",
                backgroundColor: subColorBlack2,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#9C9C9C",
                borderWidth: 0.5,
              }}
              behavior={Platform.OS === "ios" ? "padding" : "position"}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "pretendard500",
                  marginBottom: 30,
                }}
              >
                변경할 닉네임을 입력해줘
              </Text>
              <TextInput
                placeholder={profileData.nickname}
                onChangeText={handleTextChange}
                value={nickname}
                style={{
                  borderRadius: 10,
                  // backgroundColor: subColorBlack,
                  borderColor: "white",
                  borderWidth: 0.5,
                  width: "100%",
                  height: 40,
                  paddingHorizontal: 20,
                  color: "white",
                  fontFamily: "pretendard500",
                  marginBottom: 10,
                  fontSize: 16,
                }}
                placeholderTextColor={"#9C9C9C"}
                maxLength={6}
              />
              <View
                style={{
                  width: "100%",
                  paddingVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={hideModal}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: subColorPink,
                      fontFamily: "pretendard500",
                    }}
                  >
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: subColorPink,
                      fontFamily: "pretendard500",
                    }}
                  >
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          ) : (
            <View
              style={{
                width: "75%",
                alignItems: "center",
                backgroundColor: subColorBlack2,
                paddingTop: 20,
                borderRadius: 10,
                borderColor: "white",
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "pretendard500",
                  marginBottom: 20,
                }}
              >
                변경할 MBTI를 선택해줘
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <MbtiComponent
                  mbti={mbti}
                  setMbti={setMbti}
                  letters={["E", "S", "T", "P"]}
                />
              </View>
              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <MbtiComponent
                  mbti={mbti}
                  setMbti={setMbti}
                  letters={["I", "N", "F", "J"]}
                />
              </View>
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
                  // alignSelf: "flex-start",
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
              <View
                style={{
                  width: "100%",
                  paddingVertical: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={hideModal}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: subColorPink,
                      fontFamily: "pretendard500",
                    }}
                  >
                    취소
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={handleMbtiSubmit}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: subColorPink,
                      fontFamily: "pretendard500",
                    }}
                  >
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    height: 120,
    borderRadius: 65,
    backgroundColor: subColorBlack2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 0.5,
  },
  imageText: {
    color: "white",
    lineHeight: 20,
    fontFamily: "pretendard400",
  },
  labelText: {
    color: "#8F8F8F",
    fontFamily: "pretendard500",
    fontSize: 16,
    letterSpacing: -0.5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  infoContainer: {
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  infoText: {
    fontSize: 17,
    fontFamily: "pretendard600",
    // color: "white",
    color: subColorPink,
  },
  infoText2: {
    fontSize: 17,
    fontFamily: "pretendard600",
    color: "white",
    marginRight: 5,
  },
  grayText: {
    color: "#9C9C9C",
    fontSize: 16,
    fontFamily: "pretendard500",
  },
});

export default MyAccountScreen;
