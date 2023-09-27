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
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorBlack,
  subColorPink,
} from "../../styles/commonStyles";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setImages } from "../../redux/teamGenerateSlice";

const TeamPhotoScreen = ({ navigation }) => {
  dispatch = useDispatch();
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [mainPhoto, setMainPhoto] = useState(null); // uri
  const [addPhoto, setAddPhoto] = useState([{ end: true }]); // true or false
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const flatListRef = useRef(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const scrollToRight = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  useEffect(() => {
    if (mainPhoto)
      setTimeout(() => {
        scrollToBottom();
      }, 100);
  }, [mainPhoto]);
  const onNext = () => {
    if (!mainPhoto) {
      Alert.alert("대표 사진 1장은 필수로 등록해줘!");
      return;
    }
    dispatch(setImages([mainPhoto, ...addPhoto.slice(0, addPhoto.length - 1)]));
    navigation.navigate("Region");
  };
  console.log([mainPhoto, ...addPhoto.slice(0, addPhoto.length - 1)]);
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
      if (addPhoto.length + result.assets.length - 1 > 5)
        //다섯장이상일경우
        Alert.alert("추가 사진은\n최대 5장까지야!");
      setAddPhoto([
        ...[...addPhoto.slice(0, addPhoto.length - 1), ...result.assets].slice(
          0,
          5
        ),
        { end: true },
      ]);
    } else console.log("사진을 선택하지 않음");
    setLoading(false);
    setTimeout(() => {
      scrollToBottom();
      scrollToRight();
    }, 100);
  };
  const onDelete = (indexToRemove) => {
    setAddPhoto(
      addPhoto.slice(0, indexToRemove).concat(addPhoto.slice(indexToRemove + 1))
    );
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
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              commonStyles.teamGenerateInstruction,
              { color: subColorPink, paddingTop: 0 },
            ]}
          >
            {"팀 사진"}
          </Text>
          <Text
            style={[commonStyles.teamGenerateInstruction, { paddingTop: 0 }]}
          >
            {"을 등록해줘"}
          </Text>
        </View>
        <Text style={commonStyles.teamGenerateInstruction2}>
          {
            "팀의 분위기를 잘 나타낼 수 있는 사진을 등록해줘\n아래로 스크롤하면 추가 사진을 등록할 수 있어!\n(최소 1장, 최대 6장)"
          }
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 20,
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
              style={[
                styles.mainPhotoContainer,
                { width: "100%", backgroundColor: "black" },
              ]}
              source={{ uri: mainPhoto.uri }}
              resizeMode={"contain"}
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
          <FlatList
            ref={flatListRef}
            style={{ paddingTop: 10 }}
            data={addPhoto}
            horizontal
            renderItem={({ item, index }) =>
              item.uri ? (
                <View style={styles.addPhotoContainer}>
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={{ uri: item.uri }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: -8, right: -8 }}
                    onPress={() => {
                      onDelete(index);
                    }}
                  >
                    <MaterialIcons name="cancel" size={24} color={"white"} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPhotoContainer}
                  onPress={() => {
                    pickAddPhotoAsync();
                  }}
                >
                  {addPhoto.length == 1 ? (
                    <FontAwesome5 name="camera" size={20} color="white" />
                  ) : (
                    <Ionicons name="ios-add-sharp" size={25} color="white" />
                  )}
                  <Text style={{ color: "white", fontSize: 12, marginTop: 7 }}>
                    사진 추가
                  </Text>
                </TouchableOpacity>
              )
            }
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
    width: "95%",
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
