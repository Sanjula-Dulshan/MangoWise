import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  Image
} from 'react-native';
import Header from '../../components/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { set, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import BluetoothSerial from 'react-native-bluetooth-serial-2';
import sensorimage from '../../../assets/NPKSensor.png'
import Modal from 'react-native-modal';

import {
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';

const hasPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const hasPermission2 = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted2 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );

    if (granted2) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const requestPermission = async () => {

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

const requestPermission2 = async () => {

  await requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]);

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted2 = await request(
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      PERMISSIONS.ANDROID.BLUETOOTH
    );
    if (granted2 === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};


export default function CheckFertilizerScreen() {
  const navigation = useNavigation();
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [stage, setStage] = useState(null);
  const [nitrogen, setNitrogen] = useState(0);
  const [phosporus, setPhosporus] = useState(0);
  const [potassium, setPotassium] = useState(0);
  let error = 0;
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceAddress, setSelectedDeviceAddress] = useState('');

  useEffect(() => {
    (async () => {
      const granted = await hasPermission();
      const granted2 = await hasPermission2();

      const connected = await BluetoothSerial.isConnected();

      if (connected == false) {
        setModalVisible(true);
      }

      if (!granted || !granted2) {
        const permission = await requestPermission();
        const permission2 = await requestPermission2();

        if (permission && permission2) {
          setPermissionGranted(true);

        } else {
          setPermissionGranted(false);
        }
      } else {
        setPermissionGranted(true);
      }
    })();
  }, []);

  let previousValues = {
    nitrogenValue: '',
    phosphorousValue: '',
    potassiumValue: ''
  };

  const turnOnBluetooth = async () => {

    const permission2 = await requestPermission2();

    if (permission2) {
      try {
        const sensorData = await BluetoothSerial.readFromDevice();
        const lines = sensorData.split('\n');

        let nitrogenValue, phosphorousValue, potassiumValue;

        // Iterating through each line and extracting the nutrient name and value
        await lines.forEach((line) => {
          if (line.includes(':')) { // Check if the line contains the delimiter
            const [nutrient, value] = line.split(':');
            const trimmedNutrient = nutrient.trim();
            const trimmedValue = value.trim();


            if (trimmedNutrient === 'Nitrogen') {
              nitrogenValue = trimmedValue;
            }
            if (trimmedNutrient === 'Phosphorous') {
              phosphorousValue = trimmedValue;
            }
            if (trimmedNutrient === 'Potassium') {
              potassiumValue = trimmedValue;
            }
          }
        });

        if (nitrogenValue == undefined) {
          nitrogenValue = 0;
        }
        if (phosphorousValue == undefined) {
          phosphorousValue = 0;
        }
        if (potassiumValue == undefined) {
          potassiumValue = 0;
        }

        // Check if any of the nutrient values have changed
        if (
          nitrogenValue !== previousValues.nitrogenValue ||
          phosphorousValue !== previousValues.phosphorousValue ||
          potassiumValue !== previousValues.potassiumValue
        ) {
          if (nitrogenValue !== undefined && phosphorousValue !== undefined && potassiumValue !== undefined &&
            nitrogenValue !== 0 && phosphorousValue !== 0 && potassiumValue !== 0
          ) {
            setNitrogen(nitrogenValue);
            setPhosporus(phosphorousValue);
            setPotassium(potassiumValue);
          }

          // Update previous values with the current ones
          previousValues = {
            nitrogenValue,
            phosphorousValue,
            potassiumValue
          };
        }

      } catch (error) {
        console.log('Error Reading Data', error);
      }
    } else {
      console.log('No Data');
    }
  };

  // Set the interval to periodically call the turnOnBluetooth function
  setInterval(turnOnBluetooth, 10000);

  const discoverBluetoothDevices = async () => {
    try {
      const discoveredDevices = await BluetoothSerial.list();
      setDevices(discoveredDevices);
    } catch (error) {
      console.error('Error discovering devices:', error);
    }
  };

  const handleDeviceSelection = async (address) => {
    setSelectedDeviceAddress(address);

    await BluetoothSerial.connect(address);

    const connected = await BluetoothSerial.isConnected();

    if (connected == true) {
      setModalVisible(false);
    }
    console.log('Connected device address:', address);
  };


  const stagedata = [
    { label: 'Before Flowering', value: 'Before Flowering' },
    { label: 'At Flowering', value: 'At Flowering' },
    { label: 'After Harvest', value: 'After Harvest' }

  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === stage}
      </View>
    );
  };

  //Send data to backend
  const onSubmit = () => {
    error = 0;
    if (years == 0 && months == 0) {
      error = 1;
      Alert.alert(
        'Error',
        'Please enter a valid value for age of the tree',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    };
    if (stage == null) {
      error = 1;
      Alert.alert(
        'Error',
        'Please select a growth stage',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    };

    if (error == 0) {
      const nvalue = parseInt(nitrogen.replace('mg/kg', ''));
      const pvalue = parseInt(phosporus.replace('mg/kg', ''));
      const kvalue = parseInt(potassium.replace('mg/kg', ''));

      const data = {
        age: (years * 12 + months),
        stage: stage,
        nitrogen: nvalue,
        phosporus: pvalue,
        potassium: kvalue
      };
      console.log(data);
      navigation.navigate('FertilizerSuggestionScreen', { data: data });
    };
  };

  const handleMonthChange = (text) => {
    const parsedValue = parseInt(text);
    if (parsedValue < 0 || parsedValue > 11) {
      Alert.alert(
        'Error',
        'Please enter a valid value between 1 and 11',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setMonths(isNaN(parsedValue) ? '' : parsedValue);
    }
  };



  return (
    <View style={{ backgroundColor: '#fdfafa' ,height:'100%'}}>

      <View style={styles.topic}>
        <TouchableOpacity onPress={() => navigation.navigate('MoniterFertilizationScreen')}>
          <View style={styles.backButton}>
            <Feather name="arrow-left" size={40} color="#000000" />
          </View>
        </TouchableOpacity>
        <Header />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}  style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={sensorimage}
            style={styles.sensorimage}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24, fontFamily: 'Roboto', fontWeight: 'bold', paddingTop: 2, textAlign: 'right', paddingRight: 13, marginLeft: 4 }}>Check Suitable     Fertilizer</Text>

        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 10, marginBottom: -18, marginTop: 10, textAlign: 'left' }}>Enter estimated age of the mango tree</Text>
        <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TextInput style={styles.input} 
           value={years.toString()}
           placeholder='Age in years'
           onChangeText={(text) => {
            const parsedValue = parseInt(text);
            setYears(isNaN(parsedValue) ? '' : parsedValue);
          }}
          keyboardType="numeric"  
          ></TextInput>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: -25, marginLeft: -10 }}> Years </Text>

          <TextInput style={styles.inputMonths} 
          value={months.toString()}
           placeholder='Months 1 to 11'
           onChangeText={handleMonthChange}
           keyboardType="numeric"
          ></TextInput>
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: -25, marginLeft: 2 }}> Months </Text>   
        </View>
        </View>

       
          <Modal isVisible={isModalVisible} style={styles.blModal}>
           <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.blButton} onPress={discoverBluetoothDevices} >
                <Text style={styles.blButtonText}>Discover Devices</Text>
              </TouchableOpacity>
              {devices.map((device, index) => (
                <TouchableOpacity key={index} onPress={() => handleDeviceSelection(device.address)}>
                  <Text style={styles.devices}>
                    {device.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            </ScrollView>
          </Modal>
        


        <Text style={{
          fontSize: 14, fontWeight: 'bold', marginLeft: 10, marginBottom: -10,
          marginTop: 20, textAlign: 'left'
        }}>Select current growth stage of the tree</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={stagedata}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Select Growth Stage"
          value={stage}

          onChange={item => {
            setStage(item.value);
          }}
          renderItem={renderItem} />

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 25, marginLeft: 20 }}> Nitrogen     (N)  : </Text>
          <Text style={styles.npk} >{nitrogen}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}> Phosporus (P)  : </Text>
          <Text style={styles.npk} >{phosporus}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }} >
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}> Potassium (K)  : </Text>
          <Text style={styles.npk} >{potassium}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btntext}>Generate Recommendations</Text>
        </TouchableOpacity>

    </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3fdee',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
  },
  npk: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    marginLeft: 30,
    height: 40,
    fontSize: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.21,

    elevation: 2,
  },
  input: {
    backgroundColor: 'white',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    borderRadius: 10,
    padding: 5,
    marginTop: -35,
    marginLeft: 0,
    marginRight: 15,
    height: 40,
    width: '30%',
    fontSize: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,

    elevation: 2,
  },
  inputMonths: {
    backgroundColor: 'white',
    justifyContent:'flex-end',
    borderRadius: 10,
    padding: 5,
    fontSize: 10,
    marginTop: -35,
    marginLeft: 35,
    height: 40,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,

    elevation: 2,
  },
  dropdown: {
    margin: 16,
    marginTop: 20,
    height: 45,
    width: 260,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'sans-serif'
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#fdc50b',
    padding: 10,
    width: 280,
    height: 65,
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
  },
  blModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e3f7d9',
    width: '60%',
    maxHeight: '40%',
    minHeight: '10%',
    marginTop: 170,
    marginLeft: 80,
    borderRadius: 20,
  },
  blButton: {
    backgroundColor: '#fdc50b',
    padding: 10,
    width: 200,
    height: 50,
    textAlign: 'center',
    color: '#144100',
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  devices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#e6f7dc',
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#030303',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    shadowColor: '#b4b4b4',
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,

    elevation: 2,
  },
  blButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#144100',
    padding: 6,
  },
  sensorimage: {
    width: 100,
    height: 110,
    marginTop: -15,
    marginLeft: 10,
    marginRight: -40,
  },
});
