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

export default function PreviousDiseases() {
  const [varietyList, setVarietyList] = useState([]);
  const route = useRoute();
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(constants.backend_url + "/variety").then((response) => {
      setVarietyList(response.data);
      setLoading(false);
    });
  }, [route.params]);

  const recheck = (variety) => {
    navigation.navigate("VarietyScanScreen", {
      recheck: true,
      preVariety: variety,
    });
  };

  const viewDetails = (variety) => {
    setSelectedVariety(variety);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const navigation = useNavigation();

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
            {varietyList?.map((variety, key) => {
              return (
                <View key={key}>
                  <Card containerStyle={styles.card}>
                    <View style={styles.cardContainer}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: variety?.image }}
                      />
                      <View style={styles.description}>
                        <Text style={styles.name}>
                          {" "}
                          {(variety?.variety).toLowerCase()}
                        </Text>
                        <Text style={styles.date}>
                          {moment(variety.updatedAt).format("DD/MM/YYYY")}
                        </Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => recheck(variety)}
                        >
                          <Text style={styles.btntext}>Recheck</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={styles.arrowIcon}
                        onPress={() => viewDetails(variety)}
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

          {selectedVariety && (
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
                    source={{ uri: selectedVariety.image }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}
                  >
                    {selectedVariety.variety}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: 10,
                      fontStyle: "italic",
                    }}
                  >
                    {selectedVariety.month}
                  </Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {moment(selectedVariety.updatedAt).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    Current Price :{" "}
                    <Text style={{ color: "red" }}>
                      Rs.{selectedVariety.price}
                    </Text>
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
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
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
    marginLeft: 50,
    marginTop: 50,
    transform: [{ rotate: "45deg" }],
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
