import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/Common/Header";
import axios from "axios";
import moment from "moment";
import constants from "../../../constants/constants";

export default function PreviousDiseases() {
  const [diseasesList, setDiseasesList] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    axios.get(constants.backend_url + "/disease").then((response) => {
      setDiseasesList(response.data);
    });
  }, [route.params]);

  const recheck = (disease) => {
    navigation.navigate("DiagnoseScanScreen", {
      recheck: true,
      prevDisease: disease,
    });
  };

  const viewDetails = (disease) => {
    console.log("view details", disease);
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />

      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.previousPictures]}>Previous Pictures</Text>
          {diseasesList?.map((disease, key) => {
            return (
              <View key={key}>
                <Card containerStyle={styles.card}>
                  <View style={styles.cardContainer}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ uri: disease?.image }}
                    />
                    <View style={styles.description}>
                      <Text style={styles.name}>{disease?.mainDisease}</Text>
                      <Text style={styles.date}>
                        {moment(disease.updatedAt).format("DD/MM/YYYY")}
                      </Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => recheck(disease)}
                      >
                        <Text style={styles.btntext}>Recheck</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.arrowIcon}
                      onPress={() => viewDetails(disease)}
                    >
                      <Entypo name="chevron-right" size={40} color="#fdc50b" />
                    </TouchableOpacity>
                  </View>
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 25,
  },
  cardContainer: {
    position: "relative",

    flexDirection: "row",
    padding: 1,
  },

  image: {
    width: 97,
    height: 96,
    marginRight: 10,
    borderRadius: 20,
  },
  description: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  date: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#fdc50b",
    width: 90,
    height: 30,
    borderRadius: 25,
    padding: 4,
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",

    color: "#144100",
  },
  arrowIcon: {
    //marginTop: 50,
    transform: [{ rotate: "45deg" }],

    position: "absolute",
    bottom: "-10%",
    right: "-5%",
  },
  previousPictures: {
    left: "7.69%",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
