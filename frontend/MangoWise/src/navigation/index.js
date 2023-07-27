import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import FertilizationHomeScreen from "../screens/FertilizationHomeScreen/FertilizationHomeScreen";
import CheckFertilizerScreen from "../screens/CheckFertilizerScreen/CheckFertilizerScreen";
import FertilizerSuggestionScreen from "../screens/FertilizerSuggestionScreen/FertilizerSuggestionScreen";
import MonitorFertilizationScreen from "../screens/MoniterFertilizationScreen/MonitorFertilizationScreen";
import PreviousRecordsScreen from "../screens/MoniterFertilizationScreen/PreviousRecordsScreen";
import BottomTabs from "../components/BottomTab/BottomTabs";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;
