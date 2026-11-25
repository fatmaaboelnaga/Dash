
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { s } from "react-native-size-matters";
import RestaurantCard from "./RestaurantCard";

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

const RestaurantList = () => {
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
            time={item.time}
            price={item.price}
            image={item.image}
            offer={item.offer}
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
