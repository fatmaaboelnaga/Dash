
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

const restaurants = [
  {
    id: "1",
    name: "Margherita",
    category: "Italian • Pizza",
    rating: "4.8",
    time: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
  },
  {
    id: "2",
    name: "Tonkotsu",
    category: "Japanese • Ramen",
    rating: "4.9",
    time: "25-35 min",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
  },
  {
    id: "3",
    name: "Double Smash",
    category: "American • Burgers",
    rating: "4.7",
    time: "15-25 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
  },
  
];

const PopularRestaurants = () => {
  return (
    <View style={styles.container}>

      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Popular near you
        </Text>

        {/* <TouchableOpacity>
          <Text style={styles.seeAll}>
            See all
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Restaurants List */}
      <FlatList
        data={restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.info}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.category}>
                {item.category}
              </Text>

              <View style={styles.details}>

                <View style={styles.detailItem}>
                  <Ionicons
                    name="star"
                    size={s(12)}
                    color="#F5B82E"
                  />
                  <Text style={styles.detailText}>
                    {item.rating}
                  </Text>
                </View>

                <View style={styles.detailItem}>
                  <Ionicons
                    name="time-outline"
                    size={s(12)}
                    color="#68736D"
                  />
                  <Text style={styles.detailText}>
                    {item.time}
                  </Text>
                </View>

              </View>
            </View>

          </TouchableOpacity>
        )}
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

  seeAll: {
    fontSize: s(12),
    fontWeight: "700",
    color: "#205C3F",
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
