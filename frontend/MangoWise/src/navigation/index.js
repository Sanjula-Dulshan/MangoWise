import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import CheckFertilizerScreen from "../screens/CheckFertilizerScreen/CheckFertilizerScreen";
import FertilizerSuggestionScreen from "../screens/FertilizerSuggestionScreen/FertilizerSuggestionScreen";
import MonitorFertilizationScreen from "../screens/MoniterFertilizationScreen/MonitorFertilizationScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>

    <Stack.Navigator >
      <Stack.Screen
          name="CheckFertilizerScreen"
          component={CheckFertilizerScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="FertilizerSuggestionScreen"
          component={FertilizerSuggestionScreen}
          options={{ headerShown: false }}
        />
       <Stack.Screen
          name="MoniterFertilizationScreen"
          component={MonitorFertilizationScreen}
          options={{ headerShown: false }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
