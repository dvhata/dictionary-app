import { StackScreenProps } from "@react-navigation/stack";
import React, { PropsWithChildren } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
// import { RNToasty } from "react-native-toasty";
import wordApi from "../../Api/WordApi";
import { Word } from "../../Models/Word/Word";

export default function UpdateScreen(
  props: PropsWithChildren<UpdateScreenProps>
) {
  const speeling_data = [
    "'",
    "ɪ",
    "i:",
    "ʊ",
    "u:",
    "e",
    "ə",
    "ɜ:",
    "ɒ",
    "ɔ:",
    "æ",
    "ʌ",
    "ɑ:",
    "ɪə",
    "ʊə",
    "eə",
    "eɪ",
    "ɔɪ",
    "aɪ",
    "əʊ",
    "aʊ",
    "p",
    "b",
    "t",
    "d",
    "t∫",
    "dʒ",
    "k",
    "g",
    "f",
    "v",
    "ð",
    "θ",
    "s",
    "z",
    "∫",
    "ʒ",
    "m",
    "n",
    "η",
    "l",
    "r",
    "w",
    "j",
  ];

  const { route, navigation } = props;
  const { text } = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const [trans, setTrans] = React.useState<Word>();
  const [wordUpdate, setWordUpdate] = React.useState<string>("");
  const [tempPronunciationUpdate, setTempPronunciationUpdate] =
    React.useState<string>("");
  const [pronunciationUpdate, setPronunciationUpdate] =
    React.useState<string>("");
  const [synonymUpdate, setSynonymUpdate] = React.useState<string>("");
  const [meaningTotalUpdate, setMeaningTotalUpdate] =
    React.useState<string>("");
  const [antonymsUpdate, setAntonymsUpdate] = React.useState<string>("");

  const meaning = trans?.meaning ? trans?.meaning?.split('{"/n"}') : [""];
  const split = '{"/n"}';

  const [meaning1Update, setMeaning1Update] = React.useState<string>("");
  const [meaning2Update, setMeaning2Update] = React.useState<string>("");
  const [meaning3Update, setMeaning3Update] = React.useState<string>("");

  const handleGetWordUpdate = React.useCallback((text) => {
    setWordUpdate(text);
  }, []);

  const handleGetPronunciation = React.useCallback(
    (text, tempPronunciation) => {
      setTempPronunciationUpdate(tempPronunciation + text);
      setPronunciationUpdate("/" + tempPronunciation + "/");
    },
    [tempPronunciationUpdate, pronunciationUpdate]
  );

  const handleResetPronunciation = React.useCallback(() => {
    setTempPronunciationUpdate("");
  }, [tempPronunciationUpdate]);

  const handleGetMeaning1Update = React.useCallback((text) => {
    if (text) setMeaning1Update("-" + text);
  }, []);

  const handleGetMeaning2Update = React.useCallback((text) => {
    if (text) setMeaning2Update(split + "-" + text);
  }, []);

  const handleGetMeaning3Update = React.useCallback((text) => {
    if (text) setMeaning3Update(split + "-" + text);
  }, []);

  const handleGetSynonym = React.useCallback((text) => {
    setSynonymUpdate(text);
  }, []);

  const handleGetAntonyms = React.useCallback((text) => {
    setAntonymsUpdate(text);
  }, []);

  const handleUpdateWord = React.useCallback(
    (
      oldWord,
      wordUpdate,
      pronunciationUpdate,
      meaning1Update,
      meaning2Update,
      meaning3Update,
      synonymUpdate,
      antonymsUpdate
    ) => {
      setMeaningTotalUpdate(meaning1Update + meaning2Update + meaning3Update);
      console.log(meaningTotalUpdate);

      wordApi
        .update(
          oldWord,
          wordUpdate,
          pronunciationUpdate,
          meaningTotalUpdate,
          synonymUpdate,
          antonymsUpdate
        )
        .then((response: any) => {
          console.log("Update Word Successfully")
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    [
      text,
      wordUpdate,
      pronunciationUpdate,
      meaning1Update,
      meaning2Update,
      meaning3Update,
      synonymUpdate,
      antonymsUpdate,
    ]
  );

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
    };
    fetchData();
    setWordUpdate(text as string);
    setPronunciationUpdate(trans?.pronunciation as string);
    setSynonymUpdate(trans?.synonym as string);
    setAntonymsUpdate(trans?.antonyms as string);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.transParagraphContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Update Word: "{text}"
        </Text>
        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Update word --</Text>
          <TextInput
            defaultValue={trans?.word}
            onChangeText={handleGetWordUpdate}
            style={styles.transParagraphTextInput}
            placeholder="Enter word..."
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Update pronunciation --</Text>
          <TextInput
            editable={false}
            value={
              tempPronunciationUpdate === ""
                ? trans?.pronunciation
                : "/" + tempPronunciationUpdate + "/"
            }
            style={styles.transParagraphTextInput}
            placeholderTextColor="grey"
          />

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Enter new pronunciation</Text>
          </Pressable>
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Update meaning --</Text>

          <TextInput
            defaultValue={meaning.at(0)}
            onChangeText={handleGetMeaning1Update}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 1..."
            placeholderTextColor="grey"
          />

          <TextInput
            defaultValue={meaning.at(1)}
            onChangeText={handleGetMeaning2Update}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 1..."
            placeholderTextColor="grey"
          />

          <TextInput
            defaultValue={meaning.at(2)}
            onChangeText={handleGetMeaning3Update}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 3..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Update synonyms --</Text>
          <TextInput
            defaultValue={trans?.synonym}
            onChangeText={handleGetSynonym}
            style={styles.transParagraphTextInput}
            placeholder="Enter synonyms..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Update antonyms --</Text>
          <TextInput
            defaultValue={trans?.antonyms}
            onChangeText={handleGetAntonyms}
            style={styles.transParagraphTextInput}
            placeholder="Enter antonyms..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              handleUpdateWord(
                text,
                wordUpdate,
                pronunciationUpdate,
                meaning1Update,
                meaning2Update,
                meaning3Update,
                synonymUpdate,
                antonymsUpdate
              )
            }
            style={styles.buttonAdd}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.pronunciationContainer}>
                {speeling_data.splice(0, 10).map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleGetPronunciation(item, tempPronunciationUpdate)
                      }
                      style={styles.pronunciationButton}
                      key={item}
                    >
                      <Text style={styles.pronunciationText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.pronunciationContainer}>
                {speeling_data.splice(0, 10).map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleGetPronunciation(item, tempPronunciationUpdate)
                      }
                      style={styles.pronunciationButton}
                      key={item}
                    >
                      <Text style={styles.pronunciationText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.pronunciationContainer}>
                {speeling_data.splice(0, 10).map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleGetPronunciation(item, tempPronunciationUpdate)
                      }
                      style={styles.pronunciationButton}
                      key={item}
                    >
                      <Text style={styles.pronunciationText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.pronunciationContainer}>
                {speeling_data.splice(0, 10).map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleGetPronunciation(item, tempPronunciationUpdate)
                      }
                      style={styles.pronunciationButton}
                      key={item}
                    >
                      <Text style={styles.pronunciationText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.pronunciationContainer}>
                {speeling_data.splice(0, 4).map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleGetPronunciation(item, tempPronunciationUpdate)
                      }
                      style={styles.pronunciationButton}
                      key={item}
                    >
                      <Text style={styles.pronunciationText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleResetPronunciation}
              >
                <Text style={styles.textStyle}>Reset</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export interface UpdateScreenParams {
  text: string;
}

export interface UpdateScreenProps
  extends StackScreenProps<Record<string, UpdateScreenParams>> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8d84c",
    alignItems: "center",
  },
  transParagraphContainer: {
    width: 300,
    marginTop: 70,
    marginBottom: 0,
  },
  transParagraphTextInput: {
    backgroundColor: "white",
    color: "black",
    height: 50,
    padding: 10,
    paddingLeft: 20,
  },
  addContainer: {
    marginTop: 10,
  },
  addLabel: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonAdd: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3c3f41",
    width: 100,
    borderRadius: 15,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  // css Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  modalView: {
    height: 420,
    width: 400,
    margin: 20,
    backgroundColor: "#d6d7db",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#3c3f41",
  },
  buttonClose: {
    width: 100,
    backgroundColor: "#f8d84c",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  // pronunciation selection options
  pronunciationContainer: {
    flexDirection: "row",
    margin: 10,
  },
  pronunciationButton: {
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 5,
    width: 30,
    height: 40,
  },
  pronunciationText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    paddingTop: 10,
  },
});
