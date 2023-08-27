import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlue,
  subColorPink,
} from "../../styles/commonStyles";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Logo from "../../assets/vectors/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const bannerData = [
  //id -> string
  //최소 3개 이상 배너가 필요 -> 자연스러움
  {
    id: "1",
    text: "매일 밤 11:11분\n새로운 친구들을 만나봐!",
  },
  {
    id: "2",
    text: "좋아요는 오늘 한번만!\n하트로 상대팀에게 우리를 알려봐!",
  },
  {
    //임시 - 광고 배너 예시
    id: "3",
    uri: "https://blog.rocketpunch.com/wp-content/uploads/2020/04/%EA%B8%B0%EC%97%85%EA%B4%91%EA%B3%A0%EB%B0%B0%EB%84%88-scaled.jpg",
  },
];

const renderItem = ({ item, index }) => {
  return item.text ? (
    <View
      key={index}
      style={{
        paddingHorizontal: 20,
        width: WIDTH * 0.88,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontFamily: "pretendard500",
          letterSpacing: -0.47,
          lineHeight: 23.4,
        }}
      >
        {item.text}
      </Text>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 35,
          height: 22,
          borderTopLeftRadius: 4,
          backgroundColor: "rgba(19, 19, 19, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 10,
          }}
        >
          {index + 1}/{bannerData.length}
        </Text>
      </View>
    </View>
  ) : (
    <View style={{ width: WIDTH * 0.88, height: "100%" }}>
      <Image
        key={index}
        source={{ uri: item.uri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode={"cover"}
      ></Image>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 35,
          height: 22,
          borderTopLeftRadius: 4,
          backgroundColor: "rgba(19, 19, 19, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 10,
          }}
        >
          {index + 1}/{bannerData.length}
        </Text>
      </View>
    </View>
  );
};
const swiperHeightPercentage = 0.7;

const AboveContainer = () => {
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const getItemLayout = (data, index) => ({
    length: WIDTH * 0.88, //padding 값 제외
    offset: WIDTH * 0.88 * index,
    index: index,
  });

  useEffect(() => {
    if (activeIndex === null) return;
    let interval = setInterval(() => {
      if (activeIndex === bannerData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
        setActiveIndex(0);
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
        setActiveIndex(activeIndex + 1);
      }
    }, 5000);
    // console.log("activeIndex :", activeIndex);
    //activeIndex가 계속 살아있음 -> tab navigator의 문제
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      setActiveIndex(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={90} height={20} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={24}
            color={subColorPink}
          />
          <Text
            style={{ fontSize: 15, color: subColorPink, fontWeight: "bold" }}
          >
            25
          </Text>
          {/* 임시 시그널수 */}
        </View>
      </View>
      <View style={styles.banner}>
        <FlatList
          //1. auto scroll animation -> duration & 계속 오른쪽으로 scroll하고 싶은데..
          //2. activeIndex가 unmount후에도 계속 작동하는거 해결
          //0. 왼쪽 오른쪽끝에서도 스크롤되는문제
          ref={flatlistRef}
          data={bannerData}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          // scrollToOverflowEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          bounces={false} //FOR IOS
          overScrollMode={"never"} //FOR ANDROID
        />
      </View>

      <View style={styles.guidance}>
        <Text style={[styles.guidanceText, { marginBottom: 4 }]}>
          오늘의 친구들을
        </Text>
        <Text style={styles.guidanceText}>만나봐!</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1 - swiperHeightPercentage,
    paddingTop:
      Platform.OS == "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight,
    paddingHorizontal: "6%",
    // backgroundColor: mainColor,
    backgroundColor: subColorBlack,
  },
  logoContainer: {
    flex: 0.2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  banner: {
    marginTop: 10,
    flex: 0.35,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    overflow: "hidden",
  },
  guidance: {
    flex: 0.45,
    // backgroundColor: subColorBlue,
    width: "100%",
    justifyContent: "center",
  },
  guidanceText: {
    color: "white",
    fontFamily: "pretendard700",
    fontSize: 24,
  },
});

export default AboveContainer;
