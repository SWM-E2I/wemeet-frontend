import {
  SafeAreaView,
  Pressable,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  subColorBlack,
  subColorBlack2,
  mainColor,
  subColorPink,
} from "../styles/commonStyles";
import registerStyles from "../styles/registerStyles";
import { univList } from "../assets/datasets";

const UnivSearchModal = ({ navigation, route }) => {
  const setUniv = route.params?.setUniv;
  const setStage = route.params?.setStage;
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  useEffect(() => {
    setResult(univList.filter((item) => item.value.includes(text)));
  }, [text]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        style={{ height: Dimensions.get("window").height * 0.15 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View
          style={[
            registerStyles.inputTextView,
            { marginBottom: 20, borderColor: "white" },
          ]}
        >
          <TextInput
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
            style={[
              registerStyles.inputTextBox,
              registerStyles.inputText,
              { fontSize: 18 },
            ]}
            // autoFocus
            enablesReturnKeyAutomatically
            placeholder={"학교명으로 검색"}
            placeholderTextColor={"#C4C4C4"}
          ></TextInput>
        </View>
        <ScrollView
          style={{
            height: Dimensions.get("window").height * 0.85,
            width: Dimensions.get("window").width,
          }}
          contentContainerStyle={{
            paddingHorizontal: "7.5%",
          }}
        >
          {result.length == 0 ? (
            <Text style={styles.itemText}>검색 결과가 없습니다</Text>
          ) : (
            result.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => {
                    setUniv(item.key);
                    if (setStage) setStage(2);
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.itemText}>{item.value}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get("window").height * 0.8,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: subColorBlack2,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderColor: "white",
    // borderWidth: 1,
  },
  itemContainer: {
    paddingVertical: 6,
  },
  itemText: {
    color: "white",
    fontFamily: "pretendard500",
    fontSize: 18,
  },
});

export default UnivSearchModal;
