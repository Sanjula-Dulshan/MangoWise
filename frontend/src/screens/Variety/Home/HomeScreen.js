import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../../components/Common/Header";
import vector from "../../../../assets/Vector.png";
import focusLeaf from "../../../../assets/focus-leaf.png";
import doc from "../../../../assets/Doc.png";
import axios from "axios";
import mango from "../../../../assets/Mango.png";
import plant from "../../../../assets/plant.png";
import Phone from "../../../../assets/Phone.png";
import report from "../../../../assets/report.png";
import sampleMangoLaaf from "../../../../assets/sample-mango-leaf.jpg";
import constants from "../../../constants/constants";

export default function HomeScreen() {
  const [varietyList, setVarietyList] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const handleTakePicture = () => {
    navigation.navigate("VarietyScanScreen");
  };

  const handlePreviousPicture = () => {
    navigation.navigate("PreviousVarieties");
  };

  useEffect(() => {
    try {
      axios.get(constants.backend_url + "/variety").then((response) => {
        console.log("variety ", response.data);
        setVarietyList(response.data);
      });
    } catch (error) {
      console.log("error ", error);
    }
  }, [route.params]);

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />

      <Text
        style={{
          fontSize: 20,
          fontFamily: "Roboto",
          paddingTop: 10,
          textAlign: "left",
          paddingRight: 13,
          marginLeft: 20,
          fontStyle: "italic",
        }}
      >
        It's time to identify
      </Text>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto",
            paddingTop: 2,
            textAlign: "left",
            paddingRight: 13,
            marginLeft: 20,
            fontStyle: "italic",
          }}
        >
          your mango variety
        </Text>
        <Image source={plant} style={styles.virusIcon} resizeMode="contain" />
      </View>
      <View style={styles.imageContainer}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            justifyContent: "space-between",
          }}
        >
          <Image source={mango} style={styles.focusLeaf} resizeMode="contain" />
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />

          <Image
            source={Phone}
            style={styles.searchLeaf}
            resizeMode="contain"
          />
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />
          <Image source={doc} style={styles.reportimage} resizeMode="contain" />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginTop: -5,
                marginLeft: 10,
              }}
            >
              Take a
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginTop: 0,
                marginLeft: 10,
              }}
            >
              picture
            </Text>
          </View>

          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 5,
                marginLeft: 15,
                marginTop: -5,
              }}
            >
              See{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 5,
                marginLeft: 8,
                marginTop: 0,
              }}
            >
              variety
            </Text>
          </View>

          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 5,
                marginLeft: 15,
                marginTop: -5,
              }}
            >
              Get{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 5,
                paddingLeft: 5,
                marginLeft: 5,
                marginTop: 0,
              }}
            >
              Recommendations
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        <Text style={styles.btntext}>Take a Picture</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            paddingRight: 13,
            marginLeft: 21,
            marginTop: 0,
            fontWeight: 500,
          }}
        >
          Previous Pictures
        </Text>
        <TouchableOpacity onPress={handlePreviousPicture}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "left",
              paddingRight: 15,
              marginTop: 0,
              fontWeight: 500,
              color: "#fdc50b",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        {console.log("varietyList ", varietyList)}
        {varietyList.slice(0, 3).map((variety, key) => {
          return (
            <TouchableOpacity key={key}>
              <View style={styles.image}>
                <Image
                  source={{ uri: variety?.image }}
                  style={styles.sampleMangoLeaf}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 5,
    marginTop: 40,
    width: "95%",
    height: "20%",
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f3fdee",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },

  topic: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#fdfafa",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 8,
  },
  backButton: {
    width: 30,
    height: 35,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -10,
    marginLeft: 15,
    marginRight: 60,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 220,
    height: 60,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 10,
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 8,
  },
  infoModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "80%",
    maxHeight: "60%",
    minHeight: "10%",
    marginTop: 170,
    marginLeft: 45,
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  okButton: {
    backgroundColor: "#fdc50b",
    padding: 10,
    width: 80,
    height: 50,
    textAlign: "center",
    color: "#144100",
    borderRadius: 25,
    marginTop: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  focusLeaf: {
    width: 60,
    height: 60,
    marginTop: -5,
    marginLeft: 5,
    marginRight: 0,
    marginBottom: 5,
  },
  searchLeaf: {
    width: 80,
    height: 60,
    marginTop: -4,
    marginLeft: 25,
    marginRight: 0,
    marginBottom: 5,
  },
  reportimage: {
    width: 80,
    height: 70,
    marginTop: -8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  vectorimage: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  modalText: {
    fontSize: 14,
    fontStyle: "italic",
    padding: 5,
    color: "#000000",
    textAlign: "center",
    marginTop: 25,
    marginBottom: -20,
  },

  virusIcon: {
    width: 20,
    height: 20,
    marginTop: 7,
  },
  image: {
    marginBottom: 5,
    marginTop: 10,
    width: "80%",
    height: "37%",
    marginLeft: 10,

    backgroundColor: "#f3fdee",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  sampleMangoLeaf: {
    width: 80,
    height: 90,

    marginLeft: 5,
    marginRight: 20,
    marginTop: 7,
    marginBottom: 5,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
  },
});
