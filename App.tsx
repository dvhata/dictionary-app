import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeView from "./src/View/HomeView/HomeView";
import Tab from "./Tab";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WordMeaningView from "./src/View/WordMeaning/WordMeaningView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeView"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeView" component={HomeView} />
          <Stack.Screen name="WordMeaningView" component={WordMeaningView} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
