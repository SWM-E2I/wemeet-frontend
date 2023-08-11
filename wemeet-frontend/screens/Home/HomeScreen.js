import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import commonStyles from "../../styles/commonStyles";
import Swiper from "react-native-deck-swiper";
import { roughCardData } from "../../assets/mock.js";

const Card = ({ card }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => {
        console.log("card pressed, 상세조회 페이지로 이동");
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
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        { justifyContent: "space-around" },
        // { flex: 1, justifyContent: "center", alignItems: "center" },
      ]} //주석 친 부분을 사용하면 이상하게 배치 되는 이유?
    >
      {/* <Image
        source={{ uri: roughCardData[1].imageURL }}
        style={{ width: 300, height: 300, backgroundColor: "black" }}
        resizeMode={"cover"}
      /> */}
      <View style={styles.aboveContainer}>
        <Text style={{ fontSize: 40, color: "white", fontWeight: "bold" }}>
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
          backgroundColor="transparent"
          // showSecondCard={false}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  aboveContainer: {
    flex: 0.17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3948",
  },
  swiperContainer: {
    flex: 0.83,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#3A3948",
    // backgroundColor: "gray",
    backgroundColor: "white",
  },
  card: {
    //Elevation도 추가해야됨!!!!
    // flex: 1,
    marginTop: -40,
    height: 500,
    width: 320,
    borderRadius: 8,
    borderWidth: 2, //임시
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: "center", //왜 이거해야만 되는거지..

    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  cardImage: {
    width: 320,
    height: 320,
    backgroundColor: "black",
  },
  infoBox: {
    width: "100%",
    height: 180,
    // backgroundColor: "gray",
    justifyContent: "space-evenly",
    //추가 예정
  },
});

export default HomeScreen;
