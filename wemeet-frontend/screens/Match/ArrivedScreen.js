import { View, ScrollView, Text, StyleSheet } from "react-native";
import React from "react";
import { mainColor, subColorBlack } from "../../styles/commonStyles";
import { AntDesign } from "@expo/vector-icons";
import { arrivedData } from "../../assets/mock";
import Card from "../../components/home/Card";

const ArrivedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AntDesign
          name="exclamationcircleo"
          size={20}
          //   color={subColorPink}
          color={"#575757"}
          // color={"white"}
        />
        <Text style={styles.infoText}>받은 신청 카드는 3일 동안 저장돼!</Text>
      </View>
      {/* 받은 신청이 없는 경우 띄워줄 화면 필요!!!!!! (분기하기!!!) */}

      <ScrollView
        style={{ marginTop: 18 }}
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        {arrivedData.map((card, index) => (
          <Card
            card={card}
            navigation={navigation}
            key={index}
            style={{ width: "100%" }}
            isArrived
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: subColorBlack,
    // backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: mainColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    flexDirection: "row",
    paddingVertical: 10,
  },
  infoText: {
    // color: subColorPink,
    color: "white",
    fontSize: 16,
    fontFamily: "pretendard500",
    marginLeft: 8,
  },
});

export default ArrivedScreen;
