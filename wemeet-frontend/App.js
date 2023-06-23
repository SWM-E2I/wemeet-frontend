import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialScreen from "./screens/InitialScreen.js";
import TermsScreen from "./screens/Register/TermsScreen.js";
import BasicInfoSetScreen from "./screens/Register/BasicInfoSetScreen.js";
import AuthScreen from "./screens/AuthScreen.js";
import PrefSetScreen from "./screens/Register/PrefSetScreen.js";
import UnivSetScreen from "./screens/Register/UnivSetScreen.js";
import UnivAuthScreen from "./screens/UnivAuthScreen.js";
import PhotoSetScreen from "./screens/PhotoSetScreen.js";
import AddInfoSetScreen from "./screens/Register/AddInfoSetScreen.js";
import MainScreen from "./screens/MainScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Terms" component={TermsScreen} options={{}} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{}} />
        <Stack.Screen
          name="Basic"
          component={BasicInfoSetScreen}
          options={{}}
        />
        <Stack.Screen name="Pref" component={PrefSetScreen} options={{}} />
        <Stack.Screen name="UnivSet" component={UnivSetScreen} options={{}} />
        <Stack.Screen name="UnivAuth" component={UnivAuthScreen} options={{}} />
        <Stack.Screen name="PhotoSet" component={PhotoSetScreen} options={{}} />
        <Stack.Screen
          name="AddInfoSet"
          component={AddInfoSetScreen}
          options={{}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
