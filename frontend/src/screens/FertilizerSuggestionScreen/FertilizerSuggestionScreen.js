import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FertilizerImg from "../../../assets/Fertilizer.jpg";
import Header from "../../components/Common/Header";
import constants from "../../constants/constants";

export default function FertilizerSuggestionScreen() {
  const navigation = useNavigation();
  const [fertilizer, setFertilizer] = useState("");
  const [quantity, setQuantity] = useState(0);

  const {
    formState: { errors },
  } = useForm();

  //Get data from backend
  useFocusEffect(
    React.useCallback(() => {
      (async function id() {
        try {
          const record = await axios.get(
            constants.backend_url + "/records/get"
          );
          if (record) {
            setFertilizer(record.data.fertilizer);
            setQuantity(Math.ceil(record.data.quantity / 10) * 10);
          } else {
            setFertilizer("");
            setQuantity(0);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={FertilizerImg}
            style={styles.fertilizerimg}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Roboto",
              fontWeight: "bold",
              paddingTop: 2,
              textAlign: "right",
              paddingRight: 13,
              marginLeft: 4,
            }}
          >
            See Suggested Fertilizer
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 15,
            marginBottom: -18,
            marginTop: 30,
            textAlign: "left",
          }}
        >
          Suggested Fertilizer
        </Text>

        <View style={styles.inputmultiline}>
          {quantity > 50 ? (
            <View style={{ flexDirection: "column", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              >
                Add {fertilizer}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                {quantity}g per tree
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "column", marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 0,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              >
                No need to add fertilizer.
              </Text>
            </View>
          )}
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 15,
            marginBottom: -18,
            marginTop: 35,
            textAlign: "left",
          }}
        >
          General Advices
        </Text>
        <View style={styles.inputmultiline}>
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 14,
                marginTop: 0,
                marginLeft: 20,
                marginBottom: 0,
                marginRight: 35,
              }}
            >
              Fertilizers should applied 45 to{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 0,
                marginLeft: 20,
                marginBottom: 20,
                marginRight: 35,
              }}
            >
              90 cm away from the trunk.{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 0,
                marginLeft: 20,
                marginBottom: 20,
                marginRight: 35,
              }}
            >
              For young trees, fertilize once a month, for large trees three to
              four times a year.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PreviousRecordsScreen")}
        >
          <Text style={styles.btntext}>See Previous Records</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3fdee",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  inputmultiline: {
    marginBottom: 10,
    marginTop: 30,
    width: "90%",
    marginLeft: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
  textArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: "top",
    fontSize: 16,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#fdc50b",
    paddingBottom: 0,
    paddingTop: 3,
    width: 240,
    height: 55,
    borderRadius: 20,
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
  },
  fertilizerimg: {
    width: 70,
    height: 70,
    marginTop: 0,
    marginLeft: 30,
    marginRight: -40,
    borderRadius: 50,
  },
});
