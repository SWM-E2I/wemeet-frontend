import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import commonStyles from "../../styles/commonStyles";
import Swiper from "react-native-deck-swiper";

const HomeScreen = () => {
  const [progress, setProgress] = useState(0);

  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        { flex: 1, justifyContent: "center", alignItems: "center" },
      ]}
    >
      {/* <Text>Card will be shown here</Text> */}
      <Swiper
        cards={["1", "2", "3", "4"]}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          );
        }}
        // cardStyle={{ height: 500, width: 500, borderRadius: 20 }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        // backgroundColor={"gray"}
        stackSize={2}
        horizontalSwipe={false}
        disableBottomSwipe
        disableTopSwipe
        stackSeparation={16}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
        }}
      />
      {/* <Button
          onPress={() => {
            console.log("oulala");
          }}
          title="Press me"
        /> */}
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  card: {
    height: 200,
    width: 200,
    // alignSelf: "center",
    borderRadius: 20,
    borderWidth: 2,
    // borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

export default HomeScreen;
