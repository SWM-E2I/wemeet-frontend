import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsScreen from "../screens/Register/TermsScreen.js";
import BasicInfoSetScreen from "../screens/Register/BasicInfoSetScreen.js";
import AuthScreen from "../screens/AuthScreen.js";
import PrefSetScreen from "../screens/Register/PrefSetScreen.js";
import UnivSetScreen from "../screens/Register/UnivSetScreen.js";
import UnivAuthScreen from "../screens/UnivAuthScreen.js";
import PhotoSetScreen from "../screens/PhotoSetScreen.js";
import MainScreen from "../screens/MainScreen.js";
import InitialScreen from "../screens/Register/InitialScreen.js";
import NameScreen from "../screens/Auth/NameScreen.js";
import PhoneNumScreen from "../screens/Auth/PhoneNumScreen.js";

const Stack = createNativeStackNavigator();

export const RegisterStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Initial"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Initial" component={InitialScreen} options={{}} />
      <Stack.Screen name="Name" component={NameScreen} options={{}} />
      <Stack.Screen name="PhoneNum" component={PhoneNumScreen} options={{}} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{}} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{}} />
      <Stack.Screen name="Basic" component={BasicInfoSetScreen} options={{}} />
      <Stack.Screen name="Pref" component={PrefSetScreen} options={{}} />
      <Stack.Screen name="UnivSet" component={UnivSetScreen} options={{}} />
      <Stack.Screen name="UnivAuth" component={UnivAuthScreen} options={{}} />
      <Stack.Screen name="PhotoSet" component={PhotoSetScreen} options={{}} />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
