import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Common/Header";
import Button from "./Button";
import axios from "axios";
import constants from "../../../constants/constants";
import { manipulateAsync } from "expo-image-manipulator";
import searching from "../../../../assets/loadings/searching.gif";
import Modal from "react-native-modal";

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const type = Camera.Constants.back;
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        setGallery(false);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const getGalleryImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setGallery(true);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const checkImage = async () => {
    console.log("checkImage");
    if (image) {
      try {
        //Save image to gallery
        if (!gallery) {
          await MediaLibrary.createAssetAsync(image);
        }

        //Resize image and convert to base64
        const manipulatedResult = await manipulateAsync(
          image,
          [{ resize: { width: 240, height: 240 } }],
          { base64: true }
        );
        const base64Data = manipulatedResult.base64;

        setIsLoading(true);
        await axios({
          method: "POST",
          url: constants.backend_url + "/variety/predict",
          data: {
            image: base64Data,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setIsLoading(false);
            console.log("scan>>>> ", response.data);
            navigation.navigate("DetectedAllVarieties", {
              response: response.data,
              imageUri: image,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {!image ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <Text>Hello</Text>
        </Camera>
      ) : (
        <>
          <Modal
            isVisible={isLoading}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
            <View style={styles.LoadModalContent}>
              <Image source={searching} style={styles.mangoImage} />
              <Text style={styles.LoadModalText}>Scanning....</Text>
              <Text style={styles.LoadModalText}>
                Please wait, this may take some time.
              </Text>
            </View>
          </Modal>
          <Image source={{ uri: image }} style={styles.camera} />
        </>
      )}
      <View>
        {!image ? (
          <View style={styles.buttons}>
            <Button icon="image" onPress={getGalleryImage} />
            <Button icon="circle" size={70} onPress={takePicture} />
            <Button icon="info-with-circle" />
          </View>
        ) : (
          <>
            <View style={styles.buttons}>
              <Button
                title={"Re-take"}
                icon="retweet"
                onPress={() => setImage(null)}
              />
              <Button title={"Checks"} icon="check" onPress={checkImage} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  LoadModalContent: {
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
  LoadModalText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
