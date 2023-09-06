import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import searching from "../../../assets/loadings/searching.gif";

const Loader = ({ title, visible }) => {
  return (
    <View>
      <Modal animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContent}>
          <Image source={searching} style={styles.mangoImage} />
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalText}>
            Please wait, this may take some time.
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    height: 220,
    width: 300,
  },
  mangoImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Loader;
