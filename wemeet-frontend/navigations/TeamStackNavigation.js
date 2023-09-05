import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoTeamScreen from "../screens/Team/NoTeamScreen";
import InitialTeamScreen from "../screens/Team/InitialTeamScreen";
import MyTeamScreen from "../screens/Team/MyTeamScreen";
import TeamPhotoScreen from "../screens/Team/TeamPhotoScreen";
import RegionScreen from "../screens/Team/RegionScreen";
import MembersScreen from "../screens/Team/MembersScreen";
import DrinkRateScreen from "../screens/Team/DrinkRateScreen";
import DrinkGameScreen from "../screens/Team/DrinkGameScreen";
import IntroScreen from "../screens/Team/IntroScreen";
import ChatLinkScreen from "../screens/Team/ChatLinkScreen";

const TeamStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="InitialTeam"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InitialTeam" component={InitialTeamScreen} />
      <Stack.Screen name="NoTeam" component={NoTeamScreen} />
      <Stack.Screen name="TeamPhoto" component={TeamPhotoScreen} />
      <Stack.Screen name="Region" component={RegionScreen} />
      <Stack.Screen name="Members" component={MembersScreen} />
      <Stack.Screen name="DrinkRate" component={DrinkRateScreen} />
      <Stack.Screen name="DrinkGame" component={DrinkGameScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="ChatLink" component={ChatLinkScreen} />
      {/* <Stack.Screen name="tmp" component={MyTeamScreen} /> */}
    </Stack.Navigator>
  );
};

export default TeamStackNavigation;
