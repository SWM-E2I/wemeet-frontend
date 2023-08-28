import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import registerStyles from "../../styles/registerStyles";
import { subColorBlack2, subColorPink } from "../../styles/commonStyles";

const MbtiComponent = ({ mbti, setMbti, letters }) => {
  return letters.map((letter, idx) => {
    return (
      <View key={idx}>
        <TouchableOpacity
          style={[
            styles.mbtiComponent,
            mbti[idx] == letters[idx]
              ? null
              : { backgroundColor: subColorBlack2 },
          ]}
          onPress={() => {
            if (mbti == "XXXX") {
              // Convert the string to an array
              let tmpArray = "ESTP".split("");
              // Update the character at the specified index
              tmpArray[idx] = letter;
              // Convert the array back to a string
              tmp = tmpArray.join("");
              setMbti(tmp);
            } else
              setMbti(
                mbti.substring(0, idx) + letter + mbti.substring(idx + 1, 4)
              );
          }}
        >
          <Text
            style={[
              registerStyles.inputText,
              mbti[idx] == letters[idx] ? { color: subColorPink } : null,
            ]}
          >
            {letter}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  mbtiComponent: {
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
  },
});

export default MbtiComponent;
