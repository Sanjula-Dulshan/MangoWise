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

export default function DetectedCamDisease() {
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
    if (route.params?.imageUri) {
      setImageUri(route.params?.imageUri);
    }
  }, [route.params]);

  const returnToHome = async () => {
    navigation.navigate("DiagnoseHomeScreen");
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

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
