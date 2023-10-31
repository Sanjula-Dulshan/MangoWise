import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Logo from "../../../assets/Logo.png";
import Premium from "../../../assets/Premium.png";
import Profile from "../../../assets/Profile.png";
import Logout from "../../../assets/logout4.png";
import { auth } from "../../../firebase";

export default function Header() {
  const navigation = useNavigation();

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Logout"),
          style: "cancel",
        },
        { text: "Logout", onPress: () => logout() },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        // Handle any errors that might occur during sign-out
        console.error(error);
      });
  };

  return (
    <View style={styles.topic}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <Feather name="arrow-left" size={40} color="#fdc50b" />
        </View>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("paymentScreen")}
          >
            <Image
              source={Premium}
              style={styles.imagePremium}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmLogout()}>
            <Image
              source={Logout}
              style={styles.imageProfile}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
    height: 25,
    margin: 5,
    marginTop: -8,
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
