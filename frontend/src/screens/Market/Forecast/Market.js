import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import mangoAnalysis from "../../../../assets/M4.jpg";
import juice from "../../../../assets/juice.png";
import Mjuice from "../../../../assets/juiceM.jpeg";
import chutney from "../../../../assets/chutney.jpeg";
import pickle from "../../../../assets/pickle.jpeg";
import jam from "../../../../assets/jam.jpeg";
import Header from "../../../components/Common/Header";
import Modal from "react-native-modal";

const Analysis = () => {
  const navigation = useNavigation();
  const [market, setMarket] = useState([]);
  const [forecastedValue, setForecastedValue] = useState(0);
  const [month, setMonth] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [cost, setCost] = useState("");
  const [freshMangoes, setFreshMangoes] = useState("");
  const [damagedMangoes, setDamagedMangoes] = useState("");

  const route = useRoute();

  const totalIncome = 5000; // Replace with your actual total income value
  const totalCost = cost; // Replace with your actual total price value
  const totalProfit = totalIncome - totalCost;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // get marketData passed by previous analysis screen
  useEffect(() => {
    console.log("route.params>> ", route.params);
    const { response, marketData } = route.params;

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Convert the numeric marketData value to the corresponding month name
    const monthName = monthNames[marketData.selectedMonth - 1]; // Subtract 1 because arrays are zero-indexed

    setMonth(monthName);
    setCost(marketData.cost);
    setFreshMangoes(marketData.freshMangoes);
    setDamagedMangoes(marketData.damagedMangoes);

    const forecastedValue = response.forecasted_values[0];
    setForecastedValue(forecastedValue);
    setMarket(response);
  }, [route.params]);

  // const handleAnalysis = () => {
  //   navigation.navigate("TimeSeriesForecastScreen");
  // };
  return (
    <View style={{ backgroundColor: "#ffff", height: "100%" }}>
      <Header />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Top Image */}
          <Image
            source={mangoAnalysis}
            style={styles.topImage}
            resizeMode="cover"
          />

          {/* Text Next to Image */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>Fresh Mango Price Forecast</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardText}>
              This would give you the predicted market price for the current
              month
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Fresh Mango Market Price</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.tableContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Month</Text>
                <Text style={styles.label}>Price</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.monthText}>{month}</Text>
                <Text style={styles.priceText}>Rs.{forecastedValue}</Text>
              </View>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={toggleModal}
          >
            <Text style={styles.buttonText}>Show the Analysis</Text>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible} style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Optimal Outcome</Text>

              {/* Card with Total Income */}
              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardTitle}>Total Income</Text>
                  <Text style={styles.cardValue}>$5000</Text>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardTitle}>Total Profit</Text>
                  <Text
                    style={[
                      styles.cardValue,
                      { color: totalProfit >= 0 ? "#0a0" : "red" },
                    ]}
                  >
                    ${totalProfit >= 0 ? totalProfit : -totalProfit}
                  </Text>
                </View>
              </View>

              {/* Success Message */}
              {totalProfit >= 0 ? (
                <View style={styles.successMessage}>
                  <Text style={styles.successText}>Success!</Text>
                  <Text style={styles.successDescription}>It's a profit.</Text>
                </View>
              ) : (
                <View style={styles.successMessage}>
                  <Text style={[styles.successText, { color: "red" }]}>
                    Oh, it's a loss.
                  </Text>
                  <Text style={styles.successDescription}>
                    Try to reduce losses.
                  </Text>
                </View>
              )}

              {/* Description and Damaged Mango Count */}
              <View style={styles.description}>
                <Text style={styles.descriptionText1}>
                  Amount of Damaged Mango: 500
                </Text>
                <Text style={styles.descriptionText2}>
                  You can try these products also for damaged mangoes.
                </Text>
              </View>

              <View style={styles.processedProducts}>
                {/* Processed Product Cards */}
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.processedCard}>
                    <Image
                      source={Mjuice}
                      style={styles.processedImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.processedName}>Mango Juice</Text>
                    <Text style={styles.processedPrice}>Rs.320</Text>
                  </View>
                  <View style={styles.processedCard}>
                    <Image
                      source={jam}
                      style={styles.processedImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.processedName}>Jam</Text>
                    <Text style={styles.processedPrice}>Rs.450</Text>
                  </View>
                  <View style={styles.processedCard}>
                    <Image
                      source={pickle}
                      style={styles.processedImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.processedName}>Mango Pickle</Text>
                    <Text style={styles.processedPrice}>Rs.150</Text>
                  </View>
                  <View style={styles.processedCard}>
                    <Image
                      source={chutney}
                      style={styles.processedImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.processedName}>Mango Chutney</Text>
                    <Text style={styles.processedPrice}>Rs.380</Text>
                  </View>
                </ScrollView>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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
    backgroundColor: "#f8f8f8",
  },
  topImage: {
    width: "100%",
    height: 200, // Adjust the height of the top image
  },
  textContainer: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: "#fdc50b",
    margin: 20,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginRight: 10,
  },
  successDescription: {
    fontSize: 16,
  },
  description: {
    marginBottom: 20,
  },
  descriptionText1: {
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionText2: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: "italic",
  },
  processedProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  processedCard: {
    flex: 1,
    backgroundColor: "#3C9616",
    borderRadius: 12,
    padding: 10,
    margin: 5,
    alignItems: "center",
    height: 180,
  },
  processedTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  processedPrice: {
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "italic",
  },
  processedName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#fdc50b",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  processedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Analysis;
