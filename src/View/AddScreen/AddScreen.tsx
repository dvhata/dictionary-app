import React from "react";
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

export default function AddScreen() {
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

  const [modalVisible, setModalVisible] = React.useState(false);
  const [word, setWord] = React.useState<string>();
  const [tempPronunciation, setTempPronunciation] = React.useState<string>("");
  const [pronunciation, setPronunciation] = React.useState<string>();
  // const [oldPronunciation, setOldPronunciation] = React.useState<string>();
  const [meaning1, setMeaning1] = React.useState<string>("");
  const [meaning2, setMeaning2] = React.useState<string>("");
  const [meaning3, setMeaning3] = React.useState<string>("");
  // const [meaning4, setMeaning4] = React.useState<string>("");
  // const [meaning5, setMeaning5] = React.useState<string>("");
  const [synonym, setSynonym] = React.useState<string>("");
  const [antonyms, setAntonyms] = React.useState<string>("");
  const split = '{"/n"}';
  let meaningTotal: string;

  const handleGetWord = React.useCallback((text) => {
    setWord(text);
  }, []);

  const handleGetPronunciation = React.useCallback(
    (text, tempPronunciation) => {
      setTempPronunciation(tempPronunciation + text);
      setPronunciation("/" + tempPronunciation + "/");
    },
    [tempPronunciation, pronunciation]
  );

  const handleResetPronunciation = React.useCallback(() => {
    setTempPronunciation("");
  }, [tempPronunciation]);

  const handleGetMeaning1 = React.useCallback((text) => {
    if (text) setMeaning1("-" + text);
  }, []);

  const handleGetMeaning2 = React.useCallback((text) => {
    if (text) setMeaning2(split + "-" + text);
  }, []);

  const handleGetMeaning3 = React.useCallback((text) => {
    if (text) setMeaning3(split + "-" + text);
  }, []);

  const handleGetSynonym = React.useCallback((text) => {
    setSynonym(text);
  }, []);

  const handleGetAntonyms = React.useCallback((text) => {
    setAntonyms(text);
  }, []);

  const handleAddWord = React.useCallback(
    (word, pronunciation, meaningTotal, synonym, antonyms) => {
      meaningTotal = meaning1 + meaning2 + meaning3;
      wordApi
        .add(
          word,
          pronunciation,
          meaningTotal.slice(0, meaningTotal.length),
          synonym,
          antonyms
        )
        .then((response: any) => {
          alert("Add Word Successfully");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    [word, pronunciation, meaning1, meaning2, meaning3]
  );

  return (
    <View style={styles.container}>
      <View style={styles.transParagraphContainer}>
        <Text
          style={{
            fontSize: 20,
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
          {pronunciation && (
            <TextInput
              value={"/" + tempPronunciation + "/"}
              style={styles.transParagraphTextInput}
              placeholderTextColor="grey"
            />
          )}

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Enter your pronunciation</Text>
          </Pressable>
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
          {/* <TextInput
            onChangeText={handleGetMeaning4}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 4..."
            placeholderTextColor="grey"
          /> */}
          {/* <TextInput
            onChangeText={handleGetMeaning5}
            style={styles.transParagraphTextInput}
            placeholder="Enter meaning 5..."
            placeholderTextColor="grey"
          /> */}
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Add synonyms --</Text>
          <TextInput
            onChangeText={handleGetSynonym}
            style={styles.transParagraphTextInput}
            placeholder="Enter synonyms..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.addContainer}>
          <Text style={styles.addLabel}>-- Add antonyms --</Text>
          <TextInput
            onChangeText={handleGetAntonyms}
            style={styles.transParagraphTextInput}
            placeholder="Enter antonyms..."
            placeholderTextColor="grey"
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              handleAddWord(
                word,
                pronunciation,
                meaningTotal,
                synonym,
                antonyms
              )
            }
            style={styles.buttonAdd}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Add Word</Text>
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
                        handleGetPronunciation(item, tempPronunciation)
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
                        handleGetPronunciation(item, tempPronunciation)
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
                        handleGetPronunciation(item, tempPronunciation)
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
                        handleGetPronunciation(item, tempPronunciation)
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
                        handleGetPronunciation(item, tempPronunciation)
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
