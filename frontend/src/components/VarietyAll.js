import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import MarketHomeScreen from "../screens/Market/Home";
import VarietyHomeScreen from "../screens/Variety/Home";
import ForecastScreen from "../screens/Market/Forecast/Market";

const Stack = createNativeStackNavigator();

export default function VarietyAllScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ForecastScreen"
        component={ForecastScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MarketHomeScreen"
        component={MarketHomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VarietyHomeScreen"
        component={VarietyHomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
