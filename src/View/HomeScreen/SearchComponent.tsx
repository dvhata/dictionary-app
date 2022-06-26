import React, { PropsWithChildren } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import wordApi from "../../Api/WordApi";
import { Word } from "../../Models/Word/Word";
import axios from "axios";
import { Icon } from "react-native-elements";

export default function SearchComponent(
  props: PropsWithChildren<SearchComponentProps>
) {
  const { textInput, onPress, wordSearchList, wordRecentList } = props;

  return (
    <View>
      <FlatList
        style={styles.searchContainer}
        data={textInput ? wordSearchList : wordRecentList}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.word}
            onPress={() => onPress(item.word as string)}
          >
            <View style={styles.wordListContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.wordListWord}> {item.word}</Text>
                <View style={{marginTop:-10}}>
                  {item?.changeAble === 1 && (
                    <Icon
                      size={10}
                      color="#9ACD32"
                      raised
                      name="user"
                      type="font-awesome"
                      tvParallaxProperties={undefined}
                    />
                  )}
                </View>
              </View>
              <Text> {item?.pronunciation?.slice(1, 20)} </Text>
              <Text> {item?.subMeaning?.slice(1, 50)} </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export interface SearchComponentProps {
  textInput?: string;
  onPress: (value: string) => void;
  wordSearchList?: Word[];
  wordRecentList?: Word[];
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#d7d9db",
    height: 70,
    marginBottom: 220,
    width: 240,
  },
  wordListContainer: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    borderBottomColor: "#a1a4a4",
    borderBottomWidth: 1,
  },
  wordListWord: {
    fontWeight: "bold",
  },
});
