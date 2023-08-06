import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState(false);
  const type = Camera.Constants.back;
  const cameraRef = useRef(null);

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
    if (image) {
      try {
        //Save image to gallery
        if (!gallery) {
          await MediaLibrary.createAssetAsync(image);
        }

        const base64Image = await convertToBase64(image); //Convert image to base64
        await logBase64(base64Image); //to see in console

        //TODO: Send this base64Image to the YOLO model
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const convertToBase64 = async (image) => {
    const parts = image.split(".");
    const extension = parts[parts.length - 1];
    const base64Data = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const base64 = `data:image/${extension};base64,${base64Data}`;

    return base64;
  };

  const logBase64 = async (base64String, chunkSize = 200) => {
    for (let i = 0; i < 100; i += chunkSize) {
      const chunk = base64String.slice(i, i + chunkSize);
      console.log("base64String: ", chunk);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <Text>Hello</Text>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
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
            <Button title={"Check"} icon="check" onPress={checkImage} />
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
