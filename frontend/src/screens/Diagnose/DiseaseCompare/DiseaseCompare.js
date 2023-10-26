import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Common/Header";
import { useRoute } from "@react-navigation/native";
import greenTick from "../../../../assets/green_tick.png";
import warning from "../../../../assets/warning.png";
import decrese from "../../../../assets/decrease.png";
import increase from "../../../../assets/increase.png";

export default function DiseaseCompare() {
  const [newImage, setNewImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [compareText, setCompareText] = useState();
  const [notFound, setNotFound] = useState(false);
  //const [notFoundNew, setNotFoundNew] = useState(false);
  const [notFoundMatch, setNotFoundMatch] = useState(false);

  const [same, setSame] = useState(false);
  const [higher, setHigher] = useState(false);
  const [lower, setLower] = useState(false);
  const [isMatchingDataCheck, setIsMatchingDataCheck] = useState(false);

  const route = useRoute();

  useEffect(() => {
    setNewImage(convertBase64ToImage(route.params?.response?.image));
    setOldImage(route.params?.prevDisease?.image);

    const data = route.params;

    comparePercentage(data);
  }, [route.params]);

  const comparePercentage = (data) => {
    console.log("data: ", data);
    const prevMainDisease = data.prevDisease.mainDisease;
    const prevDiseaseInfo = data.prevDisease.diseasesInfo.find(
      (disease) => disease.class === prevMainDisease
    );
    const prevMainDiseasePercentage = prevDiseaseInfo?.affectedAreaPercentage;

    const responseDiseases = data.response.diseaseData;
    const matchingCurrentDisease = responseDiseases.find(
      (disease) => disease.class === prevMainDisease
    );

    if (matchingCurrentDisease) {
      const currentMainDiseasePercentage =
        matchingCurrentDisease.affectedAreaPercentage;
      if (prevMainDiseasePercentage > currentMainDiseasePercentage) {
        setLower(true);
        console.log(
          `${prevMainDisease} had a lower affected area percentage now.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} had a lower affected area percentage now.`,
        });
      } else if (prevMainDiseasePercentage < currentMainDiseasePercentage) {
        setHigher(true);
        console.log(
          `${prevMainDisease} has a higher affected area percentage now.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} has a higher affected area percentage now.`,
        });
      } else {
        setSame(true);
        console.log(
          `${prevMainDisease} affected area percentage remains the same.`
        );
        setCompareText({
          primaryText: `${prevMainDisease} affected area percentage remains the same.`,
        });
      }
    } else {
      setNotFound(true);
      console.log(`${prevMainDisease} free in current detection`);
      const primaryText = `${prevMainDisease} free in current detection`;

      // Additional logic to find matching diseases and their affected percentage
      const matchingDiseaseInfo = data.response.diseaseData.find(
        (diseaseData) => {
          setIsMatchingDataCheck(true);

          return data.prevDisease.diseasesInfo.some(
            (prevDiseaseInfo) => prevDiseaseInfo.class === diseaseData.class
          );
        }
      );

      if (matchingDiseaseInfo) {
        setNotFoundMatch(true);

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
            "New disease detected. Please try Disease detect option for more details.",
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
      {/*Not found but Found New disease */}
      {notFound && isMatchingDataCheck && (
        <View style={styles.noDiseaseContainer}>
          <Image source={greenTick} style={styles.greenTick} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
          <View style={styles.textContainer}>
            {compareText && compareText.secondaryText && (
              <Text style={styles.secondaryTextNew}>
                {compareText.secondaryText}
              </Text>
            )}
          </View>
        </View>
      )}
      {/*Not found but Found match diseases */}
      {notFound && notFoundMatch && (
        <View style={styles.matchDiseaseContainer}>
          <Image source={warning} style={styles.greenTick} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
          <View style={styles.textContainer}>
            {compareText && compareText.secondaryText && (
              <Text style={styles.secondaryTextMatch}>
                {compareText.secondaryText}
              </Text>
            )}
          </View>
        </View>
      )}
      {/* Not found only */}
      {console.log(
        "notFound: ",
        notFound,
        "\nnotFoundMatch: ",
        notFoundMatch,
        "\nisMatchingDataCheck: ",
        isMatchingDataCheck
      )}
      {notFound && !notFoundMatch && !isMatchingDataCheck && (
        <View style={styles.noDiseaseContainer}>
          <Image source={greenTick} style={styles.greenTick} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
        </View>
      )}

      {same && (
        <View style={styles.sameDiseaseContainer}>
          <Image source={warning} style={styles.greenTick} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
          <View style={styles.textContainer}>
            {compareText && compareText.secondaryText && (
              <Text style={styles.secondaryTextMatch}>
                {compareText.secondaryText}
              </Text>
            )}
          </View>
        </View>
      )}

      {higher && (
        <View style={styles.highDiseaseContainer}>
          <Image source={increase} style={styles.increaseDecrease} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
          <View style={styles.textContainer}>
            {compareText && compareText.secondaryText && (
              <Text style={styles.secondaryTextMatch}>
                {compareText.secondaryText}
              </Text>
            )}
          </View>
        </View>
      )}

      {lower && (
        <View style={styles.lowDiseaseContainer}>
          <Image source={decrese} style={styles.increaseDecrease} />
          {compareText && compareText.primaryText && (
            <Text style={styles.noDiseaseTitle}>{compareText.primaryText}</Text>
          )}
          <View style={styles.textContainer}>
            {compareText && compareText.secondaryText && (
              <Text style={styles.secondaryTextMatch}>
                {compareText.secondaryText}
              </Text>
            )}
          </View>
        </View>
      )}
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

  secondaryTextNew: {
    marginTop: 40,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
    color: "red",
  },
  matchDiseaseContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#FAE0CB",
  },
  secondaryTextMatch: {
    marginTop: 40,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: 24,
    color: "red",
  },

  sameDiseaseContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#FFE5E5",
  },

  highDiseaseContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#FFE5E5",
  },

  lowDiseaseContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#E5FFE7",
  },

  increaseDecrease: {
    width: 80,
    height: 50,
    alignSelf: "center",
    marginTop: 20,
  },
});
