import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/View/HomeScreen/HomeScreen";
import HistoryScreen from "./src/View/HistoryScreen/HistoryScreen";
import QuizScreen from "./src/View/QuizScreen/QuizScreen";
import SettingScreen from "./src/View/SettingScreen/SettingScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeView" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
 
});
