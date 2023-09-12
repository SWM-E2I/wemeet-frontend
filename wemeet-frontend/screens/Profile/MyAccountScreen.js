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
} from "react-native";
import React, { useEffect } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack2,
  subColorBlack,
} from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import { S3_PROFILE_BASE_URL } from "../../api/axios";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { accountDeleteApi, logoutApi } from "../../api/myProfile";
import { CommonActions } from "@react-navigation/native";

const MyAccountScreen = ({ navigation }) => {
  const profileData = useSelector((state) => state.profile.profileData);
  const controller = new AbortController();
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
            {/* <TouchableOpacity>
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color={subColorPink}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>MBTI</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.infoText2, { marginRight: 5 }]}>
              {profileData.mbti}
            </Text>
            <TouchableOpacity>
              {/* <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color={subColorPink}
              /> */}
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
            <Text style={styles.infoText}>로그 아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoContainer}
            onPress={onDeleteAccount}
          >
            <Text style={styles.infoText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    color: "white",
    // color: subColorPink,
  },
  infoText2: {
    fontSize: 17,
    fontFamily: "pretendard600",
    color: "white",
    marginRight: 5,
  },
});

export default MyAccountScreen;
