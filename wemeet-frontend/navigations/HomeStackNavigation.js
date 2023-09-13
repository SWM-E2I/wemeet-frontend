import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import HomeDetailScreen from "../screens/Home/HomeDetailScreen";
import RequestModalScreen from "../screens/Home/RequestModalScreen";
import RequestDoneModalScreen from "../screens/Home/RequestDoneModalScreen";
import HelpModal from "../screens/HelpModal";

const HomeStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpModal}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="HomeDetail"
        component={HomeDetailScreen}
        options={{
          //   headerShown: true,
          //   animation: "fade",
          //   presentation: "modal",
          // animation: "fade_from_bottom",
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="RequestModal"
        component={RequestModalScreen}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="RequestDoneModal"
        component={RequestDoneModalScreen}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />

      {/* <Stack.Screen name="MyTeam" component={MyTeamScreen} /> -> 팀관리는 마이페이지에서 빠짐*/}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default HomeStackNavigation;
