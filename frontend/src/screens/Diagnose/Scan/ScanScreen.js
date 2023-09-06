import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
  const route = useRoute();
  const [recheck, setRecheck] = useState(false);
  const [prevDisease, setPrevDisease] = useState();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();

    if (route.params?.recheck) {
      setRecheck(true);
      setPrevDisease(route.params?.prevDisease);
    }
  }, [route.params]);

  if (hasCameraPermission === false) {
    console.log("No access to camera");
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
      console.log("Storage permission error ", error);
    }
  };

  const checkImage = async () => {
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
          url: constants.backend_url + "/disease/predict",
          data: {
            image: base64Data,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setIsLoading(false);

            if (recheck) {
              navigation.navigate("DiseaseCompareScreen", {
                response: response.data,
                imageUri: image,
                base64Data: base64Data,
                prevDisease: prevDisease,
              });
            } else {
              navigation.navigate("DetectedAllDiseaseScreen", {
                response: response.data,
                imageUri: image,
                base64Data: base64Data,
              });
            }
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
            <View style={styles.modalContent}>
              <Image source={searching} style={styles.mangoImage} />
              <Text style={styles.modalText}>Scanning....</Text>
              <Text style={styles.modalText}>
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
              <Button title={"Check"} icon="check" onPress={checkImage} />
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
