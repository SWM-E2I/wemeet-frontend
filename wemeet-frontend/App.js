import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as SecureStore from "expo-secure-store";
import { RegisterStackNavigation } from "./navigations/StackNavigation.js";
import MainScreen from "./screens/MainScreen.js";
import axios, { axiosPrivate } from "./api/axios.js";

// const Stack = createNativeStackNavigator();
async function checkPersist(setPersist) {
  let result = await SecureStore.getItemAsync("refreshToken");
  if (result && result.length > 0)
    setPersist(true); //로그아웃시 Refreshtoken = ""로 바꿔주기
  else setPersist(false);
  console.log("app.js > persist? : ", result);
  //여기에 refresh로직 및
}
axiosPrivate.get("/v1/member");
export default function App() {
  const [persist, setPersist] = useState(false); //persist check
  useEffect(() => {
    checkPersist(setPersist);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {persist ? <MainScreen /> : <RegisterStackNavigation />}
      </NavigationContainer>
    </Provider>
  );
}
