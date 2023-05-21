import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/View/HomeScreen/HomeScreen";
import HistoryScreen from "./src/View/LoveListScreen/LoveListScreen";
import QuizScreen from "./src/View/QuizScreen/QuizScreen";
import SettingScreen from "./src/View/TransParagraphScreen/TransParagraphScreen";
import { Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchPlusScreen from "./src/View/TransParagraphScreen/TransParagraphScreen";
import LoveListScreen from "./src/View/LoveListScreen/LoveListScreen";
import AddScreen from "./src/View/AddScreen/AddScreen";
import TransParagraphScreen from "./src/View/TransParagraphScreen/TransParagraphScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#272C52",
          paddingBottom: 15,
          height: 80,
          // border: 0,
          // opacity: 0.8,
        },
        tabBarActiveTintColor:
          route.name === "LoveListStory" ? "pink" : "#7CB9E8",
      })}
    >
      <Tab.Screen
        name="HomeView"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="search" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Translate Paragraph"
        component={TransParagraphScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="language" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="add" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LoveListStory"
        component={LoveListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="heart" color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons size={size} name="flower-outline" color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
