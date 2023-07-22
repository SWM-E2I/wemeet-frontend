import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import registerStyles from "../../styles/registerStyles";

const MbtiComponent = ({ mbti, setMbti, letters }) => {
  return letters.map((letter, idx) => {
    return (
      <View key={idx}>
        <TouchableOpacity
          style={[
            styles.mbtiComponent,
            mbti[idx] == letters[idx]
              ? null
              : { backgroundColor: "#E9E9E9", borderWidth: 0 },
          ]}
          onPress={() => {
            setMbti(
              mbti.substring(0, idx) + letter + mbti.substring(idx + 1, 4)
            );
          }}
        >
          <Text
            style={[
              registerStyles.inputText,
              mbti[idx] == letters[idx] ? { color: "black" } : null,
            ]}
          >
            {letter}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });
};

//           {letters.map((letter, idx) => {
//             return (
//               <>
//               <TouchableOpacity
//                 style={[
//                   styles.mbtiComponent,
//                   mbti[idx] == letters[idx]
//                     ? null
//                     : { backgroundColor: "#E9E9E9", borderWidth: 0 },
//                 ]}
//                 onPress={() => {
//                   setMbti(
//                     mbti.substring(0, idx) + letter + mbti.substring(idx + 1, 4)
//                   );
//                 }}
//               >

//               </TouchableOpacity></>
//             );

//           }

//   );
// }

const styles = StyleSheet.create({
  mbtiComponent: {
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default MbtiComponent;
