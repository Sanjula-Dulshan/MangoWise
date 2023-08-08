import { NavigationContainer } from "@react-navigation/native";
import React from "react";

//import screens
import BottomTabs from "../components/BottomTab/BottomTabs";

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;
