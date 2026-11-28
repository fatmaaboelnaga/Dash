import { StyleSheet } from "react-native"; import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/BottomTapsNavigator";
import Home from "./src/pages/Home";
import Search from "./src/pages/search";
import AfterLogin from "./src/pages/afterLogin";
import { View } from "react-native";
import { Background } from './node_modules/@react-navigation/elements/lib/module/Background';

export default function App() {
  return (
    // <NavigationContainer>
    //     <MyTabs />
    // </NavigationContainer>
    <AfterLogin />
  )
}

const styles = StyleSheet.create({
});