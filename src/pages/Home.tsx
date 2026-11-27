
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


type HomeProps = {
  onSelectCategory: (category: string | null) => void;
  onSearch: (text: string) => void;
  onSelectRestaurant: (restaurantId: string) => void;

  // Favorites
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
};

const Home = ({
  onSelectCategory,
  onSearch,
  onSelectRestaurant,
  favoriteRestaurantIds,
  onToggleFavorite,
}: HomeProps) => {
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

        <PopularRestaurants
          onSelectRestaurant={onSelectRestaurant}
          favoriteRestaurantIds={favoriteRestaurantIds}
          onToggleFavorite={onToggleFavorite}
        />

        <RestaurantList
          onSelectRestaurant={onSelectRestaurant}
          favoriteRestaurantIds={favoriteRestaurantIds}
          onToggleFavorite={onToggleFavorite}
        />

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
