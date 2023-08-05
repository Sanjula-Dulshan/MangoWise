import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import sensorimage from "../../../../assets/NPKSensor.png";
import vector from "../../../../assets/Vector.png";
import monitor from "../../../../assets/monitor_nutrients.jpg";
import report from "../../../../assets/report.png";
import Header from "../../../components/Header";

import {
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
} from "react-native-permissions";

const hasPermission = async () => {
  if (Platform.OS === "android" && Platform.Version >= 23) {
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
  if (Platform.OS === "android" && Platform.Version >= 23) {
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
  if (Platform.OS === "android" && Platform.Version >= 23) {
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
  await requestMultiple([
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ]);

  if (Platform.OS === "android" && Platform.Version >= 23) {
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

export default function HomeScreen() {
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

  const handleTakePicture = async () => {
    navigation.navigate("DiagnoseScanScreen");
  };

  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <View style={styles.topic}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CheckFertilizerScreen")}
        >
          <View style={styles.backButton}>
            <Feather name="arrow-left" size={40} color="#000000" />
          </View>
        </TouchableOpacity>
        <Header />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontFamily: "Roboto",
          paddingTop: 2,
          textAlign: "left",
          paddingRight: 13,
          marginLeft: 20,
          fontStyle: "italic",
        }}
      >
        Empower your plants with
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Roboto",
          paddingTop: 2,
          textAlign: "left",
          paddingRight: 13,
          marginLeft: 20,
          fontStyle: "italic",
        }}
      >
        essential nutrients
      </Text>
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Image
            source={sensorimage}
            style={styles.sensorimage}
            resizeMode="contain"
          />

          <Image
            source={report}
            style={styles.reportimage}
            resizeMode="contain"
          />
          <Image
            source={monitor}
            style={styles.monitorimage}
            resizeMode="contain"
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 0 }}>
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginLeft: 10,
                marginTop: -20,
              }}
            >
              Test soil{" "}
            </Text>
          </View>
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginLeft: 5,
                marginTop: -20,
              }}
            >
              Get fertilizer{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginLeft: 5,
                marginTop: 0,
              }}
            >
              suggestions
            </Text>
          </View>
          <Image
            source={vector}
            style={styles.vectorimage}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginLeft: 5,
                marginTop: -20,
              }}
            >
              Monitor{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto",
                textAlign: "left",
                paddingRight: 13,
                marginLeft: 5,
                marginTop: 0,
              }}
            >
              nutrients level
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Roboto",
            textAlign: "left",
            paddingRight: 13,
            marginLeft: 15,
            marginTop: 0,
            fontStyle: "italic",
            color: "red",
          }}
        >
          Please note:
        </Text>
        <Text
          style={{
            fontSize: 10,
            textAlign: "left",
            paddingRight: 13,
            marginLeft: 15,
            marginTop: 3,
            fontStyle: "italic",
          }}
        >
          You need to connect your mobile phone with the sensor using Bluetooth
          connection.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        <Text style={styles.btntext}>Take a Picture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 5,
    marginTop: 30,
    width: "95%",
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f3fdee",
    borderRadius: 20,
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  topic: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#fdfafa",
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 8,
  },
  backButton: {
    width: 30,
    height: 35,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -10,
    marginLeft: 15,
    marginRight: 60,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 220,
    height: 65,
    paddingBottom: 0,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 10,
  },
  infoModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "80%",
    maxHeight: "60%",
    minHeight: "10%",
    marginTop: 170,
    marginLeft: 45,
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  okButton: {
    backgroundColor: "#fdc50b",
    padding: 10,
    width: 80,
    height: 50,
    textAlign: "center",
    color: "#144100",
    borderRadius: 25,
    marginTop: 50,
    alignSelf: "center",
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
    backgroundColor: "#ffffff",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#899186",
    shadowOffset: {
      width: 0.8,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.21,
    elevation: 2,
  },
  modalText: {
    fontSize: 14,
    fontStyle: "italic",
    padding: 5,
    color: "#000000",
    textAlign: "center",
    marginTop: 25,
    marginBottom: -20,
  },
});
