import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import InitialProfileScreen from "../screens/Profile/InitialProfileScreen";
import MyAccountScreen from "../screens/Profile/MyAccountScreen";
import UnivMailScreen from "../screens/Register/Additional/UnivMailScreen";
import UnivVerifyScreen from "../screens/Register/Additional/UnivVerifyScreen";
import PhotoSetScreen from "../screens/Register/Additional/PhotoSetScreen";
import HelpModal from "../screens/HelpModal";

const ProfileStackNavigation = () => {
  const Stack = createStackNavigator();
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
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      <Stack.Screen name="UnivMail" component={UnivMailScreen} />
      <Stack.Screen name="UnivVerify" component={UnivVerifyScreen} />
      <Stack.Screen name="PhotoSet" component={PhotoSetScreen} />
      <Stack.Screen
        name="Guide"
        component={HelpModal}
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

export default ProfileStackNavigation;
