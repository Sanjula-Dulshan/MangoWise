import { useNavigation } from "@react-navigation/native";
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

// const diseasesList = [
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
//   {
//     disease: "Anthracnose",
//     date: "10/05/2023",
//     image:
//       "https://res.cloudinary.com/waste123/image/upload/v1691680008/yuyntgfmipxtqibwyfjd.jpg",
//   },
// ];

export default function PreviousDiseases() {
  const [diseasesList, setDiseasesList] = useState([]);
  useEffect(() => {
    axios.get(constants.backend_url + "/disease").then((response) => {
      setDiseasesList(response.data);
    });
  }, []);
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      {/* <Image
        style={[styles.sanjulaPreviousPictureChild, styles.vectorIconLayout]}
        contentFit="cover"
      /> */}
      {/* <Image style={styles.logo2Icon} contentFit="cover" /> */}

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
                        {moment(disease.createdAt).format("DD/MM/YYYY")}
                      </Text>
                      <TouchableOpacity style={styles.button}>
                        <Text style={styles.btntext}>Recheck</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.arrowIcon}>
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
    alignSelf: "center",
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",

    color: "#144100",
  },
  arrowIcon: {
    marginLeft: 90,
    marginTop: 50,
    transform: [{ rotate: "45deg" }],
  },
  previousPictures: {
    left: "7.69%",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
