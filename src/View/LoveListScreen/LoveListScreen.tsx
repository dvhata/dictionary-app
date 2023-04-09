import React, { PropsWithChildren } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import wordApi from "../../Api/WordApi";
import { Word } from "../../Models/Word/Word";
import * as Speech from "expo-speech";
import { StackScreenProps } from "@react-navigation/stack";

export default function LoveListSreen(
  props: PropsWithChildren<LoveListScreenProps>
) {
  const { navigation } = props;
  const [wordLoveList, setWordLoveList] = React.useState<Word[]>();
  const [loveIconColor, setLoveIconColor] = React.useState<string>("");

  const handleTextToSpeech = React.useCallback((word) => {
    Speech.speak(word);
  }, []);

  const handleAddToFavorite = React.useCallback((favorite, item) => {
    setLoveIconColor("red");
    // if (item === 0) {
    //   setLoveIconColor("red");
    // } else {
    //   setLoveIconColor("black");
    // }
  }, []);

  const handleGotoMeaning = React.useCallback((value: string) => {
    navigation.navigate("WordMeaning", {
      text: value,
    });
  }, []);

  React.useEffect(() => {
    return navigation.addListener("focus", async () => {
      await wordApi.favorite().then((response: any) => {
        setWordLoveList(response);
      });
    });
  }, [setWordLoveList]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 80,
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Your favourite words
      </Text>
      <FlatList
        style={styles.searchContainer}
        data={wordLoveList}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.word}
            onPress={() => handleGotoMeaning(item.word as string)}
          >
            <View style={styles.wordLoveContainer}>
              <View style={styles.wordLoveWord}>
                <Text style={{ fontWeight: "bold", margin: 10 }}>
                  {item.word}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginLeft: 0 }}>
                    <Icon
                      size={12}
                      raised
                      name="play"
                      type="font-awesome"
                      onPress={() => handleTextToSpeech(item.word as string)}
                      tvParallaxProperties={undefined}
                    />
                  </View>
                  <View style={{ marginLeft: 0 }}>
                    <Icon
                      color={loveIconColor}
                      size={12}
                      raised
                      name="heart"
                      type="font-awesome"
                      onPress={() =>
                        handleAddToFavorite(item.favorite, item.word)
                      }
                      tvParallaxProperties={undefined}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.wordLoveMeaning}>
                <Text style={{ margin: 5 }}>
                  {" "}
                  {item?.pronunciation?.slice(1, 20)}{" "}
                </Text>
                <Text style={{ margin: 5 }}> {item?.subMeaning} </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export interface LoveListScreenProps extends StackScreenProps<any> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272C52",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchContainer: {
    width: 300,
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "white",
  },
  wordLoveContainer: {
    flex: 3,
    flexDirection: "row",
  },
  wordLoveWord: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#d0d2d3",
    flexDirection: "column",
  },
  wordLoveMeaning: {
    width: "65%",
    borderWidth: 1,
    borderColor: "#d0d2d3",
  },
});
