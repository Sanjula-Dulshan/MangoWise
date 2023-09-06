import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Common/Header";
import Button from "./Button";
import { manipulateAsync } from "expo-image-manipulator";
import axios from "axios";
import constants from "../../../constants/constants";

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [base64Data, setBase64Data] = useState(null);
  const type = Camera.Constants.back;
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [classType, setClassType] = useState(null);
  const [flag, setFlag] = useState(false);

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
        const data = await cameraRef.current.takePictureAsync({ base64: true });
        setBase64Data(data.base64);
        setImage(data.uri);
        setGallery(false);
        setFlag(true);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const getGalleryImage = async () => {
    setFlag(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setBase64Data(result.assets[0].base64);
        setGallery(true);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const checkImage = async () => {
    if (image) {
      try {
        // Save image to gallery
        if (!gallery) {
          await MediaLibrary.createAssetAsync(image);
        }
  
        // // Resize image
        // const manipulatedResult = await manipulateAsync(
        //   image,
        //   [{ resize: { width: 256, height: 256 } }],
        //   { base64: false } // Do not convert to base64
        // );
  
        // setIsLoading(true);
  
        // // Create a FormData object to send the image as a file
        // const formData = new FormData();
        // formData.append("image", {
        //   uri: manipulatedResult.uri,
        //   type: "image/jpeg", // Adjust the image type if needed
        //   name: "image.jpg", // Adjust the file name if needed
        // });
  
        const response = await axios.post(
          constants.backend_url + "/bud/predict",
          image,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for sending files
            },
          }
        );
  
        console.log(response.data);
        setIsLoading(false);

        console.log("flag :: ", flag);
  
        navigation.navigate("BuddingResultScreen", {
          response: response.data,
          imageUri: image,
          base64Data: manipulatedResult.uri, // Change this if needed
          flagA: flag,
        });
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        // Save image to gallery
        if (!gallery) {
          await MediaLibrary.createAssetAsync(image);
        }
  
        // Resize image
        const manipulatedResult = await manipulateAsync(
          image,
          [{ resize: { width: 256, height: 256 } }],
          { base64: true }
        );

        const base64Data = "data:image/png;base64,"+manipulatedResult.base64;

        console.log("base64Data: ", base64Data);
  
        setIsLoading(true);
  
        await axios({
          method: "POST",
          url: constants.backend_url + "/bud/save",
          data: {
            image: base64Data,
            class: classType,
            
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        console.log(response.data);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const advanceBudSearch = async () => {

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      });
      await axios
        .post(
          "https://us-central1-mangowise-395709.cloudfunctions.net/bud_predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setIsLoading(false);
          console.log("response>> ", response.data);
          console.log("image>> ", image);
          setClassType(response.data.class);

          navigation.navigate("BuddingResultScreen", {
            response: response.data,
            imageUri: image,
            flagA: flag,
          });

          saveImage();
        })
        .catch((error) => {
          console.log("error>> ", error);
        });
    } catch (error) {
      console.error("Error:", error);
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
        {isLoading ? (
            <ActivityIndicator
              size="large"
              style={styles.camera}
              color="#fdc50b"
            />
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
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
          <View style={styles.buttons}>
            <Button
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Button title={"Check"} icon="check" onPress={advanceBudSearch} />
          </View>
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
});
