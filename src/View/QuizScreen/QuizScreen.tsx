import React from "react";
import { View, Text, Modal, Pressable, Alert } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import transParagraphApi from "../../Api/TransParagraphApi";
import * as Speech from "expo-speech";
import { Icon } from "react-native-elements";

export default function QuizScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.centeredView}>
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.transParagraphContainer}>
    //     <Text
    //       style={{
    //         fontSize: 25,
    //         fontWeight: "bold",
    //         textAlign: "center",
    //       }}
    //     >
    //       Best English Songs
    //     </Text>

    //     {/* <View style={{ marginTop: 20, alignItems: "center" }}>
    //       <Image
    //         style={{ width: 70, height: 70 }}
    //         source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/2452/2452150.png",
    //         }}
    //       />
    //     </View> */}
    //   </View>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffe159",
//     alignItems: "center",
//   },
//   transParagraphContainer: {
//     width: 300,
//     marginTop: 80,
//     marginBottom: 50,
//   },
//   transParagraphTextInput: {
//     marginTop: 50,
//     padding: 10,
//     backgroundColor: "white",
//     height: 100,
//   },
//   buttonTrans: {
//     padding: 10,
//     backgroundColor: "#3c3f41",
//     width: 100,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   transParagraphResult: {
//     width: 300,
//     height: 100,
//     justifyContent: "center",
//     padding: 10,
//     marginTop: 50,
//     marginBottom: 50,
//     backgroundColor: "white",
//   },
// });

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
});
