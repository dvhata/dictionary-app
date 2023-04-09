import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { Icon } from "react-native-vector-icons/Icon";
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
      <View style={styles.header}>
        <Text style={styles.textHeader}>E-Dictionary</Text>
        <Text style={styles.textSubHeader}>Eng-Viet</Text>
      </View>
      <View style={styles.searchContainer}>
        <View>
          <View style={styles.searchArea}>
            <Text></Text>
            <View
              style={{
                borderRadius: 10,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Ionicons
                size={20}
                name="search"
                color={"#CFAB36"}
                style={styles.searchIcon}
              />

              <TextInput
                onChangeText={handleSearch}
                placeholderTextColor="white"
                placeholder="Search here..."
                style={styles.textInput}
              />
            </View>
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
    // </View>
  );
}

export interface HomeViewProps extends StackScreenProps<any> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272C52",
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
    backgroundColor: "none",
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
    marginBottom: 50,
    marginTop: 50,
  },
  textHeader: {
    // top: "20px",
    fontSize: 54,
    fontWeight: "bold",
    color: "#CFAB36",
  },
  textSubHeader: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#CFAB36",
  },
  dropdown: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
  },
  // searchSection: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  // },
  searchIcon: {
    // padding: 10,
    position: "absolute",
    top: 39,
    left: 10,
  },
  searchBox: {
    backgroundColor: "#f9f9f9",
    height: "300",
    width: "1000",
  },
  textInput: {
    backgroundColor: "#CFAB36",
    opacity: 0.4,
    padding: 10,
    marginBottom: 333,
    marginLeft: 40,
    marginRight: 20,
    marginTop: 30,
    fontSize: 14,
  },
  searchArea: {
    backgroundColor: "none",
    justifyContent: "center",
    width: 390,
    height: 504,
    borderRadius: 8,
    // boxShadow: "5px 5px 1px 1px midnightblue",
  },
});
