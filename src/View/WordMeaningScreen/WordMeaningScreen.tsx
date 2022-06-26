import { StackScreenProps } from "@react-navigation/stack";
import * as Speech from "expo-speech";
import React, { PropsWithChildren } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import wordApi from "../../Api/WordApi";
import { Synonym } from "../../Models/Thesaurus/Synonym";
import { Word } from "../../Models/Word/Word";

export default function WordMeaningScreen(
  props: PropsWithChildren<WordMeaningViewProps>
) {
  const { route, navigation } = props;
  const { text } = route.params;
  const [trans, setTrans] = React.useState<Word>();
  const [synonyms, setSynonyms] = React.useState<Synonym[]>();
  const [antonyms, setAntonyms] = React.useState<Synonym[]>();
  const [colorIconHeart, setColorIconHeart] = React.useState("");

  const handleTextToSpeech = React.useCallback((word) => {
    Speech.speak(word);
  }, []);

  const handleBackToSearchScreen = React.useCallback(() => {
    navigation.goBack();
  }, []);

  const handleGoToEdit = React.useCallback((value: string) => {
    navigation.navigate("Edit", {
      text: value,
    });
  }, []);

  const handleAddToFavorite = React.useCallback((text) => {
    wordApi
      .like(text)
      .then((response: any) => {
        alert("You liked" + `"${response}"`);
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    setColorIconHeart("red");

    wordApi
      .search(text)
      .then((response: any) => {
        setTrans(response.at(0));
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
  }, []);

  const handleRemoveFromFavorite = React.useCallback((text) => {
    wordApi
      .unlike(text)
      .then((response: any) => {
        alert("You unliked" + `"${response}"`);
        setColorIconHeart("black");
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    setColorIconHeart("black");
    wordApi
      .search(text)
      .then((response: any) => {
        setTrans(response.at(0));
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
  }, []);

  const handleDeleteWord = React.useCallback((text) => {
    wordApi
      .delete(text)
      .then((response: any) => {
        alert("Delete word successfully");
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
    navigation.goBack();
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      wordApi
        .search(text)
        .then((response: any) => {
          setTrans(response.at(0));
          response.at(0)?.favorite === 1
            ? setColorIconHeart("red")
            : setColorIconHeart("black");
        })
        .catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });

      wordApi
        .symnonym(text)
        .then((response: any) => {
          setSynonyms(
            response.data.definitionData.definitions.at(0).synonyms || ""
          );
          setAntonyms(
            response.data.definitionData.definitions.at(0).antonyms || ""
          );
        })
        .catch((error) => {});
    };
    fetchData();
  }, []);

  const meaning = trans?.meaning ? trans?.meaning?.split('{"/n"}') : [""];

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        {trans?.changeAble === 1 && (
          <View style={styles.boxIconUser}>
            <Icon
              size={20}
              color="#9ACD32"
              raised
              name="user"
              type="font-awesome"
              tvParallaxProperties={undefined}
            />
          </View>
        )}
        <View style={styles.boxWord}>
          <View>
            <Text style={styles.word}>{trans?.word}</Text>
          </View>

          {trans?.changeAble === 1 && (
            <Icon
              size={16}
              raised
              name="create-outline"
              type="ionicon"
              onPress={() => handleGoToEdit(trans?.word as string)}
              tvParallaxProperties={undefined}
            />
          )}

          {trans?.changeAble === 1 && (
            <Icon
              size={16}
              raised
              name="close"
              type="font-awesome"
              onPress={() => handleDeleteWord(trans?.word)}
              tvParallaxProperties={undefined}
            />
          )}

          <Icon
            size={16}
            raised
            name="play"
            type="font-awesome"
            onPress={() => handleTextToSpeech(trans?.word)}
            tvParallaxProperties={undefined}
          />

          <Icon
            color={colorIconHeart}
            size={16}
            raised
            name="heart"
            type="font-awesome"
            onPress={
              trans?.favorite === 1
                ? () => handleRemoveFromFavorite(text)
                : () => handleAddToFavorite(text)
            }
            tvParallaxProperties={undefined}
          />
        </View>
        <View style={styles.boxTrans}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.boxPronunciation}>
              <Text>{trans?.pronunciation}</Text>
            </View>
          </View>

          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.tagMeaning}>#meaning</Text>
              {meaning &&
                meaning?.map((item) => {
                  return (
                    <>
                      <Text key={item}>{item}</Text>
                    </>
                  );
                })}
            </View>
            <Text style={styles.tagMeaning}>#symnonym</Text>
            <View style={styles.containerSynonyms}>
              {trans?.changeAble === 0 &&
                synonyms &&
                synonyms.map((item) => {
                  return (
                    <View>
                      <Text key={item.term}>{"| " + item.term + " "}</Text>
                    </View>
                  );
                })}
              {trans?.changeAble === 1 && (
                <View>
                  <Text>{trans?.synonym}</Text>
                </View>
              )}
            </View>

            <Text style={styles.tagMeaning}>#antonyms</Text>
            <View style={styles.containerSynonyms}>
              {trans?.changeAble === 0 &&
                antonyms &&
                antonyms.map((item) => {
                  return (
                    <View>
                      <Text key={item.term}>{"| " + item.term + " "}</Text>
                    </View>
                  );
                })}
              {trans?.changeAble === 1 && (
                <View>
                  <Text>{trans?.antonyms}</Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              size={35}
              raised
              name="arrow-back-circle-outline"
              type="ionicon"
              onPress={handleBackToSearchScreen}
              tvParallaxProperties={undefined}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export interface WordMeaningViewParams {
  text: string;
}

export interface WordMeaningViewProps
  extends StackScreenProps<Record<string, WordMeaningViewParams>> {}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#f8d84c",
    alignItems: "center",
    flexDirection: "column",
  },
  boxContainer: {
    width: "80%",
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 20,
  },
  boxWord: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  boxIconUser: {
    marginTop: -40,
    marginLeft: -50,
    marginBottom: -20,
  },
  word: {
    color: "#393318",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  boxTrans: {
    marginTop: 10,
    flexDirection: "column",
  },
  boxPronunciation: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
  },
  scrollView: {
    height: 550,
  },
  tagMeaning: {
    backgroundColor: "#f7d749",
    width: 120,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  containerSynonyms: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});
