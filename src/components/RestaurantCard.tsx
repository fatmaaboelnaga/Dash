
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

type RestaurantCardProps = {
  name: string;
  category: string;
  rating: string | number;
  time: string;
  price: string;
  image: string;
  offer?: string;
  onPress?: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const RestaurantCard = ({
  name,
  category,
  rating,
  time,
  price,
  image,
  offer,
  onPress,
  isFavorite,
  onToggleFavorite,
}: RestaurantCardProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />

        {offer ? (
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>{offer}</Text>
          </View>
        ) : null}

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favorite}
          activeOpacity={0.8}
          onPress={onToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={s(19)}
            color={isFavorite ? "#E53935" : "#17231D"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.category}>{category}</Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons
              name="star"
              size={s(13)}
              color="#F5B82E"
            />
            <Text style={styles.detailText}>{rating}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons
              name="time-outline"
              size={s(13)}
              color="#68736D"
            />
            <Text style={styles.detailText}>{time}</Text>
          </View>

          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: s(17),
    overflow: "hidden",
    marginBottom: s(16),
    borderWidth: 1,
    borderColor: "#EAE9E2",
    elevation: 2,
  },

  imageContainer: {
    width: "100%",
    height: s(145),
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  offerBadge: {
    position: "absolute",
    top: s(12),
    left: s(12),
    backgroundColor: "#F5B82E",
    paddingHorizontal: s(12),
    paddingVertical: s(6),
    borderRadius: s(6),
  },

  offerText: {
    color: "#17231D",
    fontSize: s(11),
    fontWeight: "800",
  },

  favorite: {
    position: "absolute",
    top: s(12),
    right: s(12),
    width: s(33),
    height: s(33),
    borderRadius: s(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    padding: s(12),
  },

  name: {
    fontSize: s(15),
    fontWeight: "800",
    color: "#17231D",
  },

  category: {
    fontSize: s(11),
    color: "#7A827D",
    marginTop: s(4),
  },

  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: s(10),
    gap: s(13),
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
  },

  detailText: {
    fontSize: s(10),
    color: "#68736D",
  },

  price: {
    fontSize: s(10),
    color: "#205C3F",
    fontWeight: "700",
    marginLeft: "auto",
  },
});
