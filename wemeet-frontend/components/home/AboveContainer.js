import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

import React, { useState, useRef, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorBlue,
  subColorPink,
} from "../../styles/commonStyles";
// import { getStatusBarHeight } from "react-native-status-bar-height";
import Logo from "../../assets/vectors/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSignal } from "../../redux/signalSlice";
import { creditInquiryApi } from "../../api/signal";
import { FontAwesome5, Ionicons, FontAwesome } from "@expo/vector-icons";

const formatTime = (value) => {
  return value < 10 ? `0${value}` : value.toString();
};

const WIDTH = Dimensions.get("window").width;
const BANNER_WIDTH = WIDTH * 0.88;
const bannerData = [
  // id -> string
  // 최소 3개 이상 배너가 필요 -> 자연스러움
  {
    id: "1",
    // source: "../../assets/banners/banner1.png",
    onPress: () => {},
  },
  {
    id: "2",
    // source: "../../assets/banners/banner2.png",
    onPress: () => {
      Linking.openURL("http://pf.kakao.com/_WshlG").catch((err) =>
        console.error(
          "AboveContainer : An error occurred while opening browswer",
          err
        )
      );
    },
  },
  {
    id: "3",
    // source: "../../assets/banners/banner3.png",
    onPress: () => {
      Linking.openURL("https://www.instagram.com/wemeet__official/").catch(
        (err) =>
          console.error(
            "AboveContainer : An error occurred while opening browswer",
            err
          )
      );
    },
  },
];
const renderItem = ({ item, index }) => {
  switch (index + 1) {
    case 1:
      return (
        <TouchableOpacity
          style={{
            width: BANNER_WIDTH,
            height: "100%",
            backgroundColor: subColorBlack,
            alignItems: "flex-end",
          }}
          key={index}
          disabled={true}
        >
          <Image
            key={index}
            source={require("../../assets/banners/banner1.png")}
            style={{ width: BANNER_WIDTH - 1, height: "100%" }}
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
        </TouchableOpacity>
      );
      break;
    case 2:
      return (
        <TouchableOpacity
          style={{
            width: BANNER_WIDTH,
            height: "100%",
            backgroundColor: subColorBlack,
            alignItems: "flex-end",
          }}
          key={index}
          onPress={item.onPress}
        >
          <Image
            key={index}
            source={require("../../assets/banners/banner2.png")}
            style={{ width: BANNER_WIDTH - 1, height: "100%" }}
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
        </TouchableOpacity>
      );
      break;
    case 3:
      return (
        <TouchableOpacity
          style={{
            width: BANNER_WIDTH,
            height: "100%",
            backgroundColor: subColorBlack,
            alignItems: "flex-end",
          }}
          key={index}
          onPress={item.onPress}
        >
          <Image
            key={index}
            source={require("../../assets/banners/banner3.png")}
            style={{ width: BANNER_WIDTH - 1, height: "100%" }}
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
        </TouchableOpacity>
      );
      break;
  }
  return item.text ? (
    <View
      key={index}
      style={{
        paddingHorizontal: 20,
        width: BANNER_WIDTH,
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
    <></>
  );
};
const swiperHeightPercentage = 0.7;

const AboveContainer = ({
  navigation,
  timeUntilActivation,
  activateButton,
  onPress,
}) => {
  // console.log(timeUntilActivation); //잘 동작함
  const dispatch = useDispatch();
  const controller = new AbortController();
  const signal = useSelector((state) => state.signal.signal);
  const flatlistRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const getItemLayout = (data, index) => ({
    length: BANNER_WIDTH, //padding 값 제외
    offset: BANNER_WIDTH * index,
    index: index,
  });
  const onMount = async () => {
    let res = await creditInquiryApi(navigation, controller);
    if (res) {
      dispatch(setSignal(res));
    }
  };
  useEffect(() => {
    onMount();
    return () => controller.abort();
  }, []);
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
            {signal}
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.guidance}>
          <Text style={[styles.guidanceText, { lineHeight: 33 }]}>
            {"오늘의 친구들을\n만나봐!"}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 0,
          }}
        >
          <FontAwesome name="question-circle-o" size={20} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: subColorPink,
            // backgroundColor: subColorPink,
            backgroundColor: subColorBlack2,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 8,
          }}
          disabled={!activateButton}
          onPress={onPress}
        >
          {/* <AntDesign name="clockcircleo" size={16} color="white" /> */}
          {!activateButton ? (
            <>
              <FontAwesome5 name="clock" size={14} color="white" />

              <Text
                style={{
                  marginLeft: 5,
                  // color: "white",
                  color: subColorPink,
                  fontFamily: "pretendard500",
                  fontSize: 14,
                  textAlignVertical: "center",
                  // marginBottom: 2, //왜 해야대지..
                }}
              >
                {`${formatTime(
                  Math.floor(timeUntilActivation / 3600)
                )}:${formatTime(
                  Math.floor((timeUntilActivation % 3600) / 60)
                )}:${formatTime((timeUntilActivation % 3600) % 60)}`}
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="ios-refresh" size={17} color={"white"} />
              <Text
                style={{
                  // marginLeft: 5,
                  color: "white",
                  // color: subColorPink,
                  fontFamily: "pretendard500",
                  fontSize: 14,
                  textAlignVertical: "center",
                  // marginBottom: 2, //왜 해야대지..
                }}
              >
                새로고침
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1 - swiperHeightPercentage,
    // paddingTop:  Platform.OS == "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight,
    paddingHorizontal: "6%",
    // justifyContent: "space-between",
    justifyContent: "space-around",
    // justifyContent: "flex-start",
    backgroundColor: subColorBlack,
    // backgroundColor: mainColor,
  },
  logoContainer: {
    // flex: 0.2,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "black",
  },
  banner: {
    marginTop: 10,
    // flex: 0.35,
    height: (70 * BANNER_WIDTH) / 345,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    overflow: "hidden",
  },
  guidance: {
    // flex: 0.45,
    // backgroundColor: subColorBlue,
    // width: "100%",
    // justifyContent: "center",
    justifyContent: "center",
  },
  guidanceText: {
    color: "white",
    fontFamily: "pretendard700",
    fontSize: 24,
  },
});

export default AboveContainer;
