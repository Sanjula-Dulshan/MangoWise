import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ScanScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
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
            <Button icon="image" />
            <Button icon="circle" size={70} />
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
