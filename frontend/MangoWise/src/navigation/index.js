import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRegistry } from 'react-native';

//import screens
import FertilizationHomeScreen from "../screens/FertilizationHomeScreen/FertilizationHomeScreen";
import CheckFertilizerScreen from "../screens/CheckFertilizerScreen/CheckFertilizerScreen";
import FertilizerSuggestionScreen from "../screens/FertilizerSuggestionScreen/FertilizerSuggestionScreen";
import MonitorFertilizationScreen from "../screens/MoniterFertilizationScreen/MonitorFertilizationScreen";
import PreviousRecordsScreen from "../screens/MoniterFertilizationScreen/PreviousRecordsScreen";

//budding 
import BuddingHomeScreen from "../screens/BuddingHomeScreen/BuddingHomeScreen";
import ImageCapture from "../screens/ImageCampture/Image.capture";

AppRegistry.registerComponent('FertilizationHomeScreen', () => FertilizationHomeScreen);

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="BuddingHomeScreen">


      <Stack.Screen
          name="ImageCaptureScreen"
          component={ImageCapture}
          options={{ headerShown: false }}
        />


      <Stack.Screen
          name="BuddingHomeScreen"
          component={BuddingHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FertilizationHomeScreen"
          component={FertilizationHomeScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="PreviousRecordsScreen"
          component={PreviousRecordsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
