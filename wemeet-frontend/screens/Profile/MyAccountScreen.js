import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack2,
} from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import { S3_PROFILE_BASE_URL } from "../../api/axios";
import { Ionicons } from "@expo/vector-icons";

const MyAccountScreen = ({ navigation, route }) => {
  const profileData = route.params.profileData;
  console.log(route.params.profileData);
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
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{ position: "absolute", top: 20, left: 0 }}
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
        {profileData?.profileImage.basicUrl ? (
          <Image
            source={{
              uri: profileData?.profileImage.basicUrl,
            }}
            style={styles.imageContainer} //borderRadius : width/2
          />
        ) : (
          <View style={styles.imageContainer}>
            <Text style={styles.imageText}>사진을 등록해줘!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default MyAccountScreen;
