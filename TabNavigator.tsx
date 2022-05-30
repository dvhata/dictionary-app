import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/View/HomeScreen/HomeScreen";
import HistoryScreen from "./src/View/LoveListScreen/LoveListScreen";
import QuizScreen from "./src/View/QuizScreen/QuizScreen";
import SettingScreen from "./src/View/SeachPlusScreen/SeachPlusScreen";
import { Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchPlusScreen from "./src/View/SeachPlusScreen/SeachPlusScreen";
import LoveListScreen from "./src/View/LoveListScreen/LoveListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#414445", padding: 15, height: 70 },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="HomeView"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="search-circle-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Seach Plus"
        component={SearchPlusScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="add-circle-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LoveListStory"
        component={LoveListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="heart-circle-outline" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="flower-outline" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
