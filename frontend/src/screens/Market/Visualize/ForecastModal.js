import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Header from "../../../components/Common/Header";
import TimeSeriesGraph from "./TimeSeriesGraph"; // Import the graph component

const ForecastModal = ({ visible, onClose, timeSeriesData }) => {
  return (
    <Modal visible={visible}>
      <Header />
      <View style={styles.modalContent}>
        {/* Title */}
        <Text style={styles.title}>Visualization</Text>

        {/* Pass the timeSeriesData to the graph component */}
        <TimeSeriesGraph data={timeSeriesData} />

        {/* Card with clickable text */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Optimal Outcome</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fdc50b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ForecastModal;
