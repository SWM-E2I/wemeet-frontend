import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import commonStyles, {
  mainColor,
  subColorPink,
} from "../../styles/commonStyles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const InitialProfileScreen = ({ navigation }) => {
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
        <Image
          source={{ uri: "https://pbs.twimg.com/media/E9P1sh3VIAcFKCg.jpg" }}
          style={{
            marginVertical: 40,
            aspectRatio: 1,
            width: 140,
            borderRadius: 70,
          }} //borderRadius : width/2
        />
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
            유진씨
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
            ESFP
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
                fontSize: 14,
                color: "white",
                fontFamily: "pretendard600",
              }}
            >
              째리미추워 / ENFJ
            </Text>
            <View style={styles.verifiedLabel}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "pretendard600",
                  color: "white",
                }}
              >
                대학 인증 완료
              </Text>
            </View>
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
            고려대학교 (서울)
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
            25
          </Text>
          <View
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
          </View>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
        <TouchableOpacity
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
            시그널 스토어
          </Text>
          <Ionicons name="chevron-forward-sharp" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
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
});
export default InitialProfileScreen;
