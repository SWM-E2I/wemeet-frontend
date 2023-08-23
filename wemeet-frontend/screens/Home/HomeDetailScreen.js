import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
} from "../../styles/commonStyles";
import PaginationDot from "react-native-animated-pagination-dot";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import LeaderCard from "../../components/home/LeaderCard";
import InfoSection from "../../components/home/InfoSection";
import { LinearGradient } from "expo-linear-gradient";

const photos = [
  {
    id: "1",
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfMjM4/MDAxNjkyODA1ODg3NTQ5.PqXNvO5KUEgiYjGI9TschHjveyNd9ImUkSU3NqWdutYg.uLAjaTeCXV8FsH92H0uToM6l4qWZbjgMo3VnEe_0oFog.PNG.seyun1052/IMG_0436_1.png?type=w966",
  },
  {
    id: "2",
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfMjE1/MDAxNjkyODA1ODg3MjE3.UXElZj6UgRVXF21yLPHJ-XAz-vveNyOeW8F_kiM2rW0g.pWtg3NK1C28Bn54qCNFT1PLKjK1tQa_wqNhxcZjtyBog.PNG.seyun1052/IMG_6833_1.png?type=w966",
  },
  {
    id: "3",
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfMzIg/MDAxNjkyODA1ODg3MTQ4.c4Li2zQ_F_ud7tO35SFd0s8G5_-8by0RbKeuy-0ghmcg.buhP6fJn15m0tI4TfvKAj07A8yxgXl3irZrMDvGjZCsg.PNG.seyun1052/IMG_5176_1_(1).png?type=w966",
  },
  {
    id: "4",
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfNjYg/MDAxNjkyODA1ODg3NTM0.m23CZxkvpg-wOxYbO5uZ_k4io8f_qBPErybf_lMRFhAg.Xnxc5Bsptqd1LFi8a5eUnzaN4_WimNnkhbUbZ91sp4Yg.PNG.seyun1052/image_47.png?type=w966",
  },
  {
    id: "5",
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfMjM4/MDAxNjkyODA1ODg3NTkz.H-Xmg_BQzsgBadITXt0E7pc9AEyOERWW0ERII6XrnaEg.Vn8XzaIBpHY38-oVLDwZVy8bRAJxbPPGtgIlhXLn-OYg.PNG.seyun1052/image_71.png?type=w966",
  },
];

const renderItem = ({ item, index }) => {
  return (
    <View>
      <Image
        key={index}
        source={{
          uri: item.uri,
        }}
        style={{
          aspectRatio: 1,
          width: Dimensions.get("window").width,
          backgroundColor: "transparent",
        }}
        resizeMode={"cover"}
      />
      <LinearGradient
        colors={["rgba(14,15,19,0.6)", "rgba(20, 21, 25, 0.00)"]}
        start={[0, 0]}
        end={[0, 0.5]}
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          top: 0,
        }}
      />
    </View>
  );
};

const getItemLayout = (data, index) => ({
  length: Dimensions.get("window").width,
  offset: Dimensions.get("window").width * index,
  index: index,
});
const HomeDetailScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLike, setIsLike] = useState(false); //임시
  const flatlistRef = useRef();
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const [requested, setRequested] = useState(false); //임시, redux로 전역으로 들고있어야함!!(각 카드 별로!!)
  const onRequestPress = () => {
    navigation.navigate("RequestModal");
    setTimeout(() => {
      setRequested(true);
    }, 2000);
  };
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <ScrollView
        style={{ flex: 1 }}
        // bounces={false} //FOR IOS
        //overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          //0. 끝에서도 스크롤되는문제
          ref={flatlistRef}
          data={photos}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          scrollToOverflowEnabled={false}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          bounces={false} //FOR IOS
          overScrollMode={"never"} //FOR ANDROID
        />

        <View
          style={{
            position: "absolute",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 7,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //불량 유저 신고 -> 미구현
              Alert.alert("불량 유저 신고", "관리자 검토 후 회신드리겠습니다.");
            }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={26}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <PaginationDot
            activeDotColor={"#FC8368"}
            curPage={activeIndex}
            maxPage={5}
            sizeRatio={1}
            style={{ width: 200 }}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "white",
              }}
            >
              {/*지역 */}
              건대입구
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="person" size={30} color={"white"} />
              <Text style={{ marginLeft: 3, fontSize: 30, color: "white" }}>
                {4}
                {/*인원 수 들어가기*/}
              </Text>
            </View>
          </View>
          <LeaderCard
            nickName={"욤요미"}
            mbti={"ISTP"}
            college={"단국대학교(죽전)"}
            profile={
              "https://postfiles.pstatic.net/MjAyMzA4MjRfMTI3/MDAxNjkyODA1ODg3OTc5.PjV31MP1DYvmXaGEOoAxfbMGf18ZyuvO00ueqxJMzIgg.pzQdB2a0C6BjmnbTRoIfesmcSkpZdzY-AhmA1tKqnXQg.PNG.seyun1052/image_74.png?type=w966"
            }
          />
          <InfoSection />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 70,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: mainColor,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsLike(!isLike);
          }}
          style={{ marginRight: 20 }}
        >
          {isLike ? (
            <Ionicons name="ios-heart-sharp" size={30} color={subColorPink} />
          ) : (
            <Ionicons name="ios-heart-outline" size={30} color={subColorPink} />
          )}
        </TouchableOpacity>
        {!requested ? (
          <TouchableOpacity
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: subColorPink,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={onRequestPress}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "pretendard600",
              }}
            >
              신청하기
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: "pretendard600",
              }}
            >
              신청완료
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default HomeDetailScreen;
