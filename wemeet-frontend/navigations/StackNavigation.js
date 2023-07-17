// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Easing } from "react-native";
import BasicInfoSetScreen from "../screens/Register/BasicInfoSetScreen.js";
import PrefSetScreen from "../screens/Register/PrefSetScreen.js";
import UnivSetScreen from "../screens/Register/UnivSetScreen.js";
import UnivAuthScreen from "../screens/UnivAuthScreen.js";
import PhotoSetScreen from "../screens/PhotoSetScreen.js";
import MainScreen from "../screens/MainScreen.js";
import InitialScreen from "../screens/InitialScreen.js";
import NameScreen from "../screens/Auth/NameScreen.js";
import PhoneNumScreen from "../screens/Auth/PhoneNumScreen.js";
import VerifyScreen from "../screens/Auth/VerifyScreen.js";
import TermsModalScreen from "../screens/Auth/TermsModalScreen.js";
import GenderScreen from "../screens/Register/GenderScreen.js";
import MbtiScreen from "../screens/Register/MbtiScreen.js";
import IntroScreen from "../screens/Register/IntroScreen.js";
import UnivScreen from "../screens/Register/UnivScreen.js";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import NicknameScreen from "../screens/Register/NicknameScreen.js";

const config = {
  animation: "timing",
  config: {
    duration: 1000,
  },
};
const Stack = createStackNavigator();
export const RegisterStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Initial"}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: config,
          close: {
            animation: "spring",
            config: {
              stiffness: 1000,
              damping: 500,
              mass: 3,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
        },
      }}
    >
      <Stack.Screen name="Initial" component={InitialScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="PhoneNum" component={PhoneNumScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen
        name="TermsModal"
        component={TermsModalScreen}
        options={{
          presentation: "transparentModal",
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <Stack.Screen name="Gender" component={GenderScreen} options={{}} />
      <Stack.Screen name="Nickname" component={NicknameScreen} options={{}} />
      <Stack.Screen name="Mbti" component={MbtiScreen} options={{}} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{}} />
      <Stack.Screen name="Univ" component={UnivScreen} options={{}} />
      {/* 여기 아래는 deprecated */}
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
