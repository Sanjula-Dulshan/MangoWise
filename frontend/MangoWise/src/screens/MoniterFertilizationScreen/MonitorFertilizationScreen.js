import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Button,
  TouchableOpacity,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-2';

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
    console.log('Granted C:' + granted );
    if (granted) {
      return true;
    } else {
      return false;
    }
  } else {
    // On iOS, Bluetooth access is always permitted
    return true;
  }
};

const hasPermission2 = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted2 = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );
    console.log(' C2:' + granted2);
    if (granted2) {
      return true;
    } else {
      return false;
    }
  } else {
    // On iOS, Bluetooth access is always permitted
    return true;
  }
};

const requestPermission = async () => {
  console.log('Requesting bluetooth permissions...')
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log('P1:' + granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    // On iOS, Bluetooth access is always permitted
    return true;
  }
};

const requestPermission2 = async () => {
  console.log('Requesting bluetooth permissions2...')
  await requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_SCAN, PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]).then((statuses) => {
  console.log('Camera', statuses[PERMISSIONS.ANDROID.BLUETOOTH_SCAN]);
  console.log('FaceID', statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]);
     });
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const granted2 = await request(
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      PERMISSIONS.ANDROID.BLUETOOTH
												)
    console.log(' P2:' + granted2);
    if (granted2 === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } else {
    // On iOS, Bluetooth access is always permitted
    return true;
  }
};

const MonitorFertilizationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceAddress, setSelectedDeviceAddress] = useState('');

  useEffect(() => {
    (async () => {
      const granted = await hasPermission();
      const granted2 = await hasPermission2();
      console.log('USE Granted:' + granted);
      if (!granted || !granted2) {
         const permission = await requestPermission();
         const permission2 = await requestPermission2();
        console.log('USE Permission:' + permission);
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

  const turnOnBluetooth = async () => {
    console.log('PPPG: '+permissionGranted)
    if (permissionGranted) {
        const permission2 = await requestPermission2();
        console.log('Permission2:' + permission2);
        if (permission2) {
          try {
          //  await BluetoothSerial.requestEnable();
          //   const id= '20:16:10:08:68:67'
          //   let ss=await BluetoothSerial.connect(id);
          //   console.log('SSSSS' + ss);
           // let ss2 = await BluetoothSerial.listUnpaired();
 const ss2 = await BluetoothSerial.readFromDevice()
  // //  .then(devices => {
  //    console.log('Unpaired devices:', devices._i);
     
  // })
  // .catch(error => {
  //   console.error('Error discovering unpaired devices:', error);
  // });


          // Splitting the console data into lines
          const lines = ss2.split('\n');

          // Storing the nutrient values
          let nitrogenValue, phosphorousValue, potassiumValue;

          // Iterating through each line and extracting the nutrient name and value
          lines.forEach((line) => {
  if (line.includes(':')) { // Check if the line contains the delimiter
    const [nutrient, value] = line.split(':');
    const trimmedNutrient = nutrient.trim();
    const trimmedValue = value.trim();

    if (trimmedNutrient === 'Nitrogen') {
      nitrogenValue = trimmedValue;
    } else if (trimmedNutrient === 'Phosphorous') {
      phosphorousValue = trimmedValue;
    } else if (trimmedNutrient === 'Potassium') {
      potassiumValue = trimmedValue;
    }
  }
});
            console.log('Nitrogen value:', nitrogenValue);
            console.log('Phosphorous value:', phosphorousValue);
            console.log('Potassium value:', potassiumValue);
            
          } catch (error) {
            console.log('Error turning on Bluetooth', error);
          }
        }else{
          console.log('NO');
        }
    } else {
      console.log('Permission to access fine location is required to use Bluetooth');
    }
  };

  const turnOffBluetooth = async () => {
    if (permissionGranted) {
      try {
        await BluetoothSerial.disconnect();
        console.log('Bluetooth turned off successfully');
      } catch (error) {
        console.log('Error turning off Bluetooth', error);
      }
    } else {
      console.log('Permission to access fine location is required to use Bluetooth');
    }
  };

    const discoverBluetoothDevices = async () => {
    try {
      const discoveredDevices = await BluetoothSerial.list();
      setDevices(discoveredDevices);
      setModalVisible(true);
    } catch (error) {
      console.error('Error discovering devices:', error);
    }
  };

   const handleDeviceSelection = async (address) => {
     setSelectedDeviceAddress(address);
      
     await BluetoothSerial.connect(address);
      
     setModalVisible(false);
     console.log('Selected device address:', address);
    // You can perform any additional actions here with the selected device address
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bluetooth Control</Text>
      <Button title="Turn On Bluetooth" onPress={turnOnBluetooth} />
      <Button title="Turn Off Bluetooth" onPress={turnOffBluetooth} />

      <Button title="Discover Devices" onPress={discoverBluetoothDevices} />
        <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Bluetooth Devices:</Text>
          {devices.map((device, index) => (
             <TouchableOpacity key={index} onPress={() => handleDeviceSelection(device.address)}>
              <Text>
                Device name: {device.name}, Device address: {device.address}
              </Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View></Modal>
  
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MonitorFertilizationScreen;
