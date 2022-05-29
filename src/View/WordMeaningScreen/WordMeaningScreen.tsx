import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function WordMeaningScreen(
  props: PropsWithChildren<WordMeaningViewProps>
) {
  const { route } = props;

  const { text } = route.params;

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
        <View style={styles.boxMeaning}>
          <Text>Phien am </Text>
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
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconPlay: {
    // marginLeft: 10,
  },
  boxMeaning: {
    marginTop: 10,
    flexDirection: "row",
  },
  iconHeart: {
    marginLeft: 10,
  },
});
