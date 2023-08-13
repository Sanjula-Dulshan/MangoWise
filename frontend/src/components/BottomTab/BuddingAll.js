import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//import screens
import BuddingHomeScreen from "../../screens/Budding/BuddingHomeScreen/BuddingHomeScreen.js";
import BuddingScanScreen from "../../screens/Budding/Scan";
import BuddingResultScreen from "../../screens/Budding/Result/Result";



const Stack = createNativeStackNavigator();

export default function BuddingAllScreens() {
    return (
        <Stack.Navigator>
        <Stack.Screen
            name="BuddingHomeScreen"
            component={BuddingHomeScreen}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="DiagnoseScanScreen"
            component={BuddingScanScreen}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="BuudinResultScreen"
            component={BuddingResultScreen}
            options={{ headerShown: false }}
        />

        </Stack.Navigator>
    );
    }

