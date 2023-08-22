import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import HomeCard from "../../components/home/HomeCard";
import { roughCardData } from "../../assets/mock.js"; //임시

const LikeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleButtonText}>받은좋아요</Text>
        <Text style={[styles.toggleButtonText, { color: "gray" }]}>
          보낸좋아요
        </Text>
      </View>
      {/*받은 좋아요가 없는 경우 띄워줄 화면 필요!!!!!! (분기하기!!!)*/}
      <View style={styles.infoContainer}>
        <AntDesign name="exclamationcircleo" size={24} color="#575757" />
        <Text style={styles.infoText}>카드 기록 삭제까지</Text>
        <Text style={[styles.infoText, { color: subColorPink }]}>23:59:55</Text>
        {/*임시*/}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Swiper
          //몇번째 카드인지 알아야함 - 카드 기로 삭제까지 ㅇㅇ
          cards={roughCardData}
          renderCard={(card) => (
            <HomeCard card={card} navigation={navigation} />
          )}
          cardIndex={0}
          stackSize={2}
          horizontalSwipe
          verticalSwipe={false}
          swipeAnimationDuration={500}
          stackSeparation={20} //얼마로 해야할지 다시 무렁보기
          stackScale={5}
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          animateCardOpacity
          infinite
          backgroundColor={subColorBlack}
          showSecondCard
          cardVerticalMargin={20}
          stackAnimationFriction={4}
          stackAnimationTension={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: subColorBlack,
    // backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  toggleContainer: {
    marginVertical: 24,
    width: 240,
    height: 60,
    borderRadius: 60,
    padding: 10,
    backgroundColor: subColorBlack2,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: mainColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    paddingVertical: 8,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 8,
  },
});

export default LikeScreen;
