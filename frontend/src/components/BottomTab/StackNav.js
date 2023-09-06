import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import DiagnoseScanScreen from "../../screens/Diagnose/Scan";
import BottomTabs from "./BottomTabs";
import ForecastScreen from "../../screens/Market/Forecast/Market";

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
        name="ForecastScreen"
        component={ForecastScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
