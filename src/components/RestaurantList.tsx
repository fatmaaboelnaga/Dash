
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { s } from "react-native-size-matters";
import RestaurantCard from "./RestaurantCard";
import restaurants from "../data/restaurants.json";

type RestaurantListProps = {
  onSelectRestaurant: (restaurantId: string) => void;
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
};

const RestaurantList = ({
  onSelectRestaurant,
  favoriteRestaurantIds,
  onToggleFavorite,
}: RestaurantListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Restaurants</Text>

        <Text style={styles.count}>
          {restaurants.length} places
        </Text>
      </View>

      <FlatList
        data={restaurants}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            name={item.name}
            category={item.category}
            rating={item.rating}
            time={item.deliveryTime}
            price={`$${item.deliveryFee} delivery`}
            image={item.image}
            offer={item.offer?.discount || ""}
            onPress={() => onSelectRestaurant(item.id)}
            isFavorite={favoriteRestaurantIds.includes(item.id)}
            onToggleFavorite={() => onToggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: s(20),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: s(15),
  },

  title: {
    fontSize: s(18),
    fontWeight: "800",
    color: "#17231D",
  },

  count: {
    fontSize: s(11),
    color: "#7A827D",
  },
});
