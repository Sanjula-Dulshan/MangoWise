import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sampleMangoLeaf from "../../../../assets/sample-mango-leaf2.jpg";
import Header from "../../../components/Common/Header";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetectedAllDisease() {
  const [instantImage, setInstantImage] = useState();
  const [imageUri, setImageUri] = useState();

  const route = useRoute();

  useEffect(() => {
    const { base64, imageUri } = route.params;
    setImageUri(imageUri);
    convertBase64ToImage(base64.image);
  }, []);
  //convert base64 to image
  function convertBase64ToImage(base64String) {
    if (base64String) {
      const imageBase64Uri = `data:image/png;base64,${base64String}`;
      setInstantImage(imageBase64Uri);
    }
  }

  const getRemedies = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri, // Replace with your image file path
        type: "image/jpeg", // Adjust the image type if needed
        name: "image.jpg", // Provide a suitable name for the image
      });

      await axios
        .post(
          "https://us-central1-mangowise-395709.cloudfunctions.net/disease_predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("response>> ", response);
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
      <View style={styles.details}>
        <Text>Anthracnose</Text>
        <Text>Sooty Mould</Text>

        <Text>Powdery Mildew</Text>

        <TouchableOpacity style={styles.button} onPress={getRemedies}>
          <Text style={styles.btntext}>Get remedies</Text>
        </TouchableOpacity>
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
  details: {
    flex: 1,
    marginTop: 40,
    justifyContent: "center",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    height: 20,
    backgroundColor: "#EAEAEA",
    padding: 20,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: -40,
    alignSelf: "center",
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 8,
  },
});
