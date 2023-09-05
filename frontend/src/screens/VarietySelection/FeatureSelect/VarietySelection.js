import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons  } from '@expo/vector-icons';
import green_tick from '../../../../assets/green_tick.png';
import Modal from 'react-native-modal';
import backgroundImage from '../../../../assets/tmp-plant.png';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Geolocation from '@react-native-community/geolocation';
import constants from "../../../constants/constants";
import axios from 'axios';




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




export default function VarietySelection() {

  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCropIndex, setSelectedCropIndex] = useState(0); 
  const [selectedHarvestIndex, setselectedHarvestIndex] = useState(0);
  const [selectedTasteIndex, setselectedTasteIndex] = useState(0);
  const [selectedSizeIndex, setselectedSizeIndex] = useState(0);
  const [cropLocation, setCropLocation] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [zone, setZone] = useState('');

  useEffect(() => {
    setModalVisible(true)
  }, []);

  const suggestions = [
    "Colombo",
    "Kandy",
    "Gampaha",
    "Negombo",
    "Ratnapura",
    "Kalutara",
    "Avissawella",
    "Nuwara Eliya",
    "Hatton",
    "Kurunegala",
    "Matale",
    "Galle",
    "Matara",
    "Hambantota",
    "Polonnaruwa",
    "Anuradhapura",
    "Dambulla",
    "Badulla",
    "Bandarawela",
    "Jaffna",
    "Mannar",
    "Vavuniya",
    "Trincomalee",
    "Batticaloa",
    "Ampara",
    "Puttalam",
    "Monaragala",
    "Kilinochchi",
    "Mullaitivu"
  ];

  const wetZones = [
    "Colombo",
    "Kandy",
    "Gampaha",
    "Negombo",
    "Ratnapura",
    "Kalutara",
    "Avissawella",
    "Nuwara Eliya",
    "Hatton"
  ]

  const dryZones = [
    "Jaffna",
    "Mannar",
    "Vavuniya",
    "Trincomalee",
    "Batticaloa",
    "Ampara",
    "Puttalam",
    "Monaragala",
    "Kilinochchi",
    "Mullaitivu"
  ]

  const intermediateZones = [
    "Kurunegala",
    "Matale",
    "Galle",
    "Matara",
    "Hambantota",
    "Polonnaruwa",
    "Anuradhapura",
    "Dambulla",
    "Badulla",
    "Bandarawela"
  ]
  
  const handleTextChange = (text) => {
    setCropLocation(text);

    // Filter suggestions based on user input
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleFlatListPress = (item) => {
    handleTextChange(item);
    setFilteredSuggestions([]);
  }

  const handleOnBlur = () => {
    setFilteredSuggestions([]);  
  }
  
  const getZoneByLocation = (location) => {
    if (wetZones.includes(location)) {
      return "wet";
    } else if (dryZones.includes(location)) {
      return "dry";
    } else if (intermediateZones.includes(location)) {
      return "intermediate";
    }
  }

  const checkVariety = async () => { 
    let harvest = "medium";
    let taste = "good";
    let size = "big";
    let purpose = "personal";
    let climate = "wet";
  
    switch (selectedHarvestIndex) { 
      case 0:
        harvest = "high";
        break;
      case 1:
        harvest = "medium";
        break;
      case 2:
        harvest = "low";
        break;
      default:
        harvest = "medium";
    }
  
    switch (selectedTasteIndex) {
      case 0:
        taste = "good";
        break;
      case 1:
        taste = "average";
        break;
      default:
        taste = "good";
    }
  
    switch (selectedSizeIndex) {
      case 0:
        size = "big";
        break;
      case 1:
        size = "medium";
        break;
      case 2:
        size = "small";
        break;
      default:
        size = "big";
    }
  
    switch (selectedCropIndex) {
      case 0:
        purpose = "personal";
        break;
      case 1:
        purpose = "commercial";
        break;
      case 2:
        purpose = "export";
        break;
      default:
        purpose = "personal";
    }
  
    climate = getZoneByLocation(cropLocation);
  
    const payload = {
      harvest: harvest,
      climate: climate,
      taste: taste,
      purpose: purpose,
      size: size
    }
  
    try {
      const apiUrl = `https://us-central1-mangowise-395709.cloudfunctions.net/v_select_predict`;
      // Use Axios to make the API POST request
      console.log('Calling API : ', apiUrl);
  
      // Pass the payload as the second argument to axios.post
      const response = await axios.post(apiUrl, payload); // Use async/await to handle the promise
      console.log('Response : ', response.data);
      navigation.navigate("VarietyResultScreen", {
        response: response.data,
      });
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  
    console.log('payload : ', payload);
  }
  

  const handleRetakePicture = async () => {
    navigation.navigate("BuddingScanScreen");
  }

  const isFeatureSelected = (feature) => selectedFeatures.includes(feature);


  const getGPSPermission = async () => {

    console.log('getting GPSPermission');

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'GPS Permission',
            message: 'This app requires access to your GPS location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },

        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  const getGPRSLocation = async () => {
    console.log('getGPRSLocation');
  
    if (!permissionGranted) {
      console.log('getGPRSLocation permission not Granted');
      getGPSPermission();
    }
  
    if (permissionGranted) {
      console.log('getGPRSLocation permission Granted');
  
      Geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const apiUrl = `${constants.backend_url}/suggest?lat=${latitude}&long=${longitude}`;
  
            // Use Axios to make the API GET request
            console.log('Calling API : ', apiUrl);
            await axios.get(apiUrl).then((response) => {
              console.log('Response : ', response.data);
              setCropLocation(response.data);
            });
  
          } catch (error) {
            console.error('Error fetching or processing data:', error);
          }
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };
  
  

  const toggleFeatureSelection = (feature) => {
    if (isFeatureSelected(feature)) {
      setSelectedFeatures(selectedFeatures.filter(item => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={{ backgroundColor: '#fdfafa', height: '100%' }}>
        <Header />

      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>Time your bud </Text>
      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>perfectly</Text>

      <Text style={{ fontSize: 14, fontFamily: 'Inter', color: '#666666', paddingLeft: 20, marginTop: 10 }}>Please provide the characteristics you desire in your mango plant, and we will analyze your requirements to recommend the most suitable variety.</Text>
  
      <Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Purpose of crop :</Text>

      <SegmentedControl
        values={['Personal', 'Commercial', 'Export']}
        selectedIndex={selectedCropIndex}
        onChange={(event) => {
          setSelectedCropIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        fontStyle={{ fontSize: 16 }}
      />

<Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Crop location :</Text>

<View style={{ flex: 1}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
        <TextInput
          style={{
            width: '80%',
            height: 50,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#F8F8F8',
            borderRadius: 8,
            padding: 10,
            backgroundColor: '#eeeeee',
            color: '#000000',
          }}
          placeholder="Enter crop location"
          value={cropLocation}
          onChangeText={handleTextChange}
          onBlur={() => setFilteredSuggestions([])}
        />
        <TouchableOpacity onPress={getGPRSLocation} style={{ marginLeft: 10 }}>
          <MaterialIcons name="place" size={30} color="#FDC704" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Display suggestions */}
        <FlatList
        data={filteredSuggestions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: '#fff',
            }}
            onPress={() => handleFlatListPress(item)}
          >
              <Text style={{ fontSize: 16, color: '#333', marginLeft:20, fontWeight: 'bold' }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={{ maxHeight: 150 }} // Set a maximum height for the suggestion list
        />

    </View>
<Text style={{ fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', paddingLeft: 20, marginTop: 10, marginBottom: 10 }}>Required features :</Text>

{/* Checklist */}
<View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={() => toggleFeatureSelection('Harvest')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}} name={isFeatureSelected('Harvest') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 1') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Harvest') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Harvest</Text>
        </TouchableOpacity>

        {isFeatureSelected('Harvest') && (
          <SegmentedControl
            values={['High', 'Medium', 'Low']}
            selectedIndex={selectedHarvestIndex}
            onChange={(event) => {
              setselectedHarvestIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Taste')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}}  name={isFeatureSelected('Taste') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 2') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Taste') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Unique taste</Text>
        </TouchableOpacity>

        {isFeatureSelected('Taste') && (
          <SegmentedControl
            values={['Good', 'Average']}
            selectedIndex={selectedTasteIndex}
            onChange={(event) => {
              setselectedTasteIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Size')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}} name={isFeatureSelected('Size') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 1') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Size') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Size of fruit</Text>
        </TouchableOpacity>

        {isFeatureSelected('Size') && (
          <SegmentedControl
            values={['Big', 'Medium', 'Small']}
            selectedIndex={selectedSizeIndex}
            onChange={(event) => {
              setselectedSizeIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            fontStyle={{ fontSize: 16 }}
          />
        )}

        <TouchableOpacity onPress={() => toggleFeatureSelection('Resistance')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons style={{marginLeft:10}}  name={isFeatureSelected('Resistance') ? 'check-box' : 'check-box-outline-blank'} size={24} color={isFeatureSelected('Feature 2') ? '#E97918' : '#6C757D'} />
          <Text style={{ fontSize: 16, color: isFeatureSelected('Resistance') ? '#E97918' : '#6C757D', marginLeft: 10, padding:10 }}>Disease resistance</Text>
        </TouchableOpacity>
</View>
    

      <TouchableOpacity style={styles.findSuitableVarierty} onPress={checkVariety} >
          <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 5,  textAlign: 'center' }}> Find matching variety </Text>
      </TouchableOpacity>


      
    </View>
    </ScrollView>
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