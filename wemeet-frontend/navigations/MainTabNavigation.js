import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import MatchPage from "../screens/Match/MatchPage";
import ProfileStackNavigation from "./ProfileStackNavigation";
//temporary icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//MainScreen 여기로 옮기기
const MainTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "orange" : "black"}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            color: "gray",
          },
        }}
      />
      {/*임시*/}
      <Tab.Screen
        name="Match"
        component={MatchPage}
        options={{
          tabBarLabel: "매칭",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="group"
              size={24}
              color={focused ? "orange" : "black"}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            color: "gray",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: "프로필",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={focused ? "orange" : "black"}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            color: "gray",
          },
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainTabNavigation;
