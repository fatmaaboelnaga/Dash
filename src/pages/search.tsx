
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

import Categories from "../components/Categories";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/restaurants.json";

type SearchProps = {
  initialCategory?: string | null;
  initialSearchText?: string;
  onBack?: () => void;
  onSelectRestaurant: (restaurantId: string) => void;

  // Favorites
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
};

const Search = ({
  initialCategory = null,
  initialSearchText = "",
  onBack,
  onSelectRestaurant,
  favoriteRestaurantIds,
  onToggleFavorite,
}: SearchProps) => {
  const [searchText, setSearchText] = useState(initialSearchText);

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(initialCategory);

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      restaurant.name.toLowerCase().includes(search) ||
      restaurant.category.toLowerCase().includes(search) ||
      restaurant.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === null ||
      restaurant.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={s(22)}
              color="#17231D"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Search</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={s(22)}
            color="#69736D"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or dishes"
            placeholderTextColor="#9AA19C"
            value={searchText}
            onChangeText={setSearchText}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons
                name="close-circle"
                size={s(20)}
                color="#69736D"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <Categories
          showAll
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Restaurants */}
        <View style={styles.restaurantsHeader}>
          <Text style={styles.sectionTitle}>Restaurants</Text>

          <Text style={styles.resultCount}>
            {filteredRestaurants.length} places
          </Text>
        </View>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((item) => (
            <RestaurantCard
              key={item.id}
              name={item.name}
              category={item.category}
              rating={item.rating}
              time={item.deliveryTime}
              price={`$${item.deliveryFee} delivery`}
              image={item.image}
              offer={item.offer?.discount || ""}
              onPress={() => onSelectRestaurant(item.id)}

              // Favorites
              isFavorite={favoriteRestaurantIds.includes(item.id)}
              onToggleFavorite={() => onToggleFavorite(item.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={s(40)}
              color="#9AA19C"
            />

            <Text style={styles.emptyTitle}>
              No results found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for another restaurant or category.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F6",
    paddingHorizontal: s(20),
    paddingTop: s(60),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: s(20),
  },

  backButton: {
    width: s(36),
    height: s(36),
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(10),
  },

  title: {
    fontSize: s(28),
    fontWeight: "800",
    color: "#17231D",
  },

  searchContainer: {
    height: s(52),
    backgroundColor: "#FFFFFF",
    borderRadius: s(12),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(15),
    marginBottom: s(25),
    borderWidth: 1,
    borderColor: "#E8ECE9",
  },

  searchInput: {
    flex: 1,
    marginLeft: s(10),
    fontSize: s(14),
    color: "#17231D",
  },

  sectionTitle: {
    fontSize: s(19),
    fontWeight: "700",
    color: "#17231D",
    marginBottom: s(15),
  },

  restaurantsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: s(25),
  },

  resultCount: {
    fontSize: s(12),
    color: "#69736D",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: s(50),
  },

  emptyTitle: {
    fontSize: s(17),
    fontWeight: "700",
    color: "#17231D",
    marginTop: s(12),
  },

  emptyText: {
    fontSize: s(12),
    color: "#69736D",
    marginTop: s(6),
    textAlign: "center",
  },
});
