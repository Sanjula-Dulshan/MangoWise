import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Common/Header";
import { useRoute } from "@react-navigation/native";
import greenTick from "../../../../assets/green_tick.png";

export default function DiseaseCompare() {
  const route = useRoute();

  const [newImage, setNewImage] = useState();
  const [oldImage, setOldImage] = useState();

  useEffect(() => {
    console.log(route.params);
    setNewImage(convertBase64ToImage(route.params?.response?.image));
    setOldImage(route.params?.prevDisease?.image);
  }, [route.params]);

  function convertBase64ToImage(base64String) {
    if (base64String) {
      const imageBase64Uri = `data:image/png;base64,${base64String}`;
      return imageBase64Uri;
    }
  }
  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Previous</Text>
        <Text style={{ ...styles.title, color: "#E79E2B" }}>Current</Text>
      </View>

      <View style={styles.imageRow}>
        <Image source={{ uri: newImage }} style={styles.image} />
        <Image source={{ uri: oldImage }} style={styles.image} />
      </View>

      <View style={styles.noDiseaseContainer}>
        <View>
          <Image source={greenTick} style={styles.greenTick} />
          <Text style={styles.noDiseaseTitle}>Disease{"\n"}Not Found</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: "50%",
    height: 200,
    alignSelf: "center",
  },

  noDiseaseContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#E5FFE7",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  greenTick: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  noDiseaseTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 40,
    textAlign: "center",
  },
});
