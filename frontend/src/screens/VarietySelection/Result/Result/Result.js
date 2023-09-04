import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  SectionList,
  PermissionsAndroid,
  FlatList,
  Image
} from 'react-native';
import Header from "../../../components/Common/Header";
import { useNavigation,useRoute } from "@react-navigation/native";
import { Feather, AntDesign } from '@expo/vector-icons';
import green_tick from '../../../../assets/green_tick.png';
import red_warning from '../../../../assets/red_warning.png';
import Modal from 'react-native-modal';
import backgroundImage from '../../../../assets/tmp-plant.png';





const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFAFA',
    height: 100,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});


export default function BuddingResultScreen() {

  const route = useRoute();

  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [imgeUri, setImgeUri] = useState(backgroundImage);
  const [Suitability,setSuitability] = useState("");
  const [className, setClassName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState(green_tick);

  useEffect(() => {
    setModalVisible(true)
  }, []);

  useEffect(() => {
    const { response, imageUri, base64Data } = route.params;
    console.log("image uri :: ", imageUri);
    setImgeUri(imageUri);
    console.log("image uri 1:: ", imageUri);
    setSuitability(response.class);
    console.log("response", response.class);
  }, [route.params]);
  
  useEffect(() => {
    if (Suitability == "suitable") {
      setClassName("Suitable");
      setColor("green");
      setIcon(green_tick);
    }  else if (Suitability == "late") {
      setClassName("Too Much Matured");
      setColor("red");
      setIcon(red_warning);
    } else  {
      setClassName("Early");
      setColor("orange");
      setIcon(red_warning);
    }
      
  }, [Suitability]);

  

  const handleRetakePicture = async () => {
    setModalVisible(false);
    navigation.navigate("BuddingScanScreen");
  }

  const handleFindVariety = async () => {
    setModalVisible(false);
    navigation.navigate("VarietySelection");
  }

  return (
    
    <View style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      {imgeUri ? ( // Check if imgeUri is not null
      <Image source={imgeUri} style={{ flex: 1, resizeMode: 'cover' }} />
    ) : (
      // Display a placeholder or loading image when imgeUri is null
      <Image source={require('../../../../assets/tmp-plant.png')} style={{ flex: 1, resizeMode: 'cover' }} />
    )}
      

      

      <Modal isVisible={isModalVisible} style={styles.infoModal} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            <Image source={icon} style={{ marginTop: 45, width: 130, height: 130, marginVertical: 8 }} />

            <Text style={{ fontSize: 25, padding: 5, margin: 8, textAlign: 'left', marginRight: 12 }}>Plant is  </Text>
            <Text style={{ fontSize: 35, marginTop: -15, textAlign: 'left', fontWeight: 'bold', color: color }}> {className} </Text>

            
            <TouchableOpacity style={styles.findVarierty} onPress={() => handleFindVariety()} >
              <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 5, color: 'white', textAlign: 'center' }}> Find matching variety </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.retakePhoto} onPress={() => handleRetakePicture()} >
              <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 5,  textAlign: 'center' }}> Retake photo </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginTop: 15 }}>Need Help?</Text>


      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign name="infocirlceo" size={24} color="black" style={{ marginTop: 10, marginLeft: 20 }} />
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 13, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline', fontStyle: 'italic' }}>Snap Tips </Text>
        </View>
      </TouchableOpacity>


      
    </View>
  )
}

const styles = StyleSheet.create({

  imageContainer: {
    marginBottom: 5,
    marginTop: 30,
    width: '95%',
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f3fdee',
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  topic: {
    flexDirection: 'row',
    paddingTop: 20,
    backgroundColor: '#fdfafa',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 8
  },
  backButton: {
    width: 30,
    height: 35,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: -10,
    marginLeft: 15,
    marginRight: 60
  },
  button: {
    backgroundColor: '#fdc50b',
    width: 220,
    height: 65,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  btntext: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#144100',
    paddingTop: 10,
    marginTop: 10
  },
  infoModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    maxHeight: '90%',
    minHeight: '60%',
    marginBottom: 20,
    marginLeft: 0,
    borderRadius: 20,
    borderColor: '#899186',
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  okButton: {
    backgroundColor: '#fdc50b',
    padding: 10,
    width: 80,
    height: 50,
    textAlign: 'center',
    color: '#144100',
    borderRadius: 25,
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  findVarierty: {
    backgroundColor: 'green',
    padding: 10,
    width: 280,
    height: 50,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  retakePhoto: {
    backgroundColor: '#BBC6BC',
    padding: 10,
    width: 180,
    height: 50,
    textAlign: 'center',
    color: 'black',
    borderRadius: 15,
    marginTop: 0,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sensorimage: {
    width: 100,
    height: 110,
    marginTop: -20,
    marginLeft: -5,
    marginRight: 0,
    marginBottom: 5,
  },
  monitorimage: {
    width: 95,
    height: 120,
    marginTop: -20,
    marginLeft: 25,
    marginRight: 0,
    marginBottom: 5,
  },
  reportimage: {
    width: 100,
    height: 110,
    marginTop: -20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  vectorimage: {
    width: 30,
    height: 30,
    marginTop: -10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#899186',
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
  },
  modalText: {
    fontSize: 14,
    fontStyle: 'italic',
    padding: 5,
    color: '#000000',
    textAlign: 'center',
    marginTop:25,
    marginBottom:-20
  },

});