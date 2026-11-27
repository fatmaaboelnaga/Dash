import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import SignIn from"./src/pages/SignIn"
import CreateAccount from './src/pages/CreateAccount';
import BeforeLogin from "./src/pages/before login";
import AfterLogin from "./src/pages/afterLogin";
import Home from "./src/pages/Home";
import Search from "./src/pages/search";
import Cart from './src/pages/cart';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/BottomTapsNavigator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<"Home" | "Search"|"signIn"|"CreateAccount">("signIn");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openSearch = (category: string | null = null) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage("Search");
  };

const handleHomeSearch = (text: string) => {
  setSelectedCategory(null);
  setSearchQuery(text);

  if (text.trim().length > 0) {
    setCurrentPage("Search");
  }
};

  return (
    // <View style={styles.container}>
    //   {currentPage === "Home" ? (
    //     <Home
    //       onSelectCategory={openSearch}
    //       onSearch={handleHomeSearch}
    //     />
    //   ) : (
    //     <Search
    //       initialCategory={selectedCategory}
    //       initialSearchText={searchQuery}
    //       onBack={() => setCurrentPage("Home")}
    //     />
    //   )}
    // </View>
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
