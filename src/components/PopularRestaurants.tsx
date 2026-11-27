
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

import restaurants from "../data/restaurants.json";

const popularRestaurants = [...restaurants]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

type PopularRestaurantsProps = {
  onSelectRestaurant: (restaurantId: string) => void;
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
};

const PopularRestaurants = ({
  onSelectRestaurant,
  favoriteRestaurantIds,
  onToggleFavorite,
}: PopularRestaurantsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular near you</Text>
      </View>

      <FlatList
        data={popularRestaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isFavorite = favoriteRestaurantIds.includes(item.id);

          return (
            <View style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelectRestaurant(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => onToggleFavorite(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={s(20)}
                  color={isFavorite ? "#E53935" : "#68736D"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.info}
                activeOpacity={0.8}
                onPress={() => onSelectRestaurant(item.id)}
              >
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.category}>
                  {item.cuisine} • {item.category}
                </Text>

                <View style={styles.details}>
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="star"
                      size={s(12)}
                      color="#F5B82E"
                    />
                    <Text style={styles.detailText}>{item.rating}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons
                      name="time-outline"
                      size={s(12)}
                      color="#68736D"
                    />
                    <Text style={styles.detailText}>
                      {item.deliveryTime}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PopularRestaurants;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: s(25),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: s(14),
  },

  title: {
    fontSize: s(17),
    fontWeight: "800",
    color: "#17231D",
  },

  list: {
    gap: s(13),
    paddingBottom: s(5),
  },

  card: {
    width: s(190),
    backgroundColor: "#FFFFFF",
    borderRadius: s(15),
    overflow: "hidden",
    borderWidth: s(1),
    borderColor: "#EAE9E2",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: s(105),
    resizeMode: "cover",
  },

  heartButton: {
    position: "absolute",
    top: s(8),
    right: s(8),
    width: s(32),
    height: s(32),
    borderRadius: s(16),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    zIndex: 1,
  },

  info: {
    padding: s(10),
  },

  name: {
    fontSize: s(14),
    fontWeight: "800",
    color: "#17231D",
  },

  category: {
    fontSize: s(10),
    color: "#7A827D",
    marginTop: s(3),
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(12),
    marginTop: s(9),
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(3),
  },

  detailText: {
    fontSize: s(10),
    color: "#68736D",
  },
});
