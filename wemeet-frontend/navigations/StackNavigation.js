// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Easing } from "react-native";
import PrefSetScreen from "../screens/Register/PrefSetScreen.js";

import MainScreen from "../screens/MainScreen.js";
//Begin - Auth
import InitialScreen from "../screens/InitialScreen.js";
import NameScreen from "../screens/Auth/NameScreen.js";
import PhoneNumScreen from "../screens/Auth/PhoneNumScreen.js";
import VerifyScreen from "../screens/Auth/VerifyScreen.js";
import TermsModalScreen from "../screens/Auth/TermsModalScreen.js";
//Register - UserInfo
import GenderScreen from "../screens/Register/UserInfo/GenderScreen.js";
import MbtiScreen from "../screens/Register/UserInfo/MbtiScreen.js";
import IntroScreen from "../screens/Register/UserInfo/IntroScreen.js";
import UnivScreen from "../screens/Register/UserInfo/UnivScreen.js";
//Register - univAuth
import UnivMailScreen from "../screens/Register/Additional/UnivMailScreen.js";
import UnivVerifyScreen from "../screens/Register/Additional/UnivVerifyScreen.js";
//Register - Additional; PrefInfo, photoSet
import AdditionalScreen from "../screens/Register/Additional/AdditionalScreen.js";
import DrinkScreen from "../screens/Register/Pref/DrinkScreen.js";
import TypeScreen from "../screens/Register/Pref/TypeScreen.js";
import AdmissionYearScreen from "../screens/Register/Pref/AdmissionYearScreen.js";
import SameUnivScreen from "../screens/Register/Pref/SameUnivScreen.js";
import FriendScreen from "../screens/Register/Pref/FriendScreen.js";
import PrefMbtiScreen from "../screens/Register/Pref/PrefMbtiScreen.js";
// import PhotoSetScreen from "../screens/Register/Auth/PhotoSetScreen.js";
import PhotoSetScreen from "../screens//Register/Additional/PhotoSetScreen.js";
import { useDispatch } from "react-redux";
import { setPersistState } from "../redux/persistSlice.js";
import { useEffect } from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import NicknameScreen from "../screens/Register/UserInfo/NicknameScreen.js";

const config = {
  animation: "timing",
  config: {
    duration: 1000,
  },
};
const Stack = createStackNavigator();
export const RegisterStackNavigation = ({ persistType, persistData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (persistData) {
      dispatch(setPersistState(persistData));
    }
  }, []);
  console.log("registerStackNavigation>persistType :", persistType);
  return (
    <Stack.Navigator
      initialRouteName={persistType}
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
      {/* user info */}
      <Stack.Screen name="Gender" component={GenderScreen} options={{}} />
      <Stack.Screen name="Nickname" component={NicknameScreen} options={{}} />
      <Stack.Screen name="Mbti" component={MbtiScreen} options={{}} />
      <Stack.Screen name="Intro" component={IntroScreen} options={{}} />
      <Stack.Screen name="Univ" component={UnivScreen} options={{}} />
      {/* pref info */}
      <Stack.Screen name="Drink" component={DrinkScreen} options={{}} />
      <Stack.Screen name="Type" component={TypeScreen} options={{}} />
      <Stack.Screen
        name="AdmissionYear"
        component={AdmissionYearScreen}
        options={{}}
      />
      <Stack.Screen name="SameUniv" component={SameUnivScreen} options={{}} />
      <Stack.Screen name="Friend" component={FriendScreen} options={{}} />
      <Stack.Screen name="PrefMbti" component={PrefMbtiScreen} options={{}} />
      {/* Additional */}
      <Stack.Screen name="UnivMail" component={UnivMailScreen} options={{}} />
      <Stack.Screen
        name="UnivVerify"
        component={UnivVerifyScreen}
        options={{}}
      />
      <Stack.Screen
        name="Additional"
        component={AdditionalScreen}
        options={{}}
      />
      {/* <Stack.Screen name="PhotoSet" component={PhotoSetScreen} options={{}} /> */}
      {/* 여기 아래는 deprecated */}
      <Stack.Screen name="Pref" component={PrefSetScreen} options={{}} />
      <Stack.Screen name="PhotoSet" component={PhotoSetScreen} options={{}} />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
