import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import { View, Text } from "react-native";

export default function WordMeaningView(props: PropsWithChildren<WordMeaningViewProps>) {
  const {navigation, route} = props;

  const {text} = route.params;

  React.useEffect(() => {
    console.log(text);
  }, [])

  return (
    <View>
      <Text>Day la nghia cua tu {text}</Text>
    </View>
  );
}

export interface WordMeaningViewParams {
  text: string;
}

export interface WordMeaningViewProps 
  extends StackScreenProps<Record<string, WordMeaningViewParams>>{}