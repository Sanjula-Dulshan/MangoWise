import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import BuddingHomeScreen from "../../screens/Budding/BuddingHomeScreen/BuddingHomeScreen.js";
import BuddingScanScreen from "../../screens/Budding/Scan";
import BuddingResultScreen from "../../screens/Budding/Result/Result";
import VarietySelection from "../../screens/VarietySelection/FeatureSelect/VarietySelection";
import VarietyResultScreen from "../../screens/VarietySelection/Result/Result";
import PreviousBuds from "../../screens/Budding/Previous/PreviousBuds.js";

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

