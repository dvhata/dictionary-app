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
import type {StackScreenProps} from '@react-navigation/stack';

export default function SearchView (props: PropsWithChildren<SearchViewProps>){

  // const handleGoWordMeaning = React.useCallback((wording: string) => {
  //   navigation.
  // },[])
  const {onPress} = props;

  return (
    <View>
      <FlatList
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(item.key)}
          >
            <Text style={styles.item}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export interface SearchViewProps{
  onPress: (value: string) => void;
}

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    // flexDirection: "row",
    // backgroundColor: "#f9f9f9",
    // alignItems: "center",
    // justifyContent: "center",
    // marginBottom: 0,
  },
  textInput: {
    backgroundColor: "gray",
    height: "200",
  },
  button: {},
});
