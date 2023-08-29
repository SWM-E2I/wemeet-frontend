import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
  subColorBlack2,
} from "../../styles/commonStyles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { myProfileInquiryApi } from "../../api/myProfile";
import { S3_PROFILE_BASE_URL } from "../../api/axios";

const defaultProfileData = {
  profileImage: {
    basicUrl: null,
    lowUrl: null,
  },
  nickname: "-",
  admissionYear: "-",
  college: "-",
  collegeType: "-",
  gender: "WOMAN",
  mbti: "-",
};
const InitialProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(defaultProfileData); //리스트 형태
  const controller = new AbortController();
  const emailAuthenticated = useSelector(
    (state) => state.persist.emailAuthenticated
  );
  const onMount = async () => {
    let result = await myProfileInquiryApi(navigation, controller);
    if (result) {
      setProfileData(result);
    }
  };
  useEffect(() => {
    onMount();
  }, []);
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
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontFamily: "pretendard600",
            color: "white",
          }}
        >
          마이페이지
        </Text>
        {profileData?.profileImage.basicUrl ? (
          <Image
            source={{
              uri: profileData?.profileImage.basicUrl,
            }}
            style={styles.imageContainer} //borderRadius : width/2
          />
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate("PhotoSet", { toProfile: true });
            }}
          >
            <Text style={styles.imageText}>사진을 등록해줘!</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "pretendard600",
              color: "white",
            }}
          >
            {profileData?.nickname}
          </Text>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 18,
              fontFamily: "pretendard500",
              color: "#7A7A7A",
              //왜 밑에 정렬안되는지?
            }}
          >
            {profileData?.mbti}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            padding: 10,
            height: 80,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#2E2E32",
            backgroundColor: "rgba(46,46,50,0.24)",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontSize: 15,
                color: "white",
                fontFamily: "pretendard600",
              }}
            >
              {profileData?.college}
            </Text>
            <TouchableOpacity
              style={[
                styles.verifiedLabel,
                {
                  backgroundColor: emailAuthenticated
                    ? subColorPink
                    : "#7A7A7A",
                },
              ]}
              onPress={() => {
                navigation.navigate("UnivMail", { toProfile: true });
              }}
              disabled={emailAuthenticated}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                {emailAuthenticated ? "대학 인증 완료" : "대학 인증 필요"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 14,
              color: "white",
              fontFamily: "pretendard400",
              marginBottom: 5,
            }}
          >
            {`${profileData?.collegeType}  ${profileData?.admissionYear}학번`}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#2E2E32",
            backgroundColor: "rgba(46,46,50,0.24)",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              fontSize: 14,
              color: "white",
              fontFamily: "pretendard600",
              marginRight: 5,
            }}
          >
            마이 시그널
          </Text>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={20}
            color={subColorPink}
          />
          <Text
            style={{
              fontSize: 14,
              color: subColorPink,
              fontFamily: "pretendard600",
            }}
          >
            -
          </Text>
          {/* <View
            style={{
              marginLeft: 15,
              borderColor: subColorPink,
              borderWidth: 0.5,
              paddingHorizontal: 7,
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: subColorPink,
                fontFamily: "pretendard600",
              }}
            >
              충전하기
            </Text>
          </View> */}
        </View>
        {/* <TouchableOpacity
          style={{
            paddingVertical: 20,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "pretendard600",
              color: "white",
            }}
          >
            내 프로필 미리보기
          </Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            paddingVertical: 20,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={() => {
            Alert.alert("준비중이야!");
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "pretendard600",
              color: "white",
            }}
          >
            시그널 스토어
          </Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("MyAccount", {
              profileData: profileData,
            });
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "pretendard600",
              color: "white",
            }}
          >
            계정 관리
          </Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  verifiedLabel: {
    width: 85,
    height: 22,
    borderRadius: 3,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginVertical: 30,
    aspectRatio: 1,
    height: 130,
    borderRadius: 65,
    backgroundColor: subColorBlack2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  imageText: {
    color: "white",
    lineHeight: 20,
    fontFamily: "pretendard400",
  },
});

export default InitialProfileScreen;
