import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/Home/HomeScreen";
import HomeStackNavigation from "./HomeStackNavigation";
// import MatchPage from "../screens/Match/MatchPage";
import ProfileStackNavigation from "./ProfileStackNavigation";
import MyTeamScreen from "../screens/Team/MyTeamScreen";
//temporary icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { mainColor, subColorPink } from "../styles/commonStyles";
import Home from "../assets/vectors/Home";
import MatchTabNavigation from "./MatchTabNavigation";
import NoTeamScreen from "../screens/Team/NoTeamScreen";
import TeamStackNavigation from "./TeamStackNavigation";

//MainScreen 여기로 옮기기
const inactiveColor = "#C5C4C9";
const MainTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: mainColor,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => (
            <Home color={focused ? subColorPink : inactiveColor} />
          ),
        }}
      />
      {/*임시 -> nested navigator로 재구현*/}
      <Tab.Screen
        name="MatchTab"
        component={MatchTabNavigation}
        options={{
          tabBarLabel: "매칭",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-heart-sharp"
              size={24}
              color={focused ? subColorPink : inactiveColor}
            />
          ),
        }}
      />
      {/*임시 -> nested navigator로 재구현*/}
      <Tab.Screen
        name="MyTeam"
        // component={MyTeamScreen}
        component={TeamStackNavigation}
        options={{
          tabBarLabel: "팀 관리",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-people"
              size={27}
              color={focused ? subColorPink : inactiveColor}
            />
          ),
          // unmountOnBlur: true, //추후 api관련 사용예정
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: "프로필",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-sharp"
              size={24}
              color={focused ? subColorPink : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainTabNavigation;
