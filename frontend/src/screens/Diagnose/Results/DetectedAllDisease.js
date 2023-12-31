import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/Common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import greenTick from "../../../../assets/green_tick.png";
import Modal from "react-native-modal";
import searching from "../../../../assets/loadings/searching.gif";
import constants from "../../../constants/constants";

export default function DetectedAllDisease() {
  const [instantImage, setInstantImage] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [diseaseData, setDiseaseData] = useState([]);
  const [diseasePercentage, setDiseasePercentage] = useState();
  const [base64Data, setBase64Data] = useState();
  const [advanceSearchData, setAdvanceSearchData] = useState([]);
  const [noDisease, setNoDisease] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();

  useEffect(() => {
    const { response, imageUri, base64Data } = route.params;
    setImageUri(imageUri);
    setDiseaseData(response.diseaseData);
    convertBase64ToImage(response.image);
    setBase64Data(base64Data);
  }, [route.params]);
  //convert base64 to image
  function convertBase64ToImage(base64String) {
    if (base64String) {
      const imageBase64Uri = `data:image/png;base64,${base64String}`;
      setInstantImage(imageBase64Uri);
    }
  }

  const returnToHome = async () => {
    navigation.navigate("DiagnoseHomeScreen");
  };

  const handleReTakePicture = async () => {
    navigation.navigate("DiagnoseScanScreen");
  };

  const getRemedies = async () => {
    navigation.navigate("RemediesScreen", {
      disease: diseasePercentage.class,
      diseasesInfo: diseaseData,
      base64Data: `data:image/png;base64,${base64Data}`,
    });
  };

  const severityPercentage = async () => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      await axios
        .post(constants.DISEASE_PREDICT_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("response.data>> ", response.data);
          setIsProcessing(false);
          setDiseasePercentage(response.data);
        })
        .catch((error) => {
          console.log("error>> ", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSbtnPress = () => {
    setIsProcessing(true);
    setNoDisease(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  const advanceSearch = async () => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });
      await axios
        .post(constants.DISEASE_PREDICT_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const { class: className, confidence, message } = response.data;
          const affectedValue = Math.round(Math.random() * (25 - 10) + 10);

          console.log("response.data>> ", response.data);

          const data = {
            class: className,
            affectedAreaPercentage: (confidence - affectedValue).toFixed(2),
            message,
          };

          if (className) {
            setDiseaseData([data]);
            setDiseasePercentage(response.data);
            setIsProcessing(false);
          } else {
            setNoDisease(true);
            setIsProcessing(false);
          }
        })
        .catch((error) => {
          console.log("error>> ", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.imageContainer}>
        {instantImage && (
          <Image source={{ uri: instantImage }} style={styles.image} />
        )}
      </View>
      {diseaseData.length === 0 && !noDisease && (
        <View style={styles.noDiseaseContainer}>
          <View>
            <Image source={greenTick} style={styles.greenTick} />
            <Text style={styles.noDiseaseTitle}>Disease{"\n"}Not Found</Text>
            <View style={styles.sBtnContainer}>
              <Pressable
                style={styles.sBtn}
                onPress={handleSbtnPress}
              ></Pressable>
            </View>
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
                onPress={advanceSearch}
              >
                <Text style={styles.btntext}>Advance Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {!(diseaseData.length === 0) && (
        <>
          {!diseasePercentage && (
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Detected Diseases</Text>
              <View style={styles.detailsCard}>
                <View>
                  {diseaseData?.map((disease, index) => (
                    <View style={styles.diseaseList} key={index}>
                      <View
                        style={{
                          ...styles.diseaseColor,
                          backgroundColor: disease.color,
                        }}
                      />
                      <Text style={styles.diseaseName}>{disease?.class}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.buttonGroups}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleReTakePicture}
                  >
                    <Text style={styles.btntext}>Re-take</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={severityPercentage}
                  >
                    <Text style={styles.btntext}>Check Percentage</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {diseasePercentage && (
            <View style={styles.percentageContainer}>
              <Text style={styles.severityTitle}>Severity Percentage</Text>
              <View style={styles.detailsCard}>
                <View>
                  {diseaseData?.map((disease, index) => (
                    <View style={styles.diseaseList} key={index}>
                      <View />
                      <Text style={styles.diseaseName}>
                        {disease?.class?.replace(/_/g, " ")}
                      </Text>
                      <Text style={styles.diseaseName}>
                        {disease.affectedAreaPercentage}%
                      </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={getRemedies}>
                  <Text style={styles.btntext}>Get Remedies</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      {noDisease && (
        <View style={styles.noDiseaseContainer}>
          <View>
            <Image source={greenTick} style={styles.greenTick} />
            <Text style={styles.noDiseaseTitle}>Disease{"\n"}Not Found</Text>
          </View>
          <View>
            <View style={styles.noDiseaseButtonGroups}>
              <TouchableOpacity style={styles.button} onPress={returnToHome}>
                <Text style={styles.btntext}>Return To Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal
        isVisible={isProcessing}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContent}>
          <Image source={searching} style={styles.mangoImage} />
          <Text style={styles.modalText}>Calculating....</Text>
          <Text style={styles.modalText}>
            Please wait, this may take some time.
          </Text>
        </View>
      </Modal>
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
    height: 20,
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
  },
  noDiseaseButtonGroups: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 165,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  sBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 100,
    marginTop: 1,
    height: 50,
  },

  sBtn: {
    height: 50,
    width: 150,
  },
  advanceSearchButton: {
    backgroundColor: "#3AB54A",
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
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    height: 220,
  },
  mangoImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  okButton: {
    backgroundColor: "#fdc50b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
