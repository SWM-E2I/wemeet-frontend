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

const photos = [
  {
    id: "1",
    uri: "https://newsimg.sedaily.com/2023/07/26/29SA59WGN7_1.jpg",
  },
  {
    id: "2",
    uri: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202208/05/newsen/20220805090353732jwuh.jpg",
  },

  {
    id: "3",
    uri: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/28/newsen/20230428124427010wmwd.jpg",
  },
  {
    id: "4",
    uri: "https://image.newsis.com/2022/01/23/NISI20220123_0000918934_web.jpg",
  },
  {
    id: "5",
    uri: "https://m.aando.co.kr/web/product/big/202307/01389d9c2eda69fca38e9b480d0f3ff5.jpg",
  },
  {
    id: "6",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JSRii_41Xvrc6OL8oQiC0bStzp1HwbNHfA&usqp=CAU",
  },
];
const renderItem = ({ item, index }) => {
  return (
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
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
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
              "https://img.seoul.co.kr/img/upload/2022/05/20/SSI_20220520005619_O2.jpg"
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
