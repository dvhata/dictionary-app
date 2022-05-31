import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import wordApi from "../../Api/WordApi";

export default function AddScreen() {
  const [word, setWord] = React.useState<string>();
  const [pronunciation, setPronunciation] = React.useState<string>();
  const [meaning1, setMeaning1] = React.useState<string>("");
  const [meaning2, setMeaning2] = React.useState<string>("");
  const [meaning3, setMeaning3] = React.useState<string>("");
  const [meaning4, setMeaning4] = React.useState<string>("");
  const [meaning5, setMeaning5] = React.useState<string>("");
  const split = '{"/n"}';
  let meaningTotal: string;

  const handleGetWord = React.useCallback((text) => {
    console.log(text);
    setWord(text);
  }, []);

  const handleGetPronunciation = React.useCallback((text) => {
    const temp = "/" + text + "/";
    setPronunciation(temp);
  }, []);

  const handleGetMeaning1 = React.useCallback((text) => {
    if (text) setMeaning1("-" + text);
  }, []);

  const handleGetMeaning2 = React.useCallback((text) => {
    if (text) setMeaning2(split + "-" + text);
  }, []);

  const handleGetMeaning3 = React.useCallback((text) => {
    if (text) setMeaning3(split + "-" + text);
  }, []);

  const handleGetMeaning4 = React.useCallback((text) => {
    if (text) setMeaning4(split + "-" + text);
  }, []);

  const handleGetMeaning5 = React.useCallback((text) => {
    if (text) setMeaning5(split + "-" + text);
  }, []);

  const handleAddWord = React.useCallback(
    (word, pronunciation, meaningTotal) => {
      console.log("meaning1" + meaning1);
      console.log("meaning2" + meaning2);
      console.log("meaning3" + meaning3);
      console.log("meaning4" + meaning4);
      console.log("meaning5" + meaning5);
      meaningTotal = meaning1 + meaning2 + meaning3 + meaning4 + meaning5;
      wordApi
        .add(word, pronunciation, meaningTotal.slice(0, meaningTotal.length))
        .then((response: any) => {
          response.word
            ? alert(`"${response.word}"` + " succesffuly add")
            : alert(response.message);
        })
        .catch((error) => {
          // console.log("Api call error");
          alert(error.message);
        });
    },
    [meaning1, meaning2, meaning3, meaning4, meaning5]
  );


  return (
    <View style={styles.container}>
      <View style={styles.transParagraphContainer}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Add New Word
        </Text>
        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Add word --</Text>
          <TextInput
            onChangeText={handleGetWord}
            style={styles.transParagraphTextInput}
            placeholder="Enter word..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Add pronunciation --</Text>
          <TextInput
            onChangeText={handleGetPronunciation}
            style={styles.transParagraphTextInput}
            placeholder="Enter pronunciation..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Add meaning --</Text>
          <TextInput
            onChangeText={handleGetMeaning1}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 1..."
            placeholderTextColor="grey"
          />
          <TextInput
            onChangeText={handleGetMeaning2}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 2..."
            placeholderTextColor="grey"
          />
          <TextInput
            onChangeText={handleGetMeaning3}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 3..."
            placeholderTextColor="grey"
          />
          <TextInput
            onChangeText={handleGetMeaning4}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 4..."
            placeholderTextColor="grey"
          />
          <TextInput
            onChangeText={handleGetMeaning5}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 5..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity
            onPress={() =>
              handleAddWord(
                word as string,
                pronunciation as string,
                meaningTotal as string
              )
            }
            style={styles.buttonAdd}
          >
            <Text style={{ color: "white" }}>Add word</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d84c",
    alignItems: "center",
  },
  transParagraphContainer: {
    width: 300,
    marginTop: 70,
    marginBottom: 50,
  },
  transParagraphTextInput: {
    backgroundColor: "white",
    color: "black",
    height: 50,
    padding: 20,
  },
  addContainer: {
    marginTop: 30,
  },
  addLabel: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonAdd: {
    padding: 10,
    backgroundColor: "#3c3f41",
    width: 100,
    borderRadius: 15,
    alignItems: "center",
  },
});
