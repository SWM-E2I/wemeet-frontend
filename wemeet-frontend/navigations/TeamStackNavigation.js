import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
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
import MemberModalScreen from "../screens/Team/MemberModalScreen";
import MyTeamDetailScreen from "../screens/Team/MyTeamDetailScreen";
import UnivSearchModal from "../screens/UnivSearchModal";

const TeamStackNavigation = () => {
  const Stack = createStackNavigator();
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
      <Stack.Screen
        name="MemberModal"
        component={MemberModalScreen}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen name="DrinkRate" component={DrinkRateScreen} />
      <Stack.Screen name="DrinkGame" component={DrinkGameScreen} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="ChatLink" component={ChatLinkScreen} />
      <Stack.Screen name="MyGroup" component={MyTeamScreen} />
      <Stack.Screen name="MyTeamDetail" component={MyTeamDetailScreen} />
      <Stack.Screen
        name="UnivSearchModal"
        component={UnivSearchModal}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      {/* navigation쓸때조심!!! */}
      {/* univSearchmodal -> teastack, rootstadck에 둘 다 존재, 이름 다름*/}
    </Stack.Navigator>
  );
};

export default TeamStackNavigation;
