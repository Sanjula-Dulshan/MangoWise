import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import DiagnoseScanScreen from "../../screens/Diagnose/Scan";
import BottomTabs from "./BottomTabs";
import VSelectAllScreens from "./VSelectAll";
import BuddingScanScreen from "../../screens/Budding/Scan";


const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="HomeNav">
      <Stack.Screen
        name="HomeNav"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiagnoseScanScreen"
        component={DiagnoseScanScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VSelectAllScreens"
        component={VSelectAllScreens}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BuddingScanScreenNoNav"
        component={BuddingScanScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
