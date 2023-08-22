import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import BuddingIcon from "../../../assets/Budding.png";
import DiagnoseIcon from "../../../assets/Diagnose.png";
import HomeIcon from "../../../assets/Home.png";
import VarietyIcon from "../../../assets/Variety.png";
import FertilizerIcon from "../../../assets/fertilizerIcon.png";
import DiagnoseAllScreens from "../DiagnoseAll";
import FertilizationAll from "../FertilizationAll";
import VarietyAllScreens from "../VarietyAll";
import Budding from "./Budding";
import Home from "./Home";
import Variety from "./Variety";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { fontSize: 10 },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 1,
          borderTopColor: "gray",
          height: 75,
          paddingBottom: 17,
          paddingHorizontal: 3,
          paddingTop: 3,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "Budding") {
            iconSource = focused ? BuddingIcon : BuddingIcon;
          } else if (route.name === "Diagnose") {
            iconSource = focused ? DiagnoseIcon : DiagnoseIcon;
          } else if (route.name === "Home") {
            iconSource = focused ? HomeIcon : HomeIcon;
          } else if (route.name === "Variety") {
            iconSource = focused ? VarietyIcon : VarietyIcon;
          } else if (route.name === "Fertilization") {
            iconSource = focused ? FertilizerIcon : FertilizerIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                tintColor: color,
                width: size,
                height: size,
                marginTop: 5,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Budding" component={Budding} />
      <Tab.Screen name="Diagnose" component={DiagnoseAllScreens} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Variety" component={VarietyAllScreens} />
      <Tab.Screen name="Fertilization" component={FertilizationAll} />
    </Tab.Navigator>
  );
}
