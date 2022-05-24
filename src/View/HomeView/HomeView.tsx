import { NavigationContainer } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Stack } from "react-native-router-flux";
import SearchView from "./SearchView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizView from "../QuizView/QuizView";
import WordMeaning from "../WordMeaning/WordMeaningView";
import Tab from "../../../Tab";
import { StackScreenProps } from "@react-navigation/stack";

function HomeView(props: PropsWithChildren<HomeViewProps>) {
  const {navigation} = props;
  const [wordSearch, setWordSearch] = React.useState();
  const [showSearchView, setShowSearchView] = React.useState<boolean>(false);

  const handleSearch = React.useCallback((text) => {
    setWordSearch(text);
    text ? setShowSearchView(true) : setShowSearchView(false);
  }, []);

  const handleGotoMeaning = React.useCallback((value: string) => {
    navigation.navigate("WordMeaningView", {
      text: value,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Từ điển thông minh</Text>
            <Text style={styles.textSubHeader}>Tra cả thế giới</Text>
            <View>
              <Text></Text>
              <TextInput
                onChangeText={handleSearch}
                placeholderTextColor="black"
                placeholder="Search here..."
                style={styles.textInput}
              />
              {showSearchView && <SearchView onPress={handleGotoMeaning} />}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab />
      </View>
    </View>
  );
}

export interface HomeViewProps extends StackScreenProps<any> {}

HomeView.displayName = "";

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d84c",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchContainer: {
    marginTop: 150,
    marginBottom: 50,
  },
  tabContainer: {
    width: "100%",
    height: 60,
    marginBottom: 60,
  },
  header: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    // justifyContent: "center",
    borderRadius: 15,
    padding: 20,
  },
  textHeader: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  textSubHeader: {
    fontSize: 14,
  },
  dropdown: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
  },
  searchBox: {
    // marginTop: 20,
    // marginBottom: 30,
    backgroundColor: "#f9f9f9",
    height: "300",
    width: "1000",
  },
  textInput: {
    backgroundColor: "white",
    height: 40,
    width: 200,
  },
});
