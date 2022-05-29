import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import wordApi from "../../Api/WordApi";
import { Synonym } from "../../Models/Thesaurus/Synonym";
import { Thesaurus } from "../../Models/Thesaurus/Thesaurus";
import { Word } from "../../Models/Word/Word";

export default function WordMeaningScreen(
  props: PropsWithChildren<WordMeaningViewProps>
) {
  const { route } = props;
  const { text } = route.params;
  const [trans, setTrans] = React.useState<Word>();
  const [synonyms, setSynonyms] = React.useState<Synonym[]>();
  const [antonyms, setAntonyms] = React.useState<Synonym[]>();

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
          <Text style={styles.word}>{text}</Text>
          <Icon
            color="red"
            size={16}
            style={styles.iconHeart}
            raised
            name="heart"
            type="font-awesome"
            onPress={() => console.log("hello")}
            tvParallaxProperties={undefined}
          />
        </View>
        <View style={styles.boxTrans}>
          <View style={styles.boxPronunciation}>
            <Text>{trans?.pronunciation}</Text>
            <Icon
              size={10}
              style={styles.iconPlay}
              raised
              name="play"
              type="font-awesome"
              onPress={() => console.log("hello")}
              tvParallaxProperties={undefined}
            />
          </View>

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
                    <Text key={item.term}>{item.term + ", "}</Text>
                  </View>
                );
              })}
          </View>
        </View>
        <Text style={styles.tagMeaning}>#antonyms</Text>
        <View style={styles.containerSynonyms}>
          {antonyms &&
            antonyms.map((item) => {
              return (
                <View>
                  <Text key={item.term}>{item.term + ", "}</Text>
                </View>
              );
            })}
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
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconPlay: {
    // marginLeft: 10,
  },
  boxTrans: {
    marginTop: 10,
    flexDirection: "column",
  },
  boxPronunciation: {
    marginTop: 10,
    flexDirection: "row",
  },
  iconHeart: {
    marginLeft: 10,
  },
  tagMeaning: {
    backgroundColor: "#f7d749",
    width: 120,
    padding: 10,

    marginTop: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
  containerSynonyms: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});
