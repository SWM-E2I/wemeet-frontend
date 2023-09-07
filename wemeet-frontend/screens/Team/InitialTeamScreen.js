import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import NoTeamScreen from "./NoTeamScreen";
import { teamInquiryApi } from "../../api/team";

const InitialTeamScreen = ({ navigation }) => {
  const [hasTeam, setHasTeam] = useState(false);
  const controller = new AbortController();
  const onMount = async () => {
    let result = await teamInquiryApi(navigation, controller);
    console.log(result);
    if (result) setHasTeam(true);
    else setHasTeam(false);
  };
  useEffect(() => {
    //inquiryApi 미완
    onMount();
    return () => {
      controller.abort();
    };
  }, []);
  return hasTeam ? (
    <SafeAreaView>
      <Text>팀이 있음</Text>
    </SafeAreaView>
  ) : (
    <NoTeamScreen navigation={navigation} />
  );
};

export default InitialTeamScreen;
