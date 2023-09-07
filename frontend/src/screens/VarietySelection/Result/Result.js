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
import horanahiruImage from '../../../../assets/horanahiru.jpg';
import tomImage from '../../../../assets/Tom.jpeg';
import karthaImage from '../../../../assets/karthacolo.jpg';
import villardImage from '../../../../assets/villard.jpg';
import velleiImage from '../../../../assets/vellei.jpeg';
import malwanaImage from '../../../../assets/malwana.jpg';
import damparaImage from '../../../../assets/dampara.jpg';
import giraImage from '../../../../assets/giraaba.png';





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
  const [imgeUri, setImgeUri] = useState(horanahiruImage);
  const [Suitability,setSuitability] = useState("");
  const [className, setClassName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState(green_tick);
  const [mangoVarietyName, setMangoVarietyName] = useState("TOM EJC");
  const [mangoDescription, setMangoDescription] = useState("The Alphonso mango, also known as the 'King of Mangoes,' is renowned for its rich, sweet, and distinct flavor. It has a smooth, buttery texture and a pleasant aroma.");

  

const mangoOrigin = "Originated in India"; // Origin of the mango variety

  useEffect(() => {
    setModalVisible(true)
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
    // Add navigation logic to return to the home screen here
    navigation.navigate("Home");
  };

  const getVarietyImage = (varietyName) => {
    const varietyImageMapping = {
      "Horanahiru": horanahiruImage,
      "TOM EJC": tomImage,
      "Karthacolomban": karthaImage,
      "Villard": villardImage,
      "Velleicollomban": velleiImage,
      "Malwana": malwanaImage,
      "Dampara": damparaImage,
      "Giraaba": giraImage,
    };

    if (varietyName in varietyImageMapping) {
      return varietyImageMapping[varietyName];
    } else {
      return horanahiruImage;
    }
  };



  useEffect(() => {
    const { response} = route.params;
    console.log("Response Got :: ", response.variety);
    setImgeUri(getVarietyImage(response.variety));
    setVarietyData(response.variety);
  }, [route.params]);
  

  const handleChangeFeature = () => {
    console.log("Change Feature");
    navigation.navigate("VSelectAllScreens");
    navigation.navigate("VarietySelection");
  };
  

  const setVarietyData = (varietyName) => {

    if(varietyName == "Horanahiru"){
      setMangoVarietyName("Horanahiru");
      setMangoDescription("Horanahiru is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    }else if(varietyName == "TOM EJC"){
      setMangoVarietyName("TOM EJC");
      setMangoDescription("The Alphonso mango, also known as the 'King of Mangoes,' is renowned for its rich, sweet, and distinct flavor. It has a smooth, buttery texture and a pleasant aroma.");
    } else if(varietyName == "Karthacolomban"){
      setMangoVarietyName("Karthacolomban");
      setMangoDescription("Karthacolomban is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    } else if(varietyName == "Villard"){
      setMangoVarietyName("Villard");
      setMangoDescription("Villard is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    } else if(varietyName == "Velleicollomban"){
      setMangoVarietyName("Velleicollomban");
      setMangoDescription("Velleicollomban is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    } else if(varietyName == "Malwana"){
      setMangoVarietyName("Malwana");
      setMangoDescription("Malwana is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    } else if(varietyName == "Dampara"){
      setMangoVarietyName("Dampara");
      setMangoDescription("Dampara is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    } else if(varietyName == "Giraaba"){
      setMangoVarietyName("Giraaba");
      setMangoDescription("Giraaba is a Sri Lankan mango cultivar. It is a hybrid variety of Karthakolomban and Villard. It is a large mango, with a greenish-yellow skin colour when ripe. It is a juicy mango with a sweet taste. It is a popular mango variety in Sri Lanka.");
    }
  };

  return (
    
    <View style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      {imgeUri ? (
        <Image source={imgeUri} style={styles.varietyImage} />
      ) : (
        <Image source={horanahiruImage} style={styles.varietyImage} />
      )}
      

      

      <Modal isVisible={isModalVisible} style={styles.infoModal}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.titleName}>
              Matching Variety
            </Text>

            <Image
              source={imgeUri}
              style={styles.mangoImage}
            />

            <Text style={styles.mangoVarietyName}>
              {mangoVarietyName}
            </Text>

            <Text style={styles.description}>
              {mangoDescription}
            </Text>

            <TouchableOpacity style={styles.findSuitableVarierty} onPress={handleChangeFeature} >
                <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 5,  textAlign: 'center' }}> Change features </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Modal>


      


      
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
  findSuitableVarierty: {
    backgroundColor: '#FDC704',
    padding: 10,
    width: 280,
    height: 50,
    textAlign: 'center',
    color: '#000000',
    borderRadius: 15,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
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
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'gray',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mangoImage: {
    width: 130,
    height: 130,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mangoVarietyName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 10,
    textAlign: 'center',
  },
  titleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 22,
  },
  origin: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  infoModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    maxHeight: '100%',
    minHeight: '80%',
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