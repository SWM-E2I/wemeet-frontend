import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../styles/commonStyles";
import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

// import PaginationDot from "react-native-animated-pagination-dot";

const getItemLayout = (data, index) => ({
  length: Dimensions.get("window").width,
  offset: Dimensions.get("window").width * index,
  index: index,
});

const HelpModal = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nomore, setNomore] = useState(false);
  const flatlistRef = useRef();
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const photos = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
    {
      id: "8",
    },
  ];
  const swipeRight = () => {
    if (activeIndex < photos.length - 1) {
      flatlistRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    }
  };
  const swipeLeft = () => {
    if (activeIndex > 0) {
      flatlistRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
      setActiveIndex(activeIndex - 1);
    }
  };

  const getNomore = async () => {
    const result = await SecureStore.getItemAsync("nomore");
    console.log("nomore :", result);
    if (result == null) setNomore(false);
    else setNomore(true);
    return result;
  };

  useEffect(() => {
    getNomore();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={{ flex: 1 }}
        opacity={1}
        onPress={navigation.goBack}
        disabled={!nomore}
      >
        {!nomore && (
          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              // backgroundColor: "rgba(42, 43, 52, 0.8)",
              backgroundColor: mainColor,
              paddingRight: 15,
              borderTopRightRadius: 10,
              // borderTopRightRadius: 10,
              // borderRadius: 10,
            }}
          >
            <Checkbox.Item
              status={nomore ? "checked" : "unchecked"}
              label={"다시 보지않기"}
              position={"leading"}
              mode={"android"}
              color={"white"}
              uncheckedColor={"white"}
              labelStyle={{
                fontFamily: "pretendard400",
                color: "white",
                textAlign: "left",
                fontSize: 17,
              }}
              style={{ paddingVertical: 0, paddingHorizontal: 0 }}
              onPress={() => {
                if (!nomore) {
                  setNomore(true);
                  SecureStore.setItemAsync("nomore", "true");
                  setTimeout(() => {
                    navigation.goBack();
                  }, 200);
                }
              }}
            />
          </View>
        )}
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: subColorBlack2,
          overflow: "hidden",
          borderTopRightRadius: 10,
          borderTopLeftRadius: nomore ? 10 : 0,
        }}
      >
        <FlatList
          ref={flatlistRef}
          data={photos}
          renderItem={({ item, index }) => {
            return (
              <Image
                source={
                  item.id == 1
                    ? require("../assets/images/help/Help1.png")
                    : item.id == 2
                    ? require("../assets/images/help/Help2.png")
                    : item.id == 3
                    ? require("../assets/images/help/Help3.png")
                    : item.id == 4
                    ? require("../assets/images/help/Help4.png")
                    : item.id == 5
                    ? require("../assets/images/help/Help5.png")
                    : item.id == 6
                    ? require("../assets/images/help/Help6.png")
                    : item.id == 7
                    ? require("../assets/images/help/Help7.png")
                    : require("../assets/images/help/Help8.png")
                }
                style={{
                  width: Dimensions.get("window").width,
                  aspectRatio: 1,
                }}
                resizeMode={"cover"}
              />
            );
          }}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          getItemLayout={getItemLayout}
          onScroll={handleScroll}
          scrollToOverflowEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode={"never"}
        />

        {activeIndex > 0 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 10,
              backgroundColor: "rgba(42, 43, 52, 0.6)",
              paddingVertical: 15,
              paddingLeft: 2,
              borderRadius: 10,
            }}
            onPress={swipeLeft}
          >
            <AntDesign name="caretleft" size={28} color={"white"} />
          </TouchableOpacity>
        )}
        {activeIndex < photos.length - 1 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              backgroundColor: "rgba(42, 43, 52, 0.6)",
              paddingVertical: 15,
              paddingRight: 2,
              borderRadius: 10,
            }}
            onPress={swipeRight}
          >
            <AntDesign name="caretright" size={28} color={"white"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            backgroundColor: "rgba(42, 43, 52, 0.5)",
            // paddingRight: 5,
            borderRadius: 5,
            paddingVertical: 7,
            paddingHorizontal: 8,
          }}
          onPress={navigation.goBack}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "pretendard400",
              letterSpacing: -0.5,
              color: "white",
            }}
          >
            {activeIndex == photos.length - 1 ? "  닫기  " : "건너뛰기"}
          </Text>
          {/* <MaterialCommunityIcons
            name="close-circle"
            size={27}
            // color={"white"}
            color="rgba(42, 43, 52, 0.8)"
          /> */}
        </TouchableOpacity>
        {/* <View
          style={{
            position: "absolute",
            bottom: 10,
            backgroundColor: "rgba(42, 43, 52, 0.6)",
            borderRadius: 7,
            paddingVertical: 3,
            paddingHorizontal: 5,
          }}
        >
          <PaginationDot
            activeDotColor={"white"}
            curPage={activeIndex}
            maxPage={photos.length}
            sizeRatio={1}
          />
        </View> */}
      </View>
    </View>
  );
};

export default HelpModal;
