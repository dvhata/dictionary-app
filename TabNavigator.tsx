import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import HistoryView from "./src/View/HistoryView/HistoryView";
import HomeView from "./src/View/HomeView/HomeView";

const {Navigator, Screen} = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Navigator
      initialRouteName="HomeView"
      tabBar={()=> null}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={HomeView} options={{
        tabBarLabel: ({focused: boolean}) => 
          (<Text  style={styles.test}>Home</Text>)
        ,
      }}/>
      <Screen name="HistoryView" component={HistoryView} options={{
        tabBarLabel: ({focused: boolean}) => 
        (<Text>HistoryView</Text>),
      }}/>
    </Navigator>
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
  test: {
    color: "red",
    backgroundColor: "blue"
  },
});
