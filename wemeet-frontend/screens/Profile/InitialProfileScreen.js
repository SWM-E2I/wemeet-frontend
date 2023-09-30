import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Linking,
  Touchable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../../redux/profileSlice";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
  subColorBlack2,
} from "../../styles/commonStyles";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { myProfileInquiryApi } from "../../api/myProfile";
import { creditInquiryApi } from "../../api/signal";
import { setSignal } from "../../redux/signalSlice";
const InitialProfileScreen = ({ navigation }) => {
  // const [profileData, setProfileData] = useState(defaultProfileData); //리스트 형태
  const controller = new AbortController();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);
  const update = useSelector((state) => state.profile.update);
  const emailAuthenticated = useSelector(
    (state) => state.persist.emailAuthenticated
  );
  const signal = useSelector((state) => state.signal.signal);
  const onMoveToAgreement = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-ad22cdd1adb74bee8a6283c9cf8cf405"
    ).catch((err) =>
      console.error(
        "TermsModalScreen : An error occurred while opening browswer",
        err
      )
    );
  };
  const onMoveToPrivacy = () => {
    Linking.openURL(
      "https://hungry-galette-a76.notion.site/We-meet-f842efb5bda44d59ba846be0f12f586d"
    ).catch((err) =>
      console.error(
        "TermsModalScreen : An error occurred while opening browswer",
        err
      )
    );
  };
  const setPhoto = () => {
    navigation.navigate("PhotoSet", {
      toProfile: true,
    });
  };
  const onMount = async () => {
    let result = await myProfileInquiryApi(navigation, controller);
    if (result == "LOGOUT") {
      return false;
    } else if (result) dispatch(setProfileData(result));
    let res = await creditInquiryApi(navigation, controller);
    if (res) {
      dispatch(setSignal(res));
    }
  };
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태를 나타내는 상태 변수
  // 새로고침 작업을 수행하는 함수
  const onRefresh = async () => {
    // 이 예제에서는 간단히 2초 후에 새로고침을 완료하는 것으로 가정합니다.
    setRefreshing(true);
    await onMount();
    setRefreshing(false);
  };
  useEffect(() => {
    console.log("ProfileScreen updated/mounted");
    onMount();
  }, [update]);
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
        contentContainerStyle={{
          alignItems: "center",
        }}
        refreshControl={
          // RefreshControl을 ScrollView에 추가
          <RefreshControl
            refreshing={refreshing} // 새로고침 중일 때 true, 아닐 때 false
            onRefresh={onRefresh} // 당겨서 새로고침 작업을 수행하는 함수
            progressViewOffset={30} // 로딩 바가 어느 위치에서 시작할지 설정
            colors={["white"]} // 로딩 바의 색상 설정
            tintColor={"white"} // 로딩 바의 색상 설정
            title={"새로고침 중..."}
            titleColor={"white"}
          />
        }
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
            {profileData?.mbti == "XXXX" ? "" : profileData?.mbti}
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
                {emailAuthenticated ? "대학 인증 완료" : "대학 인증 미완료"}
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
            {signal}
          </Text>
          {/* <TouchableOpacity
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
              무료로 충전하기
            </Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingTop: 20,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("MyAccount");
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
        {!emailAuthenticated && (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.navigate("UnivMail", { toProfile: true });
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "pretendard600",
                color: "white",
              }}
            >
              대학 인증하기
            </Text>
            <Ionicons name="chevron-forward-sharp" size={24} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Guide");
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "pretendard600",
              color: "white",
            }}
          >
            위밋 가이드
          </Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 10, left: 20 }}>
        <TouchableOpacity
          style={{
            // paddingVertical: 10,
            paddingTop: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={onMoveToPrivacy}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "pretendard600",
              color: "#C9C9C9",
            }}
          >
            개인정보 처리방침
          </Text>
          {/* <Ionicons name="chevron-forward-sharp" size={20} color="white" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={onMoveToAgreement}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "pretendard600",
              color: "white",
              color: "#C9C9C9",
            }}
          >
            이용약관
          </Text>
          {/* <Ionicons name="chevron-forward-sharp" size={20} color="white" /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  verifiedLabel: {
    width: 90,
    height: 24,
    borderRadius: 3,
    backgroundColor: subColorPink,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    aspectRatio: 1,
    height: 120,
    borderRadius: 65,
    backgroundColor: subColorBlack2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 0.5,
    // backgroundColor: "yellow",
  },
  imageText: {
    color: "white",
    lineHeight: 20,
    fontFamily: "pretendard400",
  },
});

export default InitialProfileScreen;
