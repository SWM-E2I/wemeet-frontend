import { SafeAreaView, View, Text, Button } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import commonStyles from "../../styles/commonStyles";

const HomeScreen = () => {
  const [progress, setProgress] = useState(0);

  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        { flex: 1, justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text>Card will be shown here</Text>
      <Progress.Bar
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
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
