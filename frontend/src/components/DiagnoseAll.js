import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import DiagnoseHomeScreen from "../screens/Diagnose/Home";
import PreviousDiseasesScreen from "../screens/Diagnose/Previous/PreviousDiseases";
import DetectedAllDiseaseScreen from "../screens/Diagnose/Results/DetectedAllDisease";

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
        name="DetectedAllDiseaseScreen"
        component={DetectedAllDiseaseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviousDiseasesScreen"
        component={PreviousDiseasesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
