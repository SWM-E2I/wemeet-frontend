import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from "./MyProfileScreen.js";
import PrefEditScreen from "./PrefEditScreen.js";
import HistoryScreen from "./HistoryScreen.js";
import StoreScreen from "./StoreScreen.js";
import MyPageScreen from "./MyPageScreen.js";

const MyPageRoot = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="MyPage"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="PrefEdit" component={PrefEditScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyPageRoot;
