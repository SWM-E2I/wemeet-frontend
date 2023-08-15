import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import commonStyles from "../../styles/commonStyles";
import RegisterHeader from "../../components/register/RegisterHeader";
import { mainColor } from "../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
const HomeDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[commonStyles.safeAreaView, { backgroundColor: mainColor }]}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white" }}>DetailScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeDetailScreen;
