import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import DiagnoseHomeScreen from "../screens/Diagnose/Home";
import DetectedAllDiseaseScreen from "../screens/Diagnose/Results/DetectedAllDisease";
import DiagnoseScanScreen from "../screens/Diagnose/Scan";

const Stack = createNativeStackNavigator();

export default function DiagnoseAllScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiagnoseHomeScreen"
        component={DiagnoseHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DiagnoseScanScreen"
        component={DiagnoseScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetectedAllDiseaseScreen"
        component={DetectedAllDiseaseScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
