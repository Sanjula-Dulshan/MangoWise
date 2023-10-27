import React, { useEffect, useState } from "react";
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
import loadingIcon from "../../assets/loadings/loading.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigation();

  useEffect(() => {
    const isLogged = auth.onAuthStateChanged((user) => {
      console.log(user.email);
      if (user) {
        setLoading(true); // Turn off loading when user is logged in

        // Navigate to home screen
        navigate.navigate("HomeNav");
      }
    });
    return isLogged;
  }, []);

  const login = () => {
    setLoading(true); // Turn on loading when login is initiated

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const loggedUser = userCredentials.user;
        // Additional logic or navigation if needed
      })
      .catch((e) => {
        setLoading(false); // Turn off loading when login fails
        alert(e.message);
      });
    navigate.navigate("HomeNav");
  };

  const navigateToSignup = () => {
    navigate.navigate("SignupScreen");
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
            source={require("../../assets/undraw2.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Welcome</Text>
        </View>
        <View style={styles.inputContainer}>
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
          <TouchableOpacity onPress={login} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={styles.signupLink} onPress={navigateToSignup}>
            Sign Up
          </Text>
        </Text>

        {loading && ( // Display the loading indicator when `loading` is `true`
          <View style={styles.loadingContainer}>
            <Image
              source={loadingIcon} // Use your loading image
              style={{
                width: 200,
                height: 150,
                alignSelf: "center",
                marginTop: 100,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;

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
  loadingContainer: {
    height: "60%",
    justifyContent: "center",
  },
});
