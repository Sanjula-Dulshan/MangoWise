import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    warmUpAPICall();
  }, []);

  const warmUpAPICall = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.1605559903.fit_scale.size_760x427.png",
        type: "image/jpeg",
        name: "image.jpg",
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
        .then(() => console.log("warmed up disease_predict"));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#edde30",
  },
});
