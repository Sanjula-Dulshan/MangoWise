import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigation();

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const newUser = userCredentials.user;
        // Additional logic or navigation if needed
      })
      .catch((e) => alert(e.message));
  };

  const navigateToLogin = () => {
    navigate.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/new.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/signup2.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Welcome</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* name input */}
          <TextInput
            placeholder="Enter name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={register} style={styles.loginButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>
          Already have an account?{" "}
          <Text style={styles.signupLink} onPress={navigateToLogin}>
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;

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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
    width: 300,
    height: 280,
    marginLeft: 30,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 6,
  },
  buttonContainer: {
    width: "80%",
  },
  loginButton: {
    backgroundColor: "#FDC704",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    borderColor: "black",
  },
  registerButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FDC704",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  signupText: {
    color: "white",
    marginTop: 10,
  },
  signupLink: {
    color: "#FDC704",
    fontWeight: "bold",
  },
});
