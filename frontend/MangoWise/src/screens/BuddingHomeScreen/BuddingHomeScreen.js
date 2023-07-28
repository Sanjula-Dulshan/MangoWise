import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
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
import Header from '../../components/Header';
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign } from '@expo/vector-icons';
import BluetoothSerial from 'react-native-bluetooth-serial-2';
import plant from '../../../assets/plant.png'
import check from '../../../assets/check.png'
import bud from '../../../assets/bud.png';
import vector from '../../../assets/Vector.png';
import Modal from 'react-native-modal';

import {
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from 'react-native-permissions';

const ListItem = ({ item }) => {
  return (
    <View style={styles2.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles2.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles2.itemText}>{item.text}</Text>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Made for you',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Punk and hardcore',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Based on your recent listening',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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

export default function BuddingHomeScreen() {

  const navigation = useNavigation();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const granted = await hasPermission();
      const granted2 = await hasPermission2();

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

  const handlebtn1 = async () => {
    await BluetoothSerial.isEnabled().then(
      (res) => {
        if (res) {
              navigation.navigate('CheckFertilizerScreen');
            } else {
              setError(true);
            }
      }
    );
  };

  const handlebtn2 = async () => {
   await BluetoothSerial.isEnabled().then(
      (res) => {
        if (res) {
              navigation.navigate('PreviousRecordsScreen');
            } else {
              setError(true);
            }
      }
    );
  };

  return (
    <View style={{ backgroundColor: '#fdfafa', height: '90%' }}>
      <View style={styles.topic}>
        <TouchableOpacity onPress={() => navigation.navigate('CheckFertilizerScreen')}>
          <View style={styles.backButton}>
            <Feather name="arrow-left" size={40} color="#000000" />
          </View>
        </TouchableOpacity>
        <Header />
      </View>

      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>Time your bud </Text>
      <Text style={{ fontSize: 20, fontFamily: 'Roboto', paddingTop: 2, textAlign: 'left', paddingRight: 13, marginLeft: 20, fontStyle: 'italic' }}>perfectly</Text>
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Image
            source={plant}
            style={styles.sensorimage}
            resizeMode="contain"
          />

          <Image
            source={check}
            style={styles.reportimage}
            resizeMode="contain"
          />
          <Image
            source={bud}
            style={styles.monitorimage}
            resizeMode="contain"
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 0 }}>
          <View style={{ flexDirection: 'column', marginTop: 5 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 20, marginTop: -20 }}>Take a </Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 20, marginTop: 0 }}>picture</Text>
          </View>
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'column', marginTop: 5 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 15, marginTop: -20 }}>Check </Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 15, marginTop: 0 }}>Suitability</Text>
          </View>
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />
          <View style={{ flexDirection: 'column', marginTop: 5 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 15, marginTop: -20 }}>Proceed </Text>
            <Text style={{ fontSize: 12, fontFamily: 'Roboto', textAlign: 'left', paddingRight: 23, marginLeft: 15, marginTop: 0 }}>budding</Text>
          </View>
        </View>

      </View>

      <Modal isVisible={isModalVisible} style={styles.infoModal} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5, margin: 8, textDecorationLine: 'underline' }}> How to connect with the sensor </Text>

            <Text style={{ fontSize: 14, padding: 5, margin: 8, textAlign: 'left', marginRight: 12 }}>Insert the sensor's three pins into the soil sample.  </Text>
            <Text style={{ fontSize: 14, paddingTop: 5, marginTop: 8, textAlign: 'left', paddingHorizontal: 5 }}> Switch on the sensor device(Need two 9v batteries to power up the device). </Text>
            <Text style={{ fontSize: 14, padding: 5, marginTop: 18, textAlign: 'left' }}>Turn on mobile’s Bluetooth connection.  </Text>
            <Text style={{ fontSize: 14, padding: 5, marginTop: 18, textAlign: 'left', marginLeft: 5 }}>Search for available Bluetooth devices.  </Text>
            <Text style={{ fontSize: 14, padding: 5, marginTop: 18, textAlign: 'left', marginRight: 30 }}> Pair with the device name ‘HC-06’.  </Text>
            <Text style={{ fontSize: 14, padding: 5, marginTop: 18, textAlign: 'left', marginRight: 70 }}>Insert PIN 1234 to connect.  </Text>

            <TouchableOpacity style={styles.okButton} onPress={() => setModalVisible(false)} >
              <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5, color: 'white', textAlign: 'center' }}> OK </Text>
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

      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }} onPress={handlebtn1}>
        <Text style={styles.btntext}>Take a Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.button, marginTop: 10 }}onPress={handlebtn2}>
        <Text style={styles.btntext}>Choose a photo</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginTop: 15 }}>Previous Images</Text>


      <View style={styles2.container}>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <ListItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </SafeAreaView>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '80%',
    maxHeight: '60%',
    minHeight: '10%',
    marginTop: 170,
    marginLeft: 45,
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