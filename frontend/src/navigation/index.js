import { NavigationContainer } from "@react-navigation/native";
import React from "react";

//import screens
import StackNav from "../components/BottomTab/StackNav";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <BottomTabs /> */}
      <StackNav />
    </NavigationContainer>
  );
};

export default Navigation;
