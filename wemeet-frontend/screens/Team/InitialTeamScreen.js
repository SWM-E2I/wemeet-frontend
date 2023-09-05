import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import NoTeamScreen from "./NoTeamScreen";
import { teamInquiryApi } from "../../api/team";

const InitialTeamScreen = ({ navigation }) => {
  const [hasTeam, setHasTeam] = useState(false);
  const controller = new AbortController();
  // useEffect(() => {
  //inquiryApi 미완
  //   let result = teamInquiryApi(navigation, controller);
  //   console.log(result);
  //   return () => {
  //     controller.abort();
  //   };
  // }, []);
  return hasTeam ? (
    <View>
      <Text>팀이 있음</Text>
    </View>
  ) : (
    <NoTeamScreen navigation={navigation} />
  );
};

export default InitialTeamScreen;
