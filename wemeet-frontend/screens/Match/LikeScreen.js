import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Touchable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  mainColor,
  subColorBlack,
  subColorBlack2,
  subColorPink,
} from "../../styles/commonStyles";

import Card from "../../components/home/Card";
import { likeSentData } from "../../assets/mock.js"; //임시

const LikeScreen = ({ navigation }) => {
  const [arrived, setArrived] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {/*임시*/}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            arrived ? { backgroundColor: "#575757" } : null,
          ]}
          onPress={() => setArrived(true)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              arrived ? null : { color: "#575757" },
            ]}
          >
            받은 좋아요
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !arrived ? { backgroundColor: "#575757" } : null,
          ]}
          onPress={() => setArrived(false)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              !arrived ? null : { color: "#575757" },
            ]}
          >
            보낸 좋아요
          </Text>
        </TouchableOpacity>
      </View>
      {/* 받은 좋아요가 없는 경우 띄워줄 화면 필요!!!!!! (분기하기!!!) */}

      <ScrollView
        // style={{ marginVertical: 10 }}
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        {likeSentData.map((card, index) => (
          <Card
            card={card}
            navigation={navigation}
            key={index}
            style={{ width: "100%" }}
            isLike
          />
        ))}
      </ScrollView>
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
    marginVertical: 16,
    padding: 10,
    width: 240,
    height: 50,
    borderRadius: 20,
    backgroundColor: subColorBlack2,
    // backgroundColor: "yellow",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  toggleButton: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 93,
  },
  toggleButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "pretendard600",
  },
});

export default LikeScreen;
