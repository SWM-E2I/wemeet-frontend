import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { subColorBlack } from "../../styles/commonStyles";
import { matchedData } from "../../assets/mock";
import Card from "../../components/home/Card";

const MatchedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: 24 }}
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        {matchedData.map((card, index) => (
          <Card
            card={card}
            navigation={navigation}
            key={index}
            style={{ width: "100%" }}
            isMatched
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
});

export default MatchedScreen;
