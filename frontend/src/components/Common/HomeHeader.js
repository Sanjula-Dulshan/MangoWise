import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Logo from "../../../assets/Logo.png";
import Premium from "../../../assets/Premium.png";
import Profile from "../../../assets/Profile.png";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.topic}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <Feather name="arrow-left" size={40} color="#fdc50b" />
        </View>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={Premium}
            style={styles.imagePremium}
            resizeMode="contain"
          />
          <Image
            source={Profile}
            style={styles.imageProfile}
            resizeMode="contain"
          />
        </View>
        <Image source={Logo} style={styles.imageLogo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 5,
    paddingBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  imageProfile: {
    width: 38,
    height: 32,
    margin: 5,
    marginTop: -10,
  },
  imagePremium: {
    width: 100,
    height: 30,
    margin: 0,
    marginTop: -10,
  },
  imageLogo: {
    width: 100,
    height: 70,
    marginTop: -20,
    justifyContent: "flex-start",
    marginLeft: 37,
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
  topic: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#fdc50b", // Background color set to #fdc50b
  },
});
