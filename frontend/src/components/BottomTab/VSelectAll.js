import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs"; // Import your BottomTabs component

// Import your other screen components
import VarietySelection from "../../screens/VarietySelection/FeatureSelect/VarietySelection";
import VarietyResultScreen from "../../screens/VarietySelection/Result/Result";
import PreviousBuds from "../../screens/Budding/Previous/PreviousBuds";

const Stack = createNativeStackNavigator();

export default function VSelectAllScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VarietySelection"
        component={VarietySelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VarietyResultScreen"
        component={VarietyResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreviousBudScreen"
        component={PreviousBuds}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
    
  );
}
