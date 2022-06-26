import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import transParagraphApi from "../../Api/TransParagraphApi";
import * as Speech from "expo-speech";
import { Icon } from "react-native-elements";

export default function TransParagraphScreen() {
  const [textInput, setTextInput] = React.useState<string>();
  const [result, setResult] = React.useState<string>();

  //dropdown to select language trans
  const [openTarget, setOpenTarget] = React.useState(false);
  const [valueTarget, setValueTarget] = React.useState<string>();
  const [openSource, setOpenSource] = React.useState(false);
  const [valueSource, setValueSource] = React.useState<string>();
  const [items, setItems] = React.useState([
    { value: "vi", label: "Vietnameses" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "ru", label: "Russia" },
    { value: "it", label: "Italia" },
    { value: "ja", label: "Japan" },
    { value: "ko", label: "Korea" },
    { value: "th", label: "Thailand" },
  ]);

  const handleSelectSourceLanguage = React.useCallback((item) => {
    setValueSource(item.value);
  }, []);

  const handleSelectTargetLanguage = React.useCallback((item) => {
    setValueTarget(item.value);
  }, []);

  //trans

  const handleGetTextInput = React.useCallback((textInput: string) => {
    setTextInput(textInput);
  }, []);

  const handleTrans = React.useCallback((textInput, source, target) => {
    transParagraphApi
      .trans(textInput, source, target)
      .then((response: any) => {
        setResult(response);
      })
      .catch((error) => {
        console.log("Api call error");
        alert(error.message);
      });
  }, []);

  const handleTextToSpeech = React.useCallback((text) => {
    Speech.speak(text);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.transParagraphContainer}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Translate paragraphs
        </Text>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2452/2452150.png",
            }}
          />
        </View>

        <View style={{ flexDirection: "row", zIndex: 100, marginTop: 30 }}>
          <View style={{ width: "50%" }}>
            <DropDownPicker
              onSelectItem={handleSelectSourceLanguage}
              open={openSource}
              value={valueSource as string}
              items={items}
              setOpen={setOpenSource}
              setValue={setValueSource}
              setItems={setItems}
              maxHeight={120}
            />
          </View>
          <View style={{ width: "50%" }}>
            <DropDownPicker
              onSelectItem={handleSelectTargetLanguage}
              open={openTarget}
              value={valueTarget as string}
              items={items}
              setOpen={setOpenTarget}
              setValue={setValueTarget}
              setItems={setItems}
              maxHeight={120}
            />
          </View>
        </View>

        <TextInput
          placeholderTextColor="grey"
          onChangeText={handleGetTextInput}
          style={styles.transParagraphTextInput}
          placeholder="Enter paragraphs..."
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            handleTrans(
              textInput as string,
              valueSource as string,
              valueTarget as string
            )
          }
          style={styles.buttonTrans}
        >
          <Text style={{ color: "white" }}>Translate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.transParagraphResult}>
        <View>
          {/* <Text> {result}</Text> */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {result}
          </Text>
        </View>

        <View>
          <Icon
            size={16}
            raised
            name="play"
            type="font-awesome"
            onPress={() => handleTextToSpeech(result)}
            tvParallaxProperties={undefined}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe159",
    alignItems: "center",
  },
  transParagraphContainer: {
    width: 300,
    marginTop: 80,
    marginBottom: 50,
  },
  transParagraphTextInput: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "white",
    height: 100,
  },
  buttonTrans: {
    padding: 10,
    backgroundColor: "#3c3f41",
    width: 100,
    borderRadius: 15,
    alignItems: "center",
  },
  transParagraphResult: {
    width: 300,
    height: 100,
    justifyContent: "center",
    padding: 10,
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: "white",
  },
});
