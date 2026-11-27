
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { s } from "react-native-size-matters";

import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants.json";

type FavoritesProps = {
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
  onSelectRestaurant: (restaurantId: string) => void;
};

const Favorites = ({
  favoriteRestaurantIds,
  onToggleFavorite,
  onSelectRestaurant,
}: FavoritesProps) => {

  const favoriteRestaurants = restaurants.filter((restaurant) =>
    favoriteRestaurantIds.includes(restaurant.id)
  );

  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>

        <Text style={styles.count}>
          {favoriteRestaurants.length} places
        </Text>
      </View>

      {favoriteRestaurants.length > 0 ? (
        favoriteRestaurants.map((item) => (
          <RestaurantCard
            key={item.id}
            name={item.name}
            category={item.category}
            rating={item.rating}
            time={item.deliveryTime}
            price={`$${item.deliveryFee} delivery`}
            image={item.image}
            offer={item.offer?.discount || ""}
            isFavorite={true}
            onToggleFavorite={() => onToggleFavorite(item.id)}
            onPress={() => onSelectRestaurant(item.id)}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>
          Tap the heart on any restaurant to keep it here.
        </Text>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: s(20),
    padding: s(15),
    marginBottom: s(20),
    borderWidth: s(1),
    borderColor: "#f2ecf8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: s(15),
  },

  title: {
    fontWeight: "bold",
    fontSize: s(15),
    color: "#17231D",
  },

  count: {
    fontSize: s(11),
    color: "gray",
  },

  emptyText: {
    color: "gray",
    fontSize: s(12),
  },
});
