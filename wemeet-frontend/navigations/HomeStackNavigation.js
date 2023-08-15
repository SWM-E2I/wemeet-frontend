import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import HomeDetailScreen from "../screens/Home/HomeDetailScreen";

const HomeStackNavigation = () => {
  const Stack = createNativeStackNavigator();
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
        name="HomeDetail"
        component={HomeDetailScreen}
        options={{
          //   headerShown: true,
          //   animation: "fade",
          //   presentation: "modal",
          animation: "fade_from_bottom",
        }}
      />

      {/* <Stack.Screen name="MyTeam" component={MyTeamScreen} /> -> 팀관리는 마이페이지에서 빠짐*/}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default HomeStackNavigation;
