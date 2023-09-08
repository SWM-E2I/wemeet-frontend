import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikeScreen from "../screens/Match/LikeScreen";
import SentScreen from "../screens/Match/SentScreen";
import ArrivedScreen from "../screens/Match/ArrivedScreen";
import MatchedScreen from "../screens/Match/MatchedScreen";
import LikeDetailScreen from "../screens/Match/LikeDetailScreen";
import SentDetailScreen from "../screens/Match/SentDetailScreen";
import ArrivedDetailScreen from "../screens/Match/ArrivedDetailScreen";
import MatchedDetailScreen from "../screens/Match/MatchedDetailScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mainColor } from "../styles/commonStyles";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import MatchDoneModalScreen from "../screens/Match/MatchDoneModalScreen";

const LikeStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Like" component={LikeScreen} />
      <Stack.Screen
        name="LikeDetail"
        component={LikeDetailScreen}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
const SentStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="Sent"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Sent"
        component={SentScreen}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SentDetail"
        component={SentDetailScreen}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
const ArrivedStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="Arrived"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Arrived"
        component={ArrivedScreen}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArrivedDetail"
        component={ArrivedDetailScreen}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="MatchDoneModal"
        component={MatchDoneModalScreen}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
const MatchedStackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="Matched"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Matched" component={MatchedScreen} />
      <Stack.Screen
        name="MatchedDetail"
        component={MatchedDetailScreen}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
const Tab = createMaterialTopTabNavigator();
const MatchTabNavigation = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="LikeStack"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: {
          backgroundColor: mainColor,
        },
        tabBarLabelStyle: {
          fontFamily: "pretendard500",
          fontSize: Dimensions.get("window").width > 393 ? 15 : 14,
        }, //device 크기 별로 분기 필요!!!
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: { backgroundColor: "white" },
        swipeEnabled: false,
      }}
      style={{
        backgroundColor: mainColor,
        paddingTop: insets.top,
      }}
    >
      <Tab.Screen
        name="LikeStack"
        component={LikeStackNavigation}
        options={{ tabBarLabel: "좋아요" }}
      />
      <Tab.Screen
        name="SentStack"
        component={SentStackNavigation}
        options={{ tabBarLabel: "보낸 신청" }}
      />
      <Tab.Screen
        name="ArrivedStack"
        component={ArrivedStackNavigation}
        options={{ tabBarLabel: "받은 신청" }}
      />
      <Tab.Screen
        name="MatchedStack"
        component={MatchedStackNavigation}
        options={{
          tabBarLabel: "성사된 미팅",
        }}
      />
    </Tab.Navigator>
  );
};

export default MatchTabNavigation;
