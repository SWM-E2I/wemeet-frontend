import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Initial Commit</Text>
      <TouchableOpacity>
        <View
          style={{
            width: 120,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 17,
          }}
        >
          <Text>Kick Off</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    kdkd: "sadkdskafas",
  },
});
