import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
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
import BuddingAllScreens from "./BuddingAll";
import VSelectAllScreens from "./VSelectAll";
import { auth, firestore } from "../../../firebase";

const Tab = createBottomTabNavigator();



export default function BottomTabs() {

  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState({
    isPremium: false,
  });
  const [loading, setLoading] = useState(!auth.currentUser); // Set loading to true if the user is not logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        // Fetch user data here
        fetchUserData(user.email);
      } else {
        // Handle the case when the user is not logged in
        setLoading(false);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the observer when the component unmounts
    };
  }, []);

  const fetchUserData = async (email) => {
    try {
      const usersRef = firestore.collection("users");
      const userQuery = usersRef.where("email", "==", email);

      const querySnapshot = await userQuery.get();
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserData(userData);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

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
          } else if (route.name === "Market") {
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
      <Tab.Screen name="Budding" component={BuddingAllScreens} />
      <Tab.Screen name="Diagnose" component={DiagnoseAllScreens} />
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Market" component={VarietyAllScreens} />
      <Tab.Screen name="Fertilization" component={userData.isPremium ? FertilizationAll : Home} />
      <Tab.Screen
        name="VSelectAllScreens"
        component={VSelectAllScreens}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}
