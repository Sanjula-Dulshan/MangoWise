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
import { Dropdown } from "react-native-element-dropdown";

const MarketAnalysisPlan = () => {
  const [cost, setCost] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [freshMangoes, setFreshMangoes] = useState("");
  const [damagedMangoes, setDamagedMangoes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [stage, setStage] = useState(null);

  const navigation = useNavigation();

  const handleGo = async () => {
    navigation.navigate("MarketHomeScreen");

    const marketData = {
      cost: cost,
      selectedMonth: selectedMonth,
      freshMangoes: freshMangoes,
      damagedMangoes: damagedMangoes,
    };
    console.log(marketData);

    await axios.post(constants.backend_url + "/market", data).then(() => {
      navigation.navigate("DiagnoseHomeScreen");
    });
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
  };

  // set handleOk funtion to pass the data

  const stagedata = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === selectedMonth}
      </View>
    );
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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={stagedata}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Select Growth Stage"
          value={stage}
          onChange={(item) => {
            setSelectedMonth(parseInt(item.value));
          }}
          renderItem={renderItem}
        />
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
              <Text style={styles.okButtonText} onPress={handleOk}>
                Ok
              </Text>
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
  dropdown: {
    margin: 16,
    marginTop: 20,
    height: 45,
    width: 260,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginEnd: 5,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default MarketAnalysisPlan;
