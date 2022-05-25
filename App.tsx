import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeView from "./src/View/HomeView/HomeView";
import Tab from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WordMeaningView from "./src/View/WordMeaning/WordMeaningView";
import TabNavigator from "./TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const {Navigator, Screen} = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaProvider>
      <NavigationContainer>
        {/* <TabNavigator /> */}
        <Navigator
          initialRouteName="HomeView"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Screen name="TabNavigator" component={TabNavigator} /> */}
          <Screen name="HomeView">
            {() => (
              <TabNavigator />
            )}
          </Screen>
          <Screen name="WordMeaningView" component={WordMeaningView} />
        </Navigator>
      </NavigationContainer>
    // </SafeAreaProvider>
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
