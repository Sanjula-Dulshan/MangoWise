import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";
import constants from "../../constants/constants";
import Header from "../Common/HomeHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import VSelectAllScreens from "./VSelectAll";
import { auth, firestore } from "../../../firebase";

const images = [
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/villard_kpqitd.jpg",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/gira_pugwgg.jpg",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979485/OIP_5_3_yo3att.png",
  "https://res.cloudinary.com/sliit-yasantha/image/upload/v1693979486/malwana_uk7rjg.jpg",
  // Add more image URLs here
];

export default function Home() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({
    isPremium: false,
  });
  const [loading, setLoading] = useState(!auth.currentUser); // Set loading to true if the user is not logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        // Fetch user data here
        fetchUserData(user.email);
      } else {
        // Handle the case when the user is not logged in
        setLoading(false);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the observer when the component unmounts
    };
  });

  const fetchUserData = async (email) => {
    try {
      const usersRef = firestore.collection("users");
      const userQuery = usersRef.where("email", "==", email);

      const querySnapshot = await userQuery.get();
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserData(userData);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToBuddingTimer = () => {
    navigation.navigate("Budding");
  };

  const goToVarietyIdentification = () => {
    navigation.navigate("Variety");
  };

  const goToDiseaseIdentification = () => {
    navigation.navigate("Diagnose");
  };

  const goToVarietySelector = () => {
    //navigate to VSelectAllScreens
    navigation.navigate("VSelectAllScreens");
  };

  const goToFertilizerRecommender = () => {
    if (userData.isPremium === true) {
      navigation.navigate("Fertilization");
    } else {
      navigation.navigate("paymentScreen");
    }
  };

  const goToMarketAnalysis = () => {
    if (userData.isPremium === true) {
      navigation.navigate("Market");
    } else {
      navigation.navigate("paymentScreen");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
              <Text style={styles.buttonText}>Budding Timer</Text>
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
              {userData.isPremium === false ? (
                <View style={styles.diamond}>
                  <Icon name="diamond" size={20} color="#000000" />
                </View>
              ) : null}
              <Icon name="cog" size={30} color="#446714" />
              <Text style={styles.buttonText}>Fertilization</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={goToMarketAnalysis}
            >
              {userData.isPremium === false ? (
                <View style={styles.diamond}>
                  <Icon name="diamond" size={20} color="#000000" />
                </View>
              ) : null}
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
    width: 110,
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

  diamond: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
