import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { subColorBlack } from "../../styles/commonStyles";
import { sentData } from "../../assets/mock";
import Card from "../../components/home/Card";

const SentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginTop: 24 }}
        bounces={false} //FOR IOS
        overScrollMode={"never"} //FOR ANDROID
        showsVerticalScrollIndicator={false}
      >
        {sentData.map((card, index) => (
          <Card
            card={card}
            navigation={navigation}
            key={index}
            style={{ width: "100%" }}
            isSent
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

export default SentScreen;
