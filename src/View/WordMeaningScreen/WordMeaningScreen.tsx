import { StackScreenProps } from "@react-navigation/stack";
import * as Speech from "expo-speech";
import React, { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import wordApi from "../../Api/WordApi";
import { Synonym } from "../../Models/Thesaurus/Synonym";
import { Word } from "../../Models/Word/Word";
import HomeScreen from "../HomeScreen/HomeScreen";

export default function WordMeaningScreen(
  props: PropsWithChildren<WordMeaningViewProps>
) {
  const { route, navigation } = props;
  const { text } = route.params;
  const [trans, setTrans] = React.useState<Word>();
  const [synonyms, setSynonyms] = React.useState<Synonym[]>();
  const [antonyms, setAntonyms] = React.useState<Synonym[]>();

  const handleTextToSpeech = React.useCallback(() => {
    Speech.speak(text);
  }, []);

  const handleBackToSearchScreen = React.useCallback(() => {
    navigation.goBack();
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      wordApi
        .search(text)
        .then((response: any) => {
          setTrans(response.at(0));
        })
        .catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });
      wordApi
        .symnonym(text)
        .then((response: any) => {
          setSynonyms(response.data.definitionData.definitions.at(0).synonyms);
          setAntonyms(response.data.definitionData.definitions.at(0).antonyms);
        })
        .catch((error) => {
          console.log("Api call error");
          alert(error.message);
        });
    };
    fetchData();
  }, []);
  const meaning = trans?.meaning?.split('{"/n"}');

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.boxWord}>
          <View>
            <Text style={styles.word}>{text}</Text>
          </View>
          <View>
            <Icon
              size={16}
              raised
              name="play"
              type="font-awesome"
              onPress={handleTextToSpeech}
              tvParallaxProperties={undefined}
            />
          </View>
          <View>
            <Icon
              color="black"
              size={16}
              raised
              name="heart"
              type="font-awesome"
              onPress={handleTextToSpeech}
              tvParallaxProperties={undefined}
            />
          </View>
        </View>
        <View style={styles.boxTrans}>
          <View style={styles.boxPronunciation}>
            <Text>{trans?.pronunciation}</Text>
          </View>

          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.tagMeaning}>#meaning</Text>
              {meaning?.map((item) => {
                return (
                  <>
                    <Text key={item}>{item}</Text>
                  </>
                );
              })}
            </View>
            <Text style={styles.tagMeaning}>#symnonym</Text>
            <View style={styles.containerSynonyms}>
              {synonyms &&
                synonyms.map((item) => {
                  return (
                    <View>
                      <Text key={item.term}>{"| " + item.term + " "}</Text>
                    </View>
                  );
                })}
            </View>

            <Text style={styles.tagMeaning}>#antonyms</Text>
            <View style={styles.containerSynonyms}>
              {antonyms &&
                antonyms.map((item) => {
                  return (
                    <View>
                      <Text key={item.term}>{"| " + item.term + " "}</Text>
                    </View>
                  );
                })}
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
