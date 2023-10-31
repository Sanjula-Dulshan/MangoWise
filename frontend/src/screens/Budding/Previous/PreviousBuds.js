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
import Modal from "react-native-modal";
import loadingIcon from "../../../../assets/loadings/loading.gif";

export default function PreviousBuds() {
  const [diseasesList, setDiseasesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    axios.get(constants.BACKEND_URL + "/bud/get").then((response) => {
      setDiseasesList(response.data);
      setLoading(false);
    });
  }, [route.params]);

  const recheck = (disease) => {
    navigation.navigate("DiagnoseScanScreen", {
      recheck: true,
      prevDisease: disease,
    });
  };

  const viewDetails = (disease) => {
    setSelectedDisease(disease);
    setPopupVisible(true);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRecord, setSelectedDisease] = useState(null);

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />

      {loading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={loadingIcon}
            style={{
              width: 200,
              height: 150,
              alignSelf: "center",
              marginTop: 100,
            }}
          />
        </View>
      ) : (
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
                        <Text style={styles.name}>{disease?.class}</Text>
                        <Text style={styles.date}>
                          {moment(disease.updatedAt).format("DD/MM/YYYY")}
                        </Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => viewDetails(disease)}
                        >
                          <Text style={styles.btntext}>View</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={styles.arrowIcon}
                        onPress={() => viewDetails(disease)}
                      >
                        <Entypo
                          name="chevron-right"
                          size={40}
                          color="#fdc50b"
                        />
                      </TouchableOpacity>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View>

          {selectedRecord && (
            <Modal
              isVisible={popupVisible}
              backdropOpacity={0.75}
              animationIn="zoomInDown"
              animationOut="zoomOutUp"
              animationInTiming={600}
              animationOutTiming={700}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={700}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    width: "80%",
                  }}
                >
                  <Image
                    source={{ uri: selectedRecord.image }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}
                  >
                    {selectedRecord.mainDisease}
                  </Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {moment(selectedRecord.updatedAt).format("DD/MM/YYYY")}
                  </Text>
                  <Text style={{ marginTop: 10, marginBottom: 10 }}>
                    Result Detected:{" "}
                    <Text style={{ color: "red" }}>{selectedRecord.class}</Text>
                  </Text>

                  <TouchableOpacity
                    style={styles.modelButton}
                    onPress={() => {
                      closePopup();
                    }}
                  >
                    <Text style={styles.modelBtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
      )}
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
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 10,
    color: "gray",
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

  modelButton: {
    backgroundColor: "#fdc50b",
    width: 90,
    height: 35,
    borderRadius: 25,
    padding: 4,
    alignSelf: "flex-end",
    marginTop: 30,
    justifyContent: "center",
  },
  modelBtnText: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#144100",
  },
  loadingContainer: {
    height: "60%",
    justifyContent: "center",
  },
});
