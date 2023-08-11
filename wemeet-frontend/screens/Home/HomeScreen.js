import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import commonStyles from "../../styles/commonStyles";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { roughCardData } from "../../assets/mock.js";
import Logo from "../../assets/vectors/Logo";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const swiperHeightPercentage = 0.8;
const cardBorderRadius = 8;
const mainComponentColor = "#6C66FE";
const subComponentColor = "#9C9C9C";
const Card = ({ card }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Alert.alert("상세조회 페이지로 이동");
      }}
      style={styles.card}
    >
      <View>
        <Image
          source={{ uri: card.imageURL }}
          style={styles.cardImage}
          resizeMode={"cover"} //or, cover?
        />
        <View style={styles.mainLabel}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "white",
              opacity: 1,
            }}
          >
            대표
          </Text>
        </View>
        <View style={styles.verifiedLabel}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "white",
              opacity: 1,
            }}
          >
            프로필 인증 완료
          </Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="heart" size={24} color={mainComponentColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoBox}>
        <View
          style={{
            flex: 0.3,
            width: "88%",
            // backgroundColor: "black",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 600 }}>{card.region}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="person"
              size={22}
              color={subComponentColor}
              opacity={0.5}
            />
            <Text
              style={{ marginLeft: 3, fontSize: 16, color: subComponentColor }}
              opacity={0.5}
            >
              {card.memberNum}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            width: "100%",
            paddingHorizontal: "6%",
          }}
        >
          <View style={{ flex: 0.2 }}>
            <Text
              style={{
                color: "#8F8F8F",
                fontSize: 15,
                letterSpacing: -0.5,
              }}
            >
              팀원 정보
            </Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <MaterialIcons
                name="person"
                size={16}
                color={mainComponentColor}
              />
              <Text style={{ marginLeft: 5, fontSize: 15 }}>
                {card.members[0].mbti}
              </Text>
              <Text style={{ marginLeft: 8, fontSize: 15 }}>
                {card.members[0].college}
              </Text>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 15,
                  color: subComponentColor,
                }}
              >
                {card.members[0].collegeType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <MaterialIcons name="person" size={16} color={"black"} />
              <Text style={{ marginLeft: 5, fontSize: 15 }}>
                {card.members[1].mbti}
              </Text>
              <Text style={{ marginLeft: 8, fontSize: 15 }}>
                {card.members[1].college}
              </Text>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 15,
                  color: subComponentColor,
                }}
              >
                {card.members[1].collegeType}
              </Text>
            </View>
            {card.members[2] && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <MaterialIcons name="person" size={16} color={"black"} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>
                  {card.members[2].mbti}
                </Text>
                <Text style={{ marginLeft: 8, fontSize: 15 }}>
                  {card.members[2].college}
                </Text>
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    color: subComponentColor,
                  }}
                >
                  {card.members[2].collegeType}
                </Text>
              </View>
            )}
            {card.members[3] && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginBottom: 5, //마지막 entry
                }}
              >
                <MaterialIcons name="person" size={16} color={"black"} />
                <Text style={{ marginLeft: 5, fontSize: 15 }}>
                  {card.members[3].mbti}
                </Text>
                <Text style={{ marginLeft: 8, fontSize: 15 }}>
                  {card.members[3].college}
                </Text>
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 15,
                    color: subComponentColor,
                  }}
                >
                  {card.members[3].collegeType}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const HomeScreen = () => {
  //API나오면, 좋아요했는지 여부를 트래킹하는 것이 필요!! (좋아요 누른 경우 하트 채워주기, 안누른 경ㅇ우 빈 하트)
  //MBTI를 모르는 경우도 처리해야함!!! "XXXX"
  // const [progress, setProgress] = useState(0);
  return (
    <View
      style={[
        { justifyContent: "space-around", flex: 1, backgroundColor: "white" },
        // { flex: 1, justifyContent: "center", alignItems: "center" },
      ]} //주석 친 부분을 사용하면 이상하게 배치 되는 이유?
    >
      {/* statusbar까지 영역에 포함하기 위해 safeAreaView 미사용 */}

      <View style={styles.aboveContainer}>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            width: "100%",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo width={90} height={20} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color="white"
            />
            <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
              25
            </Text>
            {/* 임시 시그널수 */}
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 0.55,
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            paddingLeft: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: -0.47,
              lineHeight: 23.4,
            }}
          >
            {"좋아요는 오늘 한번만!\n하트로 상대팀에게 우리를 알려봐!"}
          </Text>
          <Text
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
              fontSize: 17,
              color: "white",
            }}
            opacity={0.5}
          >
            1/2
          </Text>
        </View>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          cards={roughCardData}
          renderCard={(card) => <Card card={card} />}
          // cardStyle={{ height: 500, width: 500, borderRadius: 20 }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={0}
          stackSize={2}
          // horizontalSwipe
          // horizontalSwipe={false}
          // disableLeftSwipe
          swipeAnimationDuration={500}
          verticalThreshold={100}
          // verticalSwipe={false}
          // disableBottomSwipe
          // disableTopSwipe
          stackSeparation={15} //얼마로 해야할지 다시 무렁보기
          stackScale={1}
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "gray",
          }}
          animateCardOpacity
          infinite //임시
          backgroundColor="white"
          showSecondCard
          cardVerticalMargin={20}
          stackAnimationFriction={4}
          stackAnimationTension={10}
          // outputCardOpacityRangeX={[-1, 1, 1, 1, -1]}
          // outputCardOpacityRangeY={[-1, 1, 1, 1, -1]}
        />
      </View>

      {/*아래는 progress bar 참고 코드!! */}
      {/* <Progress.Bar
        progress={progress}
        width={250}
        height={10}
        // useNativeDriver => 해 말아?
        color={"#F59B40"}
        unfilledColor={"#ECECEC"}
        borderRadius={16}
        borderWidth={0}
      />
      <Button
        title={"눌러봐"}
        onPress={() => {
          progress >= 1 ? setProgress(0) : setProgress(progress + 0.3);
        }}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  aboveContainer: {
    flex: 1 - swiperHeightPercentage,
    paddingTop:
      Platform.OS == "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight,
    paddingHorizontal: "6%",
    // alignItems: "center",
    backgroundColor: "#3A3948",
  },
  swiperContainer: {
    flex: swiperHeightPercentage,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    height: HEIGHT * swiperHeightPercentage * 0.77,
    width: WIDTH * 0.88,
    borderRadius: cardBorderRadius,
    // borderWidth: 2, //임시
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
  },
  cardImage: {
    width: WIDTH * 0.88,
    height: WIDTH * 0.88,
    borderTopLeftRadius: cardBorderRadius,
    borderTopRightRadius: cardBorderRadius,
    backgroundColor: "black",
  },
  infoBox: {
    width: "100%",
    height: HEIGHT * swiperHeightPercentage * 0.77 - WIDTH * 0.88,
    borderRadius: cardBorderRadius,
    alignItems: "center",
    //추가 예정
  },
  mainLabel: {
    width: 35,
    height: 23,
    backgroundColor: "rgba(171, 171, 171, 0.5)",
    // opacity: 0.8,
    position: "absolute",
    top: 15,
    right: 18,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  verifiedLabel: {
    position: "absolute",
    top: 15,
    left: 20,
    width: 90,
    height: 23,
    borderRadius: 5,
    backgroundColor: "#6C66FE",
    justifyContent: "center",
    alignItems: "center",
  },
  likeButton: {
    position: "absolute",
    bottom: 15,
    left: 30,
  },
});

export default HomeScreen;
