import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const SplashScreen = () => {
  const navigate = useNavigation();

  const navigateToLogin = () => {
    navigate.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Home3.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={navigateToLogin}
            style={styles.startButton}
          >
            <Text style={styles.buttonText}>GET START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,

    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#FDC704",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    bottom: 180,
    borderEndColor: "green",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
  },
});
