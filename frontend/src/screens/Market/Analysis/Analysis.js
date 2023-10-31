import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../../components/Common/Header";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

const MarketAnalysisPlan = () => {
  const [cost, setCost] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);
  const [freshMangoes, setFreshMangoes] = useState("");
  const [damagedMangoes, setDamagedMangoes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [variety, setVariety] = useState("");
  const [image, setImage] = useState("");

  const route = useRoute();

  // get marketData passed by previous analysis screen
  useEffect(() => {
    console.log("route.params.variety>> ", route.params.variety);
    const { variety, image } = route.params;
    setVariety(variety);
    setImage(image);
  }, [route.params]);

  const [stage, setStage] = useState(null);
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  const handleGoButtonPress = async () => {
    setIsProcessing(true);

    // Add "Item_" prefix and uppercase the variety
    const formattedVariety = "Item_" + variety.toUpperCase();

    const marketData = {
      cost: cost,
      selectedMonth: selectedMonth,
      freshMangoes: freshMangoes,
      damagedMangoes: damagedMangoes,
      variety: formattedVariety,
      location: selectLocation,
      image: image,
    };

    try {
      console.log("Analyze", marketData);
      await axios.post(constants.BACKEND_URL + "/market", data);
    } catch (error) {
      console.log("error ", error);
    }

    setTimeout(() => {
      navigation.navigate("MarketHomeScreen", {
        marketData: marketData,
      });

      setIsProcessing(false);
    }, 9000);
  };

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

  const locationdata = [
    { label: "Ampara", value: "Location_Ampara" },
    { label: "Anuradapura", value: "Location_Anuradapura" },
    { label: "Badulla", value: "Location_Badulla" },
    { label: "Bandarawela", value: "Location_Bandarawela" },
    { label: "Batticaloa", value: "Location_Batticaloa" },
    { label: "Colombo", value: "Location_Colombo" },
    { label: "Dambulla", value: "Location_Dambulla" },
    { label: "Dehiattakandiya", value: "Location_Dehiattakandiya" },
    { label: "Embilipitiya", value: "Location_Embilipitiya" },
    { label: "Galenbidunuwewa", value: "Location_Galenbidunuwewa" },
    { label: "Galle", value: "Location_Galle" },
    { label: "Gampaha", value: "Location_Gampaha" },
    { label: "Hambanthota", value: "Location_Hambanthota" },
    { label: "Hanguranketha", value: "Location_Hanguranketha" },
    { label: "Jaffna", value: "Location_Jaffna" },
    { label: "Kaluthara", value: "Location_Kaluthara" },
    { label: "Kandy", value: "Location_Kandy" },
    { label: "Kegalle", value: "Location_Kegalle" },
    { label: "Keppetipola", value: "Location_Keppetipola" },
    { label: "Kilinochchi", value: "Location_Kilinochchi" },
    { label: "Kurunegala", value: "Location_Kurunegala" },
    { label: "Mannar", value: "Location_Mannar" },
    { label: "Matale", value: "Location_Matale" },
    { label: "Matara", value: "Location_Matara" },
    { label: "Meegoda", value: "Location_Meegoda(DEC)" },
    { label: "Monaragala", value: "Location_Monaragala" },
    { label: "Mullathivu", value: "Location_Mullathivu" },
    { label: "Nikaweratiya", value: "Location_Nikaweratiya" },
    { label: "Nuwara Eliya", value: "Location_Nuwara Eliya" },
    { label: "Polonnaruwa", value: "Location_Polonnaruwa" },
    { label: "Puttalam", value: "Location_Puttalam" },
    { label: "Rathnapura", value: "Location_Rathnapura" },
    { label: "Thabuththegama", value: "Location_Thabuththegama" },
    { label: "Thissamaharama", value: "Location_Thissamaharama" },
    { label: "Trinco", value: "Location_Trinco" },
    { label: "Vavuniya", value: "Location_Vavuniya" },
    { label: "Veyangoda", value: "Location_Veyangoda" },
  ];

  const renderItem = (item) => {
    return (
      <View style={[styles.dropdownItem, selectedMonth && styles.selectedItem]}>
        <Text style={[styles.label, selectedMonth && styles.selectedLabel]}>
          {item.label}
        </Text>
      </View>
    );
  };

  const renderLocationItem = (item) => {
    return (
      <View
        style={[styles.dropdownItem, selectLocation && styles.selectedItem]}
      >
        <Text style={[styles.label, selectLocation && styles.selectedLabel]}>
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#ffff", height: "100%" }}>
      <Header />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Market Analysis Plan</Text>
          <Text style={styles.inputLabel}>Variety</Text>
          <TextInput style={styles.input} value={variety} editable={false} />
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
            placeholder="Select Month"
            value={selectedMonth}
            onChange={(item) => {
              console.log("item.value>> ", item);
              setSelectedMonth(item.value);
            }}
            renderItem={renderItem}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={locationdata}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Select Location"
            value={selectLocation}
            onChange={(item) => {
              console.log("item.value>> ", item.value);
              setSelectLocation(item.value);
            }}
            renderItem={renderLocationItem}
          />
          <Text style={styles.inputLabel}>Quantity of Fresh Mangoes</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Quantity"
            keyboardType="numeric"
            value={freshMangoes}
            onChangeText={(text) =>
              setFreshMangoes(text.replace(/[^0-9]/g, ""))
            }
          />
          <Text style={styles.inputLabel}>Quantity of Damaged Mangoes </Text>
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
            </View>
          </Modal>
        </View>
      </ScrollView>
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
  inputvariety: {
    borderWidth: 1,
    borderColor: "#000",
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
    height: 220,
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
    width: 300, // Increase the width as needed
    height: 45,
    width: 260,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginEnd: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  dropdownItem: {
    paddingVertical: 10, // Increase padding to increase touchable area
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 15,
    color: "black",
  },

  selectedItem: {
    backgroundColor: "white",
    // Additional styles for selected item if needed
  },

  selectedLabel: {
    color: "black",
    // Additional styles for selected label if needed
  },
});

export default MarketAnalysisPlan;
