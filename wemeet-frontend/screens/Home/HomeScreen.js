import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import commonStyles from "../../styles/commonStyles";
import Swiper from "react-native-deck-swiper";
import { roughCardData } from "../../assets/mock.js";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const swiperHeightPercentage = 0.78;
const cardBorderRadius = 8;
const Card = ({ card }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Alert.alert("상세조회 페이지로 이동");
      }}
      style={styles.card}
    >
      <Image
        source={{ uri: card.imageURL }}
        style={styles.cardImage}
        resizeMode={"cover"} //or, cover?
      />
      <View style={styles.infoBox}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>{card.region}</Text>
          <Text>{card.memberNum}</Text>
        </View>
        <Text>팀원 정보</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>{card.members[0].mbti}</Text>
          <Text>{card.members[0].college}</Text>
          <Text>{card.members[0].collegeType}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>{card.members[1].mbti}</Text>
          <Text>{card.members[1].college}</Text>
          <Text>{card.members[1].collegeType}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>{card.members[2]?.mbti}</Text>
          <Text>{card.members[2]?.college}</Text>
          <Text>{card.members[2]?.collegeType}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text>{card.members[3]?.mbti}</Text>
          <Text>{card.members[3]?.college}</Text>
          <Text>{card.members[3]?.collegeType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const HomeScreen = () => {
  const [progress, setProgress] = useState(0);
  console.log(roughCardData[0]);
  return (
    <View
      style={[
        { justifyContent: "space-around", flex: 1, backgroundColor: "white" },
        // { flex: 1, justifyContent: "center", alignItems: "center" },
      ]} //주석 친 부분을 사용하면 이상하게 배치 되는 이유?
    >
      {/* statusbar까지 영역에 포함하기 위해 safeAreaView 미사용 */}

      <View style={styles.aboveContainer}>
        <Text
          style={{
            fontSize: 40,
            // fontFamily: "Pretendard",
            color: "white",
            fontWeight: "bold",
          }}
        >
          we:meet
        </Text>
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
          // horizontalSwipe={false}
          disableLeftSwipe
          disableRightSwipe
          horizontalSwipe={false}
          disableBottomSwipe
          stackSeparation={20} //얼마로 해야할지 다시 무렁보기
          stackScale={1}
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "gray",
          }}
          animateCardOpacity
          infinite //임시
          backgroundColor="white"
          // showSecondCard={false}
          cardVerticalMargin={40}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3948",
  },
  swiperContainer: {
    flex: swiperHeightPercentage,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    height: HEIGHT * swiperHeightPercentage * 0.8,
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
    height: 180,
    // backgroundColor: "white",
    justifyContent: "space-evenly",
    //추가 예정
  },
});

export default HomeScreen;
