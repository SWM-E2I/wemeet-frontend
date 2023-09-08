import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
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
    uri: "https://postfiles.pstatic.net/MjAyMzA4MjRfNDYg/MDAxNjkyODA1ODg3ODk0.n6cRg9v9h7Ho_9iwpRsafMVa4Y5rHKjcGvEL9ocZ7oMg.V1YeJJzuqhWilgO0QTsUD8mnfltP40DfJ_MerQUpQ-kg.PNG.seyun1052/IMG_1753.png?type=w966",
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
const ArrivedDetailScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const onAcceptPress = () => {
    navigation.navigate("MatchDoneModal");
  };
  return (
    <View style={{ backgroundColor: mainColor, flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        //bounces={false} //FOR IOS
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
            maxPage={photos.length}
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
                fontFamily: "pretendard600",
                color: "white",
              }}
            >
              {/*지역 */}
              홍대
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="person" size={30} color={"white"} />
              <Text
                style={{
                  marginLeft: 3,
                  fontSize: 30,
                  color: "white",
                  fontFamily: "pretendard400",
                }}
              >
                {3}
                {/*인원 수 들어가기*/}
              </Text>
            </View>
          </View>
          <LeaderCard
            nickName={"유닝"}
            mbti={"ESTJ"}
            college={"고려대학교"}
            profile={
              "https://postfiles.pstatic.net/MjAyMzA4MjRfMTAy/MDAxNjkyODA1ODg3NDk2.trjsam7Hy1G1DS3RZ_4FjLjeMeoKYyPH9eYsQLbzE7Yg.nFBvUSGPnhqr-MULctotoZOQRPasKxk6bFVgFSXj9Hog.PNG.seyun1052/IMG_9022.png?type=w966"
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
          style={{
            width: "48%",
            height: "100%",
            backgroundColor: subColorBlack,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "pretendard600",
            }}
          >
            거절
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "48%",
            height: "100%",
            backgroundColor: subColorPink,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 5,
          }}
          onPress={onAcceptPress}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "pretendard600",
            }}
          >
            수락
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={22}
              color={"rgba(255, 255, 255, 0.50)"}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.50)",
                fontSize: 17,
                fontFamily: "pretendard600",
              }}
            >
              4
            </Text>
            {/* 임시 시그널수 */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArrivedDetailScreen;
