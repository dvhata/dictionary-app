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
const baseUrl = "192.168.0.111:3000/words/";

export default function SearchComponent(
  props: PropsWithChildren<SearchComponentProps>
) {
  const { onPress, data } = props;
  

  return (
    <View>
      <FlatList
        style={styles.searchContainer}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.word} onPress={() => onPress}>
            <View style={styles.wordListContainer}>
              <Text style={styles.wordListWord}> {item.word} </Text>
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
  onPress: (value: string) => void;
  data: Word[];
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
    fontWeight: "bold"
  }
});
