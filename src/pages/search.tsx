
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

type SearchProps = {
  initialCategory?: string | null;
  initialSearchText?: string;
  onBack?: () => void;
};

// بيانات المطاعم مؤقتًا داخل الصفحة
const restaurants = [
  {
    id: "1",
    name: "The Green Kitchen",
    category: "Bowls",
    rating: "4.9",
    time: "20-30 min",
    price: "$12.50",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    offer: "20% OFF",
  },
  {
    id: "2",
    name: "Urban Burger",
    category: "Burgers",
    rating: "4.8",
    time: "15-25 min",
    price: "$10.99",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    offer: "FREE DELIVERY",
  },
  {
    id: "3",
    name: "Pizza House",
    category: "Pizza",
    rating: "4.7",
    time: "25-35 min",
    price: "$14.00",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    offer: "",
  },
  {
    id: "4",
    name: "Ramen Spot",
    category: "Ramen",
    rating: "4.8",
    time: "20-30 min",
    price: "$13.00",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    offer: "15% OFF",
  },
  {
    id: "5",
    name: "Taco Corner",
    category: "Tacos",
    rating: "4.6",
    time: "15-25 min",
    price: "$9.50",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600",
    offer: "",
  },
];

const Search = ({
  initialCategory = null,
  initialSearchText = "",
  onBack,
}: SearchProps) => {
  const [searchText, setSearchText] = useState(initialSearchText);

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(initialCategory);

  // البحث بالاسم أو نوع المطعم
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = searchText.toLowerCase().trim();

    const matchesSearch =
      restaurant.name.toLowerCase().includes(search) ||
      restaurant.category.toLowerCase().includes(search);

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
              time={item.time}
              price={item.price}
              image={item.image}
              offer={item.offer}
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
