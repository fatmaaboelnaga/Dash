
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import { s } from "react-native-size-matters";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PromoBanner from "../components/PromoBanner";
import PopularRestaurants from "../components/PopularRestaurants";
import RestaurantList from "../components/RestaurantList";
import BottomNavigation from "../components/BottomNavigation";

type HomeProps = {
  onSelectCategory: (category: string | null) => void;
  onSearch: (text: string) => void;
};

const Home = ({ onSelectCategory, onSearch }: HomeProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />

       <SearchBar
  value={searchText}
  onChangeText={(text) => {
    setSearchText(text);

    if (text.trim().length > 0) {
      onSearch(text);
    }
  }}
/>

        <Categories onSelectCategory={onSelectCategory} />

        <PromoBanner />
        <PopularRestaurants />
        <RestaurantList />
        <BottomNavigation />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

 scrollContent: {
  paddingHorizontal: s(20),
  paddingTop: s(60),
  paddingBottom: s(30),
},
});
