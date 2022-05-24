import React from "react";
import { Alert, Button, SafeAreaView, View, StyleSheet } from "react-native";

export default function Tab() {
  return (
    <View style={styles.tab}>
      <Button
        title="Tra cứu"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
      <Button
        title="Yêu thích"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
      <Button
        title="Quiz"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
      <Button
        title="Cài đặt"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  buttonTab: {
    color: "red",
  },
});
