import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
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
import { set, useForm } from "react-hook-form";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import BluetoothSerial from 'react-native-bluetooth-serial-2';
import monitor from '../../../assets/monitor.jpg';
import Modal from 'react-native-modal';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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


export default function CheckFertilizerScreen({ route }) {

  const { id } = route.params;

  const navigation = useNavigation();
  const [age, setage] = useState(0);
  const [stage, setStage] = useState(null);
  const [nitrogen, setNitrogen] = useState(0);
  const [phosporus, setPhosporus] = useState(0);
  const [potassium, setPotassium] = useState(0);
  let error = 0;
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceAddress, setSelectedDeviceAddress] = useState('');
  const [isError, setError] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [record_id, setRecordId] = useState(0);
  const [nvalue, setnvalue] = useState(0);
  const [pvalue, setpvalue] = useState(0);
  const [kvalue, setkvalue] = useState(0);
  const [fertilizer, setfertilizer] = useState('');
  const [quantity, setquantity] = useState(0);
  const [newfertilizer, setnewfertilizer] = useState('');
  const [newquantity, setnewquantity] = useState(0);
  const [isMonitored, setMonitored] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      (async function getRecord() {
        try {
          const record = await axios.get(`http://192.168.1.246:8070/records/get/${id}`);
          if (record) {
            setDate(record.data.savedDate);
            setTime(record.data.savedTime);
            setRecordId(record.data.record_id);
            setnvalue(record.data.N_level);
            setpvalue(record.data.P_level);
            setkvalue(record.data.K_level);
            setfertilizer(record.data.fertilizer);
            setquantity(Math.ceil(record.data.quantity / 10) * 10);
            setage(record.data.age);

          } else {
            setDate('');
            setTime('');
            setRecordId(0);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }, [])
  );

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
        Alert.alert(
          'Error',
          'Can not read data from the sensor. Please make sure the sensor is connected and turned on.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        'Error',
        'Can not read data from the sensor. Please make sure the sensor is connected and turned on.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };


  // Set the interval to periodically call the turnOnBluetooth function
  setInterval(turnOnBluetooth, 1000);

  const discoverBluetoothDevices = async () => {
    Toast.show({
      type: 'info',
      text1: 'Searching for devices',
      position: 'bottom',
      visibilityTime: 1000,
    });
    try {
      const discoveredDevices = await BluetoothSerial.list();
      setDevices(discoveredDevices);
    } catch (error) {
      Alert.alert(
        'Error',
        'Can not find a device.Please check the sensor device is turend on and connected to the phone.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  const handleDeviceSelection = async (address) => {
    setSelectedDeviceAddress(address);
    Toast.show({
      type: 'info',
      text1: 'Connecting Please Wait!',
      position: 'bottom',
      visibilityTime: 5000,
    });
    try {
      await BluetoothSerial.connect(address);

      const connected = await BluetoothSerial.isConnected();

      if (connected == true) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          text1: 'Connected successfully!',
          position: 'bottom',
          visibilityTime: 1000,
        });
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Can not connect to the device.Please check and try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
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
  const onSubmit = async () => {
    error = 0;
    if (stage == null) {
      error = 1;
      setError(true);
    };

    if (error == 0) {
      try {
        const nvalue = parseInt(nitrogen.replace('mg/kg', ''));
        const pvalue = parseInt(phosporus.replace('mg/kg', ''));
        const kvalue = parseInt(potassium.replace('mg/kg', ''));

        try {
          Toast.show({
            type: 'info',
            text1: 'Calculating Fertilizer...Please wait!',
            position: 'bottom',
            visibilityTime: 2000,
          });
          const response = await axios.post('http://192.168.1.246:8070/fertilizer/monitor',
            {
              "nvalue": nvalue,
              "pvalue": pvalue,
              "kvalue": kvalue,
              "age": age,
              "growthStage": stage

            })
          const { result, result2 } = response.data
          setnewfertilizer(result);
          setnewquantity(Math.ceil(result2 / 10) * 10);;
          setMonitored(true);

        }
        catch (error) {
          console.error(error);
        }
      } catch (error) {
        Alert.alert(
          'Error',
          'Please make sure the sensor is connected and turned on.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }

    }
  };


  return (
    <View style={{ backgroundColor: '#fdfafa', height: '101%' }}>

      <View style={styles.topic}>
        <TouchableOpacity onPress={() => navigation.navigate('PreviousRecordsScreen')}>
          <View style={styles.backButton}>
            <Feather name="arrow-left" size={40} color="#000000" />
          </View>
        </TouchableOpacity>
        <Header />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={monitor}
            style={styles.monitorimage}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24, fontFamily: 'Roboto', fontWeight: 'bold', paddingTop: 2, textAlign: 'right', paddingRight: 13, marginLeft: 4 }}>Monitor the              Nutrient Level</Text>
        </View>

        <Modal isVisible={isError}>
          <View style={styles.modalContent}>
            <AntDesign name="warning" size={50} color="red" />
            <Text style={styles.modalText}> Please select a growth stage </Text>
            <TouchableOpacity style={styles.okButton} onPress={() => setError(false)}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5, color: 'white', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal isVisible={isMonitored}>
          <View style={styles.modalContent}>
            {newquantity > 50 ? (
              <View>
                <Entypo name="tree" size={60} color="#118424" style={{ marginTop: 5, marginLeft: 110 }} />
                <Text style={{ fontSize: 16, marginTop: 40, fontWeight: 'bold' }}> Please add  {newfertilizer}  {newquantity}g </Text>
                <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold', marginLeft: 100 }}> per tree. </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <AntDesign name="checkcircle" size={50} color="#118424" style={{ marginTop: 5, marginLeft: 0 }} />
                <Text style={{ fontSize: 16, marginTop: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 10 }}>No need to add fertilizer.</Text>
              </View>
            )}


            <TouchableOpacity style={styles.okButton} onPress={() => setMonitored(false)}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5, color: 'white', textAlign: 'center' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>


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
            <TouchableOpacity style={{ backgroundColor: 'grey', width: 70, height: 30, borderRadius: 10, marginTop: 190, alignItems: 'center', marginLeft: 80 }} onPress={() => navigation.navigate('PreviousRecordsScreen')} >
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingTop: 5 }}>Go Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

        <Text style={{
          fontSize: 14, marginLeft: 10, marginBottom: 0, fontWeight: 'bold',
          marginTop: 8, textAlign: 'left'
        }}>Previous Nutrient Status</Text>
        <View style={styles.inputmultiline}>

          <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> Date : {date}        </Text>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> Time: {time}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> Nitrogen          </Text>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> {nvalue} mg/kg</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> Phosphorous  </Text>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> {pvalue} mg/kg</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> Potassium       </Text>
            <Text style={{ fontSize: 10, marginTop: 0, marginLeft: 20 }}> {kvalue} mg/kg</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 0, marginLeft: 20 }}> {fertilizer}  {quantity}g  Added</Text>
          </View>
        </View>

        <Text style={{
          fontSize: 14, marginLeft: 10, marginBottom: -12, fontWeight: 'bold',
          marginTop: 8, textAlign: 'left'
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

        <Text style={{
          fontSize: 14, marginLeft: 15, marginBottom: -12, fontWeight: 'bold',
          marginTop: 5, textAlign: 'left'
        }}>Current Nutrient Status</Text>

        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={{ fontSize: 14, marginTop: 25, marginLeft: 20 }}> Nitrogen     (N)  : </Text>
          <Text style={styles.npk} >{nitrogen}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 14, marginLeft: 20, marginTop: 20 }}> Phosporus (P)  : </Text>
          <Text style={styles.npk} >{phosporus}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20 }} >
          <Text style={{ fontSize: 14, marginLeft: 20, marginTop: 20 }}> Potassium (K)  : </Text>
          <Text style={styles.npk} >{potassium}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btntext}>Check Now</Text>
        </TouchableOpacity>

      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  inputmultiline: {
    marginBottom: 10,
    marginTop: 10,
    width: '90%',
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2
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
    width: 130,
    height: 42,
    paddingBottom: 12,
    borderRadius: 25,
    marginTop: 0,
    alignSelf: 'center',
    marginBottom: 20,
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
  monitorimage: {
    width: 85,
    height: 80,
    marginTop: 0,
    marginLeft: 30,
    marginRight: -50,
    borderRadius: 50,
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
    marginTop: 25,
    marginBottom: -20
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
});
