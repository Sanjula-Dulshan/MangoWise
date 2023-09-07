import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



export default function ImageCapture({ navigation }) {
  const [image, setImage] = useState(null);

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const openGallery = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Capture</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.buttonText}>Use Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
