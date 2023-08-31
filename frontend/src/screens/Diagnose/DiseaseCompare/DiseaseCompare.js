import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Common/Header";
import { useRoute } from "@react-navigation/native";
import greenTick from "../../../../assets/green_tick.png";

export default function DiseaseCompare() {
  const route = useRoute();

  const [newImage, setNewImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [compareText, setCompareText] = useState();

  useEffect(() => {
    console.log(route.params);
    setNewImage(convertBase64ToImage(route.params?.response?.image));
    setOldImage(route.params?.prevDisease?.image);

    const data = route.params;

    comparePercentage(data);
  }, [route.params]);

  const comparePercentage = (data) => {
    const prevMainDisease = data.prevDisease.mainDisease;
    const prevDiseaseInfo = data.prevDisease.diseasesInfo.find(
      (disease) => disease.class === prevMainDisease
    );
    const prevMainDiseasePercentage = prevDiseaseInfo.affectedAreaPercentage;

    const responseDiseases = data.response.diseaseData;
    const matchingCurrentDisease = responseDiseases.find(
      (disease) => disease.class === prevMainDisease
    );

    if (matchingCurrentDisease) {
      const currentMainDiseasePercentage =
        matchingCurrentDisease.affectedAreaPercentage;
      if (prevMainDiseasePercentage > currentMainDiseasePercentage) {
        console.log(
          `${prevMainDisease} had a lower affected area percentage now.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} had a lower affected area percentage now.`,
        });
      } else if (prevMainDiseasePercentage < currentMainDiseasePercentage) {
        console.log(
          `${prevMainDisease} has a higher affected area percentage now.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} has a higher affected area percentage now.`,
        });
      } else {
        console.log(
          `${prevMainDisease} affected area percentage remains the same.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} affected area percentage remains the same.`,
        });
      }
    } else {
      console.log(
        `No matching data found for ${prevMainDisease} in that picture.`
      );
      const primaryText = `${prevMainDisease} is not found`;

      // Additional logic to find matching diseases and their affected percentage
      const matchingDiseaseInfo = data.response.diseaseData.find(
        (diseaseData) => {
          return data.prevDisease.diseasesInfo.some(
            (prevDiseaseInfo) => prevDiseaseInfo.class === diseaseData.class
          );
        }
      );

      if (matchingDiseaseInfo) {
        const matchingPrevDiseaseInfo = data.prevDisease.diseasesInfo.find(
          (prevDiseaseInfo) =>
            prevDiseaseInfo.class === matchingDiseaseInfo.class
        );

        console.log(
          `${matchingDiseaseInfo.class} affected percentage ${matchingPrevDiseaseInfo.affectedAreaPercentage}% (Previous) vs ${matchingDiseaseInfo.affectedAreaPercentage}% (Current)`
        );
        setCompareText({
          primaryText: primaryText,
          secondaryText: `Previous: ${matchingPrevDiseaseInfo.affectedAreaPercentage}% affected by ${matchingDiseaseInfo.class}\nCurrent: ${matchingDiseaseInfo.affectedAreaPercentage}% affected`,
        });
      } else {
        console.log(
          "No matching disease found. New disease detected. Please try Disease detect option for more details."
        );
        setCompareText({
          primaryText: primaryText,
          secondaryText:
            "No matching disease found. New disease detected. Please try Disease detect option for more details.",
        });
      }
    }
  };

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
        <Image source={{ uri: oldImage }} style={styles.image} />
        <Image source={{ uri: newImage }} style={styles.image} />
      </View>

      <View style={styles.noDiseaseContainer}>
        <Image source={greenTick} style={styles.greenTick} />
        {compareText && compareText.primaryText && (
          <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
        )}
        {/* <Text style={styles.noDiseaseTitle}>Disease{"\n"}Not Found</Text> */}

        <View style={styles.textContainer}>
          {compareText && compareText.secondaryText && (
            <Text style={styles.secondaryText}>
              {compareText.secondaryText}
            </Text>
          )}
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
    borderWidth: 1,
  },
  greenTick: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  noDiseaseTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 40,
    marginTop: 20,
    textAlign: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
  },

  secondaryText: {
    marginTop: 40,
    fontSize: 16,
    lineHeight: 24,
  },
});
