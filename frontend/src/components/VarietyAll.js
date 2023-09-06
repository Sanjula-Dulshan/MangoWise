import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import MarketHomeScreen from "../screens/Market/Home";
import VarietyHomeScreen from "../screens/Variety/Home";
import AnalysisScreen from "../screens/Market/Analysis/Analysis";
import TimeSeriesForecastScreen from "../screens/Market/Visualize/TimeSeriesForecastScreen";
import PreviousVarieties from "../screens/Variety/Previous";
import VarietyScanScreen from "../screens/Variety/Scan/ScanScreen";
import DetectedAllVarieties from "../screens/Variety/Results/DetectedAllVarieties";
import MarketAnalysisPlan from "../screens/Market/Analysis/Analysis";

const Stack = createNativeStackNavigator();

export default function VarietyAllScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VarietyHomeScreen"
        component={VarietyHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviousVarieties"
        component={PreviousVarieties}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VarietyScanScreen"
        component={VarietyScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetectedAllVarieties"
        component={DetectedAllVarieties}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AnalysisScreen"
        component={AnalysisScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MarketHomeScreen"
        component={MarketHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TimeSeriesForecastScreen"
        component={TimeSeriesForecastScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MarketAnalysisPlan"
        component={MarketAnalysisPlan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
