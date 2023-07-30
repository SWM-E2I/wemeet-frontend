import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Main/HomeScreen";
import ChatScreen from "./Chat/ChatScreen";
import TeamScreen from "./Team/TeamScreen";
import MyPageRoot from "./MyPage/MyPageRoot";

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Team" component={TeamScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="MyPageRoot" component={MyPageRoot} />
      {/*options={{
          tabBarIcon: ({ color }) => (
            <Image
              style={styles.bottomTabIcon}
              source={require('../assets/icons/home.png')                  
              }/>
            )*/}
    </Tab.Navigator>
  );
};

export default MainScreen;
