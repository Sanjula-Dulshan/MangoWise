import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Header from "../../../components/Common/Header";
import sampleMangoLaaf from "../../../../assets/sample-mango-leaf.jpg";
import mangoFruit from "../../../../assets/M2.jpg";
import sampleMango from "../../../../assets/M6.jpg";
import mangoMarket from "../../../../assets/M3.jpg";
import mangoAnalysis from "../../../../assets/M4.jpg";
import mangoForecast from "../../../../assets/M5.jpg";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleForecast = () => {
    navigation.navigate("ForecastScreen");
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.cardContainerMain}>
            <Image
              source={sampleMango}
              style={styles.cardImageMain}
              resizeMode="cover"
            />
            <Text style={styles.cardText}>Mango Market Analysis</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "left",
              paddingRight: 13,
              marginLeft: 21,
              marginTop: 0,
              fontWeight: 500,
            }}
          >
            Mango Market Price Forecasting{" "}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.cardContainer}>
              <TouchableOpacity>
                <Image
                  source={mangoForecast}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardCaption}>Next 3 months</Text>
            </View>
            <View style={styles.cardContainer}>
              <TouchableOpacity>
                <Image
                  source={mangoFruit}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardCaption}>Next 6 months</Text>
            </View>
            <View style={styles.cardContainer}>
              <TouchableOpacity>
                <Image
                  source={mangoAnalysis}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardCaption}>Next 9 months</Text>
            </View>
            <View style={styles.cardContainer}>
              <TouchableOpacity>
                <Image
                  source={mangoMarket}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.cardCaption}>Next 12 months</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleForecast}
        >
          <Text style={styles.buttonText}>Show the Forecast</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  //main card
  container: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#fdfafa",
  },
  cardContainerMain: {
    width: 300, // Adjust the width of the card
    height: 200, // Adjust the height of the card
    backgroundColor: "#f3fdee",
    borderRadius: 20,
    overflow: "hidden", // Clip the contents within the card
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },

  cardImageMain: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  cardText: {
    position: "absolute",
    bottom: 20, // Adjust the vertical position of the text
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },

  //sub cards
  cardContainer: {
    marginBottom: 10,
    marginLeft: 10,
    width: 300,
    height: 250, // Adjust the width of your cards
    backgroundColor: "#FFE380",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },

  cardImage: {
    width: "100%",
    height: 170, // Adjust the height of your card images
    borderRadius: 20,
  },

  cardCaption: {
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
    color: "#000", //
  },

  imageContainer: {
    marginBottom: 5,
    marginTop: 40,
    width: "95%",
    height: "20%",
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f3fdee",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },

  topic: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#fdfafa",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 8,
  },
  backButton: {
    width: 30,
    height: 35,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -10,
    marginLeft: 15,
    marginRight: 60,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 220,
    height: 60,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 10,
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 8,
  },
  infoModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "80%",
    maxHeight: "60%",
    minHeight: "10%",
    marginTop: 170,
    marginLeft: 45,
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  okButton: {
    backgroundColor: "#fdc50b",
    padding: 10,
    width: 80,
    height: 50,
    textAlign: "center",
    color: "#144100",
    borderRadius: 25,
    marginTop: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  focusLeaf: {
    width: 60,
    height: 60,
    marginTop: -5,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 5,
  },
  searchLeaf: {
    width: 80,
    height: 60,
    marginTop: -4,
    marginLeft: 25,
    marginRight: 0,
    marginBottom: 5,
  },
  reportimage: {
    width: 80,
    height: 70,
    marginTop: -8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  vectorimage: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  modalText: {
    fontSize: 14,
    fontStyle: "italic",
    padding: 5,
    color: "#000000",
    textAlign: "center",
    marginTop: 25,
    marginBottom: -20,
  },

  virusIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
  image: {
    marginBottom: 5,
    marginTop: 10,
    width: "80%",
    height: "37%",
    marginLeft: 10,

    backgroundColor: "#f3fdee",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  sampleMangoLeaf: {
    width: 80,
    height: 90,

    marginLeft: 5,
    marginRight: 20,
    marginTop: 7,
    marginBottom: 5,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
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
