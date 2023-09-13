import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import commonStyles, {
  mainColor,
  subColorBlack,
  subColorPink,
} from "../../styles/commonStyles";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setImages } from "../../redux/teamGenerateSlice";

const TeamPhotoScreen = ({ navigation }) => {
  dispatch = useDispatch();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [mainPhoto, setMainPhoto] = useState(null); // uri
  const [addPhoto, setAddPhoto] = useState([]); // true or false
  const [loading, setLoading] = useState(false);
  const onNext = () => {
    if (!mainPhoto) {
      Alert.alert("대표 사진 1장은 필수로 등록해줘!");
      return;
    }
    dispatch(setImages([mainPhoto, ...addPhoto]));
    navigation.navigate("Region");
  };
  const onMount = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "사진 라이브러리 접근이 거부됨",
          "설정>we-meet에서 사진 권한을 설정해주세요."
        );
        return null;
      }
    }
  };
  const pickMainPhotoAsync = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "사진 라이브러리 접근이 거부됨",
          "설정>we-meet에서 사진 권한을 설정해주세요."
        );
        return null;
      }
    }
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      //option finetune필요
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      console.log(result.assets[0]);
      setMainPhoto(result.assets[0]);
    } else console.log("사진을 선택하지 않음");
    setLoading(false);
  };
  const pickAddPhotoAsync = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          "사진 라이브러리 접근이 거부됨",
          "설정>we-meet에서 사진 권한을 설정해주세요."
        );
        return null;
      }
    }
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      //finetune필요
      quality: 1,
      aspect: [1, 1],
      allowsMultipleSelection: true,
      orderedSelection: true, //only for iOS
      selectionLimit: 5, //최대 5장까지만 선택가능하다고 알려주기
    });
    if (!result.canceled) {
      console.log(result.assets);
      setAddPhoto(result.assets);
    } else console.log("사진을 선택하지 않음");
    setLoading(false);
  };
  useEffect(() => {
    onMount();
  }, []);
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <TouchableOpacity
        style={{ paddingTop: 10, paddingBottom: 15, paddingHorizontal: "5%" }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Text style={[commonStyles.teamGenerateInstruction]}>
          팀 사진을 등록해줘
        </Text>
        <Text style={commonStyles.teamGenerateInstruction2}>
          {
            "팀의 분위기를 잘 나타낼 수 있는 사진을 등록해줘\n(최소 1장, 최대 6장)"
          }
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 30,
          }}
        >
          <AntDesign name="warning" size={18} color={subColorPink} />
          <Text
            style={[
              commonStyles.teamGenerateInstruction2,
              {
                color: subColorPink,
                fontSize: 13,
                marginLeft: 4,
              },
            ]}
          >
            부적절한 사진을 올리면 위밋 활동을 할 수 없으니 주의해줘
          </Text>
        </View>
        <TouchableOpacity
          style={styles.mainPhotoContainer}
          onPress={() => {
            pickMainPhotoAsync();
          }}
        >
          {mainPhoto ? (
            <Image
              style={styles.mainPhotoContainer}
              source={{ uri: mainPhoto.uri }}
            />
          ) : (
            <Ionicons name="ios-add-sharp" size={50} color="white" />
          )}
        </TouchableOpacity>
        <Text
          style={[
            commonStyles.teamGenerateInstruction2,
            { textAlign: "center", paddingVertical: 5 },
          ]}
        >
          대표 사진
        </Text>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.addPhotoContainer}
            onPress={() => {
              pickAddPhotoAsync();
            }}
          >
            <FontAwesome5 name="camera" size={20} color="white" />
            <Text style={{ color: "white", fontSize: 12, marginTop: 7 }}>
              사진 추가
            </Text>
          </TouchableOpacity>
          <FlatList
            data={addPhoto}
            horizontal
            renderItem={({ item }) => (
              <Image
                style={styles.addPhotoContainer}
                source={{ uri: item.uri }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      {/* 버튼 */}
      <TouchableOpacity
        style={[
          commonStyles.buttonContainer,
          { backgroundColor: loading ? "#9C9C9C" : subColorPink },
        ]}
        onPress={onNext}
        disabled={loading}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "pretendard600",
          }}
        >
          {loading ? "사진 업로드 중" : "다음"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, paddingHorizontal: "6%" },

  mainPhotoContainer: {
    width: "100%",
    alignSelf: "center",
    aspectRatio: 1,
    backgroundColor: subColorBlack,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addPhotoContainer: {
    width: 80,
    height: 80,
    backgroundColor: subColorBlack,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 20,
  },
});

export default TeamPhotoScreen;
