import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../../components/Common/Header";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import treatment from "./treatment-api";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import constants from "../../../constants/constants";

export default function Remedies() {
  const route = useRoute();
  const [disease, setDisease] = useState();
  const [diseasesInfo, setDiseasesInfo] = useState();

  const [base64Data, setBase64Data] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    console.log("route.params>> ", route.params);
    const { disease, diseasesInfo, base64Data } = route.params;
    setDisease(disease);
    setDiseasesInfo(diseasesInfo);
    setBase64Data(base64Data);
  }, [route.params]);

  const returnToHome = async () => {
    const data = {
      mainDisease: disease.replace(/_/g, " "),
      diseasesInfo: diseasesInfo,
      image: base64Data,
    };

    await axios.post(constants.backend_url + "/disease", data).then(() => {
      navigation.navigate("DiagnoseHomeScreen");
    });
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Remedies and Caring {"\n"}Instructions</Text>
        {treatment.map((item, key) => {
          if (item.disease == disease) {
            return (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                key={key}
              >
                <Text style={styles.diseaseLabel}>Disease to be treated:</Text>
                <Text style={styles.diseaseName}>
                  {item.disease.replace(/_/g, " ")}
                </Text>
                <View style={styles.symptomList}>
                  {item?.symptoms?.map((symptom, key) => (
                    <View style={styles.symptom} key={key}>
                      <Text style={styles.symptomBullet}>•</Text>
                      <Text style={styles.symptomText}>{symptom}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.organicLabelContainer}>
                  <Ionicons name="leaf-outline" size={25} color="black" />
                  <Text style={styles.organicLabel}>Organic Treatment</Text>
                </View>
                <Text style={styles.organicText}>{item.organic}</Text>
                <View style={styles.chemicalLabelContainer}>
                  <SimpleLineIcons name="chemistry" size={25} color="black" />
                  <Text style={styles.chemicalLabel}>Chemical Treatment</Text>
                </View>
                <Text style={styles.chemicalText}>{item.chemical}</Text>
                <TouchableOpacity style={styles.button} onPress={returnToHome}>
                  <Text style={styles.btnText}>Return to Home</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          }
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  scrollView: {
    marginBottom: 90,
  },
  diseaseLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF1616",
  },
  symptomList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 10,
  },
  symptom: {
    flexDirection: "row",
  },
  symptomBullet: {
    fontSize: 16,
    fontWeight: "bold",
  },
  symptomText: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 40,
  },
  organicLabelContainer: {
    flexDirection: "row",
  },
  organicLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  organicText: {
    fontSize: 16,
    marginBottom: 40,
  },
  chemicalLabelContainer: {
    flexDirection: "row",
  },
  chemicalLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  chemicalText: {
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 165,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 3,
  },
});
