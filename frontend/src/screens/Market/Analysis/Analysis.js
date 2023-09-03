import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  DatePickerAndroid,
} from "react-native";
import Header from "../../../components/Common/Header";
import Modal from "react-native-modal";

const MarketAnalysisPlan = () => {
  const [cost, setCost] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [freshMangoes, setFreshMangoes] = useState("");
  const [damagedMangoes, setDamagedMangoes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigation = useNavigation();

  const handleGo = () => {
    navigation.navigate("MarketHomeScreen");
  };

  const handleGoButtonPress = async () => {
    // Show the processing modal
    setIsProcessing(true);

    // Simulate some asynchronous task (replace with your logic)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Hide the processing modal
    setIsProcessing(false);
    // const navigation = useNavigation();
    // navigation.navigate("MarketHomeScreen");

    // Add your logic here to process the inputs
    console.log("Cost:", cost);
    console.log("Month:", selectedMonth);
    console.log("Fresh Mangoes:", freshMangoes);
    console.log("Damaged Mangoes:", damagedMangoes);
  };

  const openDatePicker = async () => {
    try {
      const { action, year, month } = await DatePickerAndroid.open({
        date: selectedMonth || new Date(),
        mode: "spinner", // Change to "calendar" for a calendar-style picker
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        setSelectedMonth(new Date(year, month));
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <View style={{ backgroundColor: "#ffff", height: "100%" }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Market Analysis Plan</Text>
        <Text style={styles.inputLabel}>Enter Cost</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Cost"
          keyboardType="numeric"
          value={cost}
          onChangeText={(text) => setCost(text.replace(/[^0-9]/g, ""))}
        />
        <Text style={styles.inputLabel}>Enter Month</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={openDatePicker}
        >
          <Text style={styles.datePickerButtonText}>
            {selectedMonth ? selectedMonth.toDateString() : "Select Month"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.inputLabel}>Fresh Mangoes(Kgs)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={freshMangoes}
          onChangeText={(text) => setFreshMangoes(text.replace(/[^0-9]/g, ""))}
        />
        <Text style={styles.inputLabel}>Damaged Mangoes(Kgs)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={damagedMangoes}
          onChangeText={(text) =>
            setDamagedMangoes(text.replace(/[^0-9]/g, ""))
          }
        />
        <TouchableOpacity style={styles.button} onPress={handleGoButtonPress}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>

        {/* Processing modal */}
        <Modal
          isVisible={isProcessing}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <View style={styles.modalContent}>
            <Image
              source={require("../../../../assets/M8.gif")}
              style={styles.mangoImage}
            />
            <Text style={styles.modalText}>Processing....</Text>
            <Text style={styles.modalText}>
              Please wait, this may take some time.
            </Text>
            {/* Ok button to dismiss the modal */}
            <TouchableOpacity
              style={styles.okButton}
              // onPress={() => setIsProcessing(false)}
              onPress={handleGo}
            >
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerButtonText: {
    color: "#fdc50b",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#fdc50b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    height: 300,
  },
  mangoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  okButton: {
    backgroundColor: "#fdc50b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MarketAnalysisPlan;
