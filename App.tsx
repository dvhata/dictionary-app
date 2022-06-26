import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import WordMeaningScreen from "./src/View/WordMeaningScreen/WordMeaningScreen";
import EditScreen from "./src/View/EditScreen/EditScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }  }>
        <Stack.Screen name="Dictionary Plus" component={TabNavigator} />
        <Stack.Screen name="WordMeaning" component={WordMeaningScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d84c",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
