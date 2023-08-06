import { Entypo } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button({ title, onPress, icon, color, size }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo
        name={icon}
        size={size ? size : 35}
        color={color ? color : "#000000"}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    marginLeft: 10,
  },
});
