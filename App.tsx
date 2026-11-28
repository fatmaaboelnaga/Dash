
import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/BottomTapsNavigator";
import Home from "./src/pages/Home";
import Search from "./src/pages/search";
import AfterLogin from "./src/pages/afterLogin";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}
