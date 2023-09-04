import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sampleMangoLeaf from "../../../../assets/sample-mango-leaf2.jpg";
import Header from "../../../components/Common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import iconMango from "../../../../assets/M10.png";
import noResult from "../../../../assets/cancel.png";
import axios from "axios";
import greenTick from "../../../../assets/green_tick.png";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function DetectedAllVarieties() {
  const [instantImage, setInstantImage] = useState();
  const [varietyInfo, setVarietyInfo] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    const { response } = route.params;

    setVarietyInfo(response.variety);

    convertBase64ToImage(response.image);
  }, [route.params]);
  //convert base64 to image
  function convertBase64ToImage(base64String) {
    if (base64String) {
      const imageBase64Uri = `data:image/png;base64,${base64String}`;
      setInstantImage(imageBase64Uri);
    }
  }

  const handleReTakePicture = async () => {
    navigation.navigate("VarietyScanScreen");
  };

  const marketAnalysis = async () => {
    console.log("market analysis");
    navigation.navigate("AnalysisScreen", {
      variety: varietyInfo,
    });
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.imageContainer}>
        {instantImage && (
          <Image source={{ uri: instantImage }} style={styles.image} />
        )}
      </View>

      <View style={styles.detailsContainer}>
        {varietyInfo ? (
          <>
            <Image source={iconMango} style={styles.greenTick} />
            <View>
              <Text style={styles.noDiseaseTitle}>{varietyInfo}</Text>
            </View>

            <View>
              <View style={styles.buttonGroups}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleReTakePicture}
                >
                  <Text style={styles.btntext}>Re-take</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.advanceSearchButton}
                  onPress={marketAnalysis}
                >
                  <Text style={styles.btntext}>Market Analysis</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View>
            <Image source={noResult} style={styles.cancel} />
            <Text style={styles.noVarietyTitle}>Variety Not Found</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleReTakePicture}
            >
              <Text style={styles.btntext}>Re-take</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "100%",
    borderRadius: 5,
  },
  detailsContainer: {
    marginTop: 20,
    flex: 1,
    height: 10,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#FFE5E5",
  },
  detailsCard: {
    justifyContent: "space-between",
    height: "90%",
    paddingVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#C10303",
    marginHorizontal: 40,
  },
  diseaseList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 80,
  },
  diseaseColor: {
    width: 25,
    height: 25,
    marginRight: 15,
    marginTop: 3,
  },
  diseaseName: {
    fontSize: 16,
    marginRight: 15,

    fontWeight: "bold",
  },
  buttonGroups: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
  },
  advanceSearchButton: {
    backgroundColor: "#3AB54A",
    width: 165,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 165,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  btntext: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 3,
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
  },
  greenTick: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  cancel: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  noDiseaseTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 40,
    textAlign: "center",
    paddingTop: 20,
  },
  noVarietyTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 40,
    textAlign: "center",
    paddingTop: 20,
    color: "#C10303",
    paddingBottom: 20,
  },
  percentageContainer: {
    marginTop: 20,
    flex: 1,
    height: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    backgroundColor: "#FFF6D4",
  },
  severityTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 30,
  },
});
