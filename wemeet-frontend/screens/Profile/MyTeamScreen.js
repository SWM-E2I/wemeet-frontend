import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { teamInquiryApi } from "../../api/team";

const MyTeamScreen = ({ navigation }) => {
  const controller = new AbortController();
  useEffect(() => {
    console.log("MyTeamScreen mounted");
    teamInquiryApi(controller);
    return () => {
      console.log("MyTeamScreen unmounted"); //on Navigaton goback();
      controller.abort();
    };
  });
  return (
    <View>
      <Text>MyTeamScreen</Text>
    </View>
  );
};

export default MyTeamScreen;
