import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikeScreen from "../screens/Match/LikeScreen";
import SentScreen from "../screens/Match/SentScreen";
import ArrivedScreen from "../screens/Match/ArrivedScreen";
import MatchedScreen from "../screens/Match/MatchedScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mainColor } from "../styles/commonStyles";
const Tab = createMaterialTopTabNavigator();
const MatchTabNavigation = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Like"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: { backgroundColor: mainColor },
        tabBarLabelStyle: { fontSize: 15, fontWeight: 600 }, //device 크기 별로 분기 필요!!!
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
        name="Like"
        component={LikeScreen}
        options={{ tabBarLabel: "좋아요" }}
      />
      <Tab.Screen
        name="Sent"
        component={SentScreen}
        options={{ tabBarLabel: "보낸 신청" }}
      />
      <Tab.Screen
        name="Arrived"
        component={ArrivedScreen}
        options={{ tabBarLabel: "받은 신청" }}
      />
      <Tab.Screen
        name="Matched"
        component={MatchedScreen}
        options={{ tabBarLabel: "성사된 미팅" }}
      />
    </Tab.Navigator>
  );
};

export default MatchTabNavigation;
