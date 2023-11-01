import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import constants from "../../../constants/constants";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../../../firebase";

const customAppearance = {
  shapes: {
    borderRadius: 12,
    borderWidth: 0.5,
  },
  primaryButton: {
    shapes: {
      borderRadius: 20,
    },
  },
  colors: {
    primary: "#fdc50b",
    background: "#ffffff",
    componentBackground: "#f3f8fa",
    componentBorder: "#000000",
    componentDivider: "#BBBBBB",
    primaryText: "#000000",
    secondaryText: "#000000",
    componentText: "#000000",
    placeholderText: "#73757b",
  },
};

export default function payment() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post(
      constants.BACKEND_URL + "/payment/create-sheet"
    );

    const { paymentIntent, ephemeralKey, customer } = await response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const paymentDetails = {
      merchantDisplayName: "MangoWise, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Sanjula",
        email: "sdulshan10@gmail.com",
      },
      appearance: customAppearance,
    };

    const { error } = await initPaymentSheet(paymentDetails);

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Activation Failed",
        visibilityTime: 8000,
        autoHide: true,
        bottomOffset: 100,
      });
    } else {
      try {
        const user = auth.currentUser;
        const userRef = firestore.collection("users").doc(user.uid);
        await userRef.update({ isPremium: true });
      } catch (updateError) {
        console.error("Error updating user data:", updateError);
      }

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Activation Success",
        visibilityTime: 5000,
        autoHide: true,
        bottomOffset: 100,
        onHide: () => navigation.goBack(),
      });
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey={constants.PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <View style={styles.bulletClose}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../../../assets/close.png")}
              style={styles.bulletIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Get Full Access to Mangowise</Text>
        <Text style={styles.subtitle}>Discover the beauty of plants</Text>

        <View style={styles.bulletPoints}>
          {renderBullet("Gain access to market analysis")}
          {renderBullet("Get fresh market analysis")}
          {renderBullet("Get fertilizer name")}
          {renderBullet("Get fresh market income plan")}
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => openPaymentSheet()}
          disabled={!loading}
        >
          <Text
            style={styles.subscribeButtonText}
            variant="primary"
            title="Checkout"
          >
            Subscribe
          </Text>
        </TouchableOpacity>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </StripeProvider>
  );
}

const renderBullet = (text) => (
  <View style={styles.bullet}>
    <Image
      source={require("../../../../assets/bullet.png")}
      style={styles.bulletIcon}
    />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#446715",
    padding: 50,
  },
  title: {
    fontSize: 35,
    color: "#FFC107",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFC107",
  },
  bulletPoints: {
    marginBottom: 20,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletText: {
    color: "#FFFFFF",
    marginLeft: 10,
    fontSize: 24,
  },
  bulletClose: {
    position: "absolute",
    top: 15,
    right: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  subscribeButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 25,
    width: 200,
  },
  subscribeButtonText: {
    color: "#446715",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
