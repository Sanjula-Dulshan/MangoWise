import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import sampleMangoLeaf from "../../../../assets/sample-mango-leaf2.jpg";
import Header from "../../../components/Common/Header";

export default function DetectedAllDisease() {
  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      <View style={styles.imageContainer}>
        <Image
          source={sampleMangoLeaf}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <Text>Anthracnose</Text>
        <Text>Sooty Mould</Text>

        <Text>Powdery Mildew</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btntext}>Get remedies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderRadius: 2,
  },
  details: {
    flex: 1,
    marginTop: 40,
    justifyContent: "center",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    height: 20,
    backgroundColor: "#EAEAEA",
    padding: 20,
  },
  button: {
    backgroundColor: "#fdc50b",
    width: 200,
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    marginBottom: -40,
    alignSelf: "center",
  },
  btntext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#144100",
    paddingTop: 10,
    marginTop: 8,
  },
});
