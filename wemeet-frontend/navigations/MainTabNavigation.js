import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import MatchPage from "../screens/Match/MatchPage";
import ProfileStackNavigation from "./ProfileStackNavigation";
import MyTeamScreen from "../screens/Team/MyTeamScreen";
//temporary icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//MainScreen 여기로 옮기기
const MainTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarLabelStyle: {
        //   fontSize: 12,
        //   fontWeight: "bold",
        //   color: "gray",
        // },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "orange" : "black"}
            />
          ),
        }}
      />
      {/*임시 -> nested navigator로 재구현*/}
      <Tab.Screen
        name="Match"
        component={MatchPage}
        options={{
          tabBarLabel: "매칭",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="wechat"
              size={24}
              color={focused ? "orange" : "black"}
            />
          ),
        }}
      />
      {/*임시 -> nested navigator로 재구현*/}
      <Tab.Screen
        name="MyTeam"
        component={MyTeamScreen}
        options={{
          tabBarLabel: "팀 관리",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-people"
              size={27}
              color={focused ? "orange" : "black"}
            />
          ),
          unmountOnBlur: true,
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
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainTabNavigation;
