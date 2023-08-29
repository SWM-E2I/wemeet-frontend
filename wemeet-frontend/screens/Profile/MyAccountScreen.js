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

const MyAccountScreen = ({ navigation, route }) => {
  const profileData = route.params.profileData;
  const setPhoto = () => {
    navigation.navigate("PhotoSet", { toProfile: true });
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
              <Text style={styles.imageText}>사진을 등록해줘!</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={setPhoto}
          >
            <MaterialIcons name="photo" size={30} color={"white"} />
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

    // backgroundColor: "yellow",
  },
  imageText: {
    color: "white",
    lineHeight: 20,
    fontFamily: "pretendard400",
  },
});

export default MyAccountScreen;
