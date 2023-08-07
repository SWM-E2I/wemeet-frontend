import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialProfileScreen from "../screens/Profile/InitialProfileScreen";

const ProfileStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="InitialProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="InitialProfile"
        component={InitialProfileScreen}
        //   options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="MyTeam" component={MyTeamScreen} /> -> 팀관리는 마이페이지에서 빠짐*/}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default ProfileStackNavigation;
