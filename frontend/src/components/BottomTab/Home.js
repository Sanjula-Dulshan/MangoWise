import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";
import constants from "../../constants/constants";
import Header from "../Common/HomeHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import VSelectAllScreens from "./VSelectAll";

const images = [
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/villard_kpqitd.jpg",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/gira_pugwgg.jpg",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979485/OIP_5_3_yo3att.png",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/malwana_uk7rjg.jpg",

  // Add more image URLs here
];

export default function Home() {
  useEffect(() => {
    warmUpAPICall();
  }, []);

  const navigation = useNavigation();

  const warmUpAPICall = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        // Use the first image for the API call
        type: "image/jpeg",
        name: "image.jpg",
      });

      await axios
        .post(constants.disease_cnn_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => console.log("warmed up disease_predict"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToBuddingTimer = () => {
    navigation.navigate("Budding");
  };

  const goToVarietyIdentification = () => {
    navigation.navigate("VarietyIdentification");
  };

  const goToDiseaseIdentification = () => {
    navigation.navigate("DiagnoseHomeScreen");
  };

  const goToVarietySelector = () => {
    //navigate to VSelectAllScreens
    navigation.navigate("VSelectAllScreens");
  };

  const goToFertilizerRecommender = () => {
    navigation.navigate("FertilizerRecommender");
  };

  const goToMarketAnalysis = () => {
    navigation.navigate("VarietyHomeScreen");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.yellowSection}>
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          buttonWrapperStyle={styles.buttonWrapper}
          borderRadius={10} // Rounded corners
          containerStyle={styles.swiperContainer}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.whiteSection}>
        <Text style={styles.featureTitle}>Feature Menu</Text>
        <View style={styles.buttonContainer}>
          {/* First Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToBuddingTimer}
            >
              <Icon name="search" size={30} color="#446714" />
              <Text style={styles.buttonText}>Buddinig Timmer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToVarietyIdentification}
            >
              <Icon name="camera" size={30} color="#446714" />
              <Text style={styles.buttonText}>Variety Identification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToDiseaseIdentification}
            >
              <Icon name="bug" size={30} color="#446714" />
              <Text style={styles.buttonText}>Disease Identification</Text>
            </TouchableOpacity>
          </View>
          {/* Second Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToVarietySelector}
            >
              <Icon name="pagelines" size={30} color="#446714" />
              <Text style={styles.buttonText}>Variety Selector</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToFertilizerRecommender}
            >
              <Icon name="cog" size={30} color="#446714" />
              <Text style={styles.buttonTextF}>Fertilizer Recommender</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToMarketAnalysis}
            >
              <Icon name="line-chart" size={30} color="#446714" />
              <Text style={styles.buttonText}>Market Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  yellowSection: {
    flex: 4, // 40% of the container
    backgroundColor: "#fdc50b",
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Padding added
  },
  whiteSection: {
    flex: 6, // 60% of the container
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: "#fdc50b",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10, // Equal spacing between buttons
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
  },

  buttonText: {
    color: "#446714",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextF: {
    color: "#446714",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Rounded corners
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  swiperContainer: {
    borderRadius: 10, // Rounded corners
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,.2)", // Dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: "#888", // Active dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
