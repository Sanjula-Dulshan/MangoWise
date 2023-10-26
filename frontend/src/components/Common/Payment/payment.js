import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import constants from "../../../constants/constants";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { Screen } from "react-native-screens";

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

  const fetchPaymentSheetParams = async () => {
    console.log("fetchPaymentSheetParams");

    const response = await axios.post(
      constants.backend_url + "/payment/create-sheet"
    );
    console.log(response.data);

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

    const { error, paymentOption } = await initPaymentSheet({
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
    });

    console.log("initPaymentSheet.paymentOption", paymentOption);

    console.log("error", error);

    if (!error) {
      console.log("error", error);
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error, paymentOption } = await presentPaymentSheet();

    console.log("presentPaymentSheet.paymentOption", paymentOption);

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Screen>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={() => openPaymentSheet()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },

  card: {
    backgroundColor: "#efefefef",
  },

  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
