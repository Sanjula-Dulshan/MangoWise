import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import mangoAnalysis from "../../../../assets/M4.jpg";
import Header from "../../../components/Common/Header";

const Analysis = () => {
  const navigation = useNavigation();

  const handleAnalysis = () => {
    navigation.navigate("TimeSeriesForecastScreen");
  };
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
                <Text style={styles.label}>Price(Rs)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.monthText}>January</Text>
                <Text style={styles.priceText}>$100</Text>
              </View>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleAnalysis}
          >
            <Text style={styles.buttonText}>Show the Analysis</Text>
          </TouchableOpacity>
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
});

export default Analysis;
