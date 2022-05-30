import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import wordApi from "../../Api/WordApi";
import { Word } from "../../Models/Word/Word";
import SearchComponent from "./SearchComponent";

export default function HomeScreen(props: PropsWithChildren<HomeViewProps>) {
  const { navigation } = props;
  const [wordSearch, setWordSearch] = React.useState();
  const [wordSearchList, setWordSearchList] = React.useState<Word[]>();
  const [wordRecentList, setWordRecentList] = React.useState<Word[]>();

  const handleSearch = React.useCallback((text) => {
    setWordSearch(text);
  }, []);

  const handleGotoMeaning = React.useCallback((value: string) => {
    navigation.navigate("WordMeaning", {
      text: value,
    });
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      wordApi
        .lookUp(wordSearch)
        .then((response: any) => {
          setWordSearchList(response);
        })
        .catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });
      wordApi
        .recent()
        .then((response: any) => {
          setWordRecentList(response);

        })
        .catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });
    };
    fetchData();
  }, [wordSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Smart Dictionary</Text>
            <Text style={styles.textSubHeader}>Eng-Viet</Text>
            <View>
              <Text></Text>
              <TextInput
                onChangeText={handleSearch}
                placeholderTextColor="black"
                placeholder="Search here..."
                style={styles.textInput}
              />
              {wordRecentList && wordSearchList && (
                <SearchComponent
                  textInput={wordSearch}
                  wordSearchList={wordSearchList}
                  wordRecentList={wordRecentList}
                  onPress={handleGotoMeaning}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export interface HomeViewProps extends StackScreenProps<any> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d84c",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchContainer: {
    marginTop: 80,
    marginBottom: 50,
  },
  tabContainer: {
    width: "100%",
    height: 60,
    marginBottom: 60,
  },
  header: {
    flex: 1,
    backgroundColor: "#414445",
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
  },
  textHeader: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    
  },
  textSubHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  dropdown: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
  },
  searchBox: {
    backgroundColor: "#f9f9f9",
    height: "300",
    width: "1000",
  },
  textInput: {
    backgroundColor: "white",
    height: 50,
    width: 240,
    padding: 10,
    fontSize: 14,
  },
});
