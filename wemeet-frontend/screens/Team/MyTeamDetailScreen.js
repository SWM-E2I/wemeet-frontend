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
  Linking,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import commonStyles, {
  mainColor,
  subColorPink,
  subColorBlack,
  subColorBlack2,
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
import { teamDeleteApi } from "../../api/team";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setHasTeam } from "../../redux/persistSlice";
import { setData, setImages } from "../../redux/teamGenerateSlice";
import {
  reverseRegionDict,
  reverseDrinkRateDict,
  reverseDrinkWithGameDict,
  reverseCollegeObj,
  reverseUnivDict,
} from "../../assets/datasets";
const renderItem = ({ item, index }) => {
  return (
    <View>
      <Image
        source={{
          uri: item.url,
        }}
        style={{
          aspectRatio: 1,
          width: Dimensions.get("window").width,
          // backgroundColor: "transparent",
          backgroundColor: "black",
        }}
        resizeMode={"cover"}
        // resizeMode={"contain"}
        // blurRadius={index === 0 ? 0 : 5}
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
const MyTeamDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const myTeamData = route.params.myTeamData;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatlistRef = useRef();
  const controller = new AbortController();
  useEffect(() => {
    return () => controller.abort();
  });
  const handleScroll = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(scrollPosition / Dimensions.get("window").width));
  };
  const drinkType = {
    "술 없이도 즐거워": 0,
    "술은 기분 좋을 정도로만": 1,
    "술 좋아해": 2,
    "술에 진심이야": 3,
  }; //확인필요!!!!!
  const onDeletePress = async () => {
    Alert.alert(
      "팀 삭제",
      "팀을 삭제하면 다시 생성할때까지\n매칭 신청, 좋아요가 불가능해",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: async () => {
            let result = await teamDeleteApi(navigation, controller);
            if (result) {
              dispatch(setHasTeam(false));
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "InitialTeam" }],
                })
              );
            }
          },
        },
      ]
    );
  };
  const onModifyPress = () => {
    const data = {
      region: reverseRegionDict[myTeamData.region],
      drinkRate: reverseDrinkRateDict[myTeamData.drinkRate],
      drinkWithGame: reverseDrinkWithGameDict[myTeamData.drinkWithGame],
      additionalActivity: null,
      introduction: myTeamData.introduction,
      chatLink: myTeamData.chatLink,
      members: [],
    };
    const images = [];
    myTeamData.images.map((image) => {
      images.push({
        uri: image.url,
      });
    });
    console.log(images);
    myTeamData.members.map((member) => {
      data.members.push({
        collegeInfo: {
          admissionYear: member.admissionYear,
          collegeCode: reverseUnivDict[member.college],
          collegeType: reverseCollegeObj[member.collegeType],
        },
        mbti: member.mbti,
      });
    });
    // console.log(data.members);
    dispatch(setData(data));
    dispatch(setImages(images));
    navigation.navigate("ChatLink", { edit: true });
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
          data={myTeamData.images}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
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
            maxPage={
              myTeamData.images.length == 1 ? 0 : myTeamData.images.length
            }
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
              {myTeamData.region}
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
                {myTeamData.memberNum}
                {/*인원 수 들어가기*/}
              </Text>
            </View>
          </View>
          <LeaderCard
            nickName={myTeamData.leader.nickname}
            mbti={myTeamData.leader.mbti}
            college={myTeamData.leader.college}
            collegeType={""}
            profile={myTeamData.profileImageURL}
            emailAuthenticated={myTeamData.leader.emailAuthenticated}
            admissionYear={myTeamData.leader.admissionYear}
          />
          <InfoSection
            memberInfo={myTeamData.members}
            drinkingRate={drinkType[myTeamData.drinkRate]}
            drinkWithGame={myTeamData.drinkWithGame}
            intro={myTeamData.introduction}
            myTeam
            chatLink={myTeamData.chatLink}
            leader={myTeamData.leader}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          style={{
            width: "66%",
            height: 50,
            marginVertical: 10,
            backgroundColor: subColorPink,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5,
            flexDirection: "row",
          }}
          onPress={onModifyPress}
        >
          <MaterialCommunityIcons
            name="account-edit"
            size={24}
            color={"white"}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "pretendard600",
            }}
          >
            수정하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "26%",
            height: 50,
            marginVertical: 10,
            // backgroundColor: subColorPink,
            // backgroundColor: "black",
            backgroundColor: "#9C9C9C",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5,
            flexDirection: "row",
          }}
          onPress={onDeletePress}
        >
          <Ionicons
            name="trash-bin"
            size={22}
            // color={subColorPink}
            color={"white"}
          />
          <Text
            style={{
              // color: "black",
              marginLeft: 5,
              // color: subColorPink,
              color: "white",
              fontSize: 16,
              fontFamily: "pretendard600",
            }}
          >
            팀 삭제
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyTeamDetailScreen;
