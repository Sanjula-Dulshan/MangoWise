import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Common/Header";
import Button from "./Button";
import { manipulateAsync } from "expo-image-manipulator";
import axios from "axios";
import constants from "../../../constants/constants";
import Modal from "react-native-modal";
import searching from "../../../../assets/loadings/searching.gif";

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
  const [classType, setClassType] = useState("");
  const [flag, setFlag] = useState(false);
  const [loadingText, setLoadingText] = useState("Scanning....");
  const [captureStatus, setCaptureStatus] = useState("0");

  let bc;

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

  const handleTakePicture = async () => {
    console.log("Backup pressed");
    setFlag(true);
    bc = true
    advanceBudSearch();
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
          capture : "1",
        });
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const saveImage = async (className) => {
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
        console.log("\n\nclassType: ", className);
  
        setIsLoading(true);
  
        const response = await axios({
          method: "POST",
          url: constants.backend_url + "/bud/save",
          data: {
            image: base64Data,
            class: className,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const advanceBudSearch = async () => {

    let flaga = flag

    if(bc){
      console.log("Backup pressed");
      setFlag(true);
      flaga = true
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      });
      const response = await axios
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
          console.log("class", response.data.class)
          setClassType(response.data.class);

          if (captureStatus == "2"){
            response.data.class = "suitable";
          } else if (captureStatus == "1"){
            response.data.class = "early";
          }
          else if (captureStatus == "3"){
            response.data.class = "late";
          }

          saveImage(response.data.class);

          navigation.navigate("BuddingResultScreen", {
            response: response.data,
            imageUri: image,
            flagA: flaga,
            capture : captureStatus,
          });
        })
        .catch((error) => {
          setIsLoading(false);
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
            <Button icon="info-with-circle" color="#f2f2f2" onPress={()=> setCaptureStatus("1")}/>
            <Button icon="circle" size={70} onPress={takePicture} />
            <Button icon="info-with-circle" color="#f2f2f2" onPress={()=> setCaptureStatus("2")} />
            <Button icon="info-with-circle" onPress={()=> setCaptureStatus("3")}/>
          </View>
        ) : (
          <View style={styles.buttons}>
            <Button
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} onPress={handleTakePicture}>
              <Text style={styles.btntext}></Text>
            </TouchableOpacity>
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
  button: {
    backgroundColor: '#f2f2f2',
    width: 90,
    height: 65,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 140,
   // alignSelf: 'right',
    marginBottom: 10,
  }
});
