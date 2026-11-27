
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import SignIn from "./src/pages/SignIn";
import CreateAccount from "./src/pages/CreateAccount";

import Home from "./src/pages/Home";
import Search from "./src/pages/search";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/BottomTapsNavigator";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("SignIn");

  const [previousPage, setPreviousPage] =
    useState<PreviousPage>("Home");

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<(typeof restaurants)[number] | null>(null);

  // =========================
  // Favorites State
  // =========================

  const [favoriteRestaurantIds, setFavoriteRestaurantIds] =
    useState<string[]>([]);

  const [favoritesLoaded, setFavoritesLoaded] =
    useState(false);

  // Load saved favorites
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem(
          "favoriteRestaurants"
        );

        if (savedFavorites !== null) {
          const parsedFavorites = JSON.parse(savedFavorites);

          if (Array.isArray(parsedFavorites)) {
            setFavoriteRestaurantIds(
              parsedFavorites.filter(
                (id): id is string => typeof id === "string"
              )
            );
          }
        }
      } catch (error) {
        console.log("Error loading favorites:", error);
      } finally {
        setFavoritesLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    if (!favoritesLoaded) return;

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          "favoriteRestaurants",
          JSON.stringify(favoriteRestaurantIds)
        );
      } catch (error) {
        console.log("Error saving favorites:", error);
      }
    };

    saveFavorites();
  }, [favoriteRestaurantIds, favoritesLoaded]);

  // Toggle Favorite
  const toggleFavorite = (restaurantId: string) => {
    setFavoriteRestaurantIds((previous) =>
      previous.includes(restaurantId)
        ? previous.filter((id) => id !== restaurantId)
        : [...previous, restaurantId]
    );
  };

  // =========================
  // Authentication Navigation
  // =========================

  const handleSignIn = (email: string, password: string) => {
    setCurrentPage("Home");
  };

  const handleCreateAccount = (
    name: string,
    email: string,
    password: string
  ) => {
    setCurrentPage("Home");
  };

  // =========================
  // Cart State
  // =========================

  const [itemCounts, setItemCounts] =
    useState<Record<string, number>>({});

  const [cartRestaurantId, setCartRestaurantId] =
    useState<string | null>(null);

  // Change Restaurant Modal State
  const [showCartModal, setShowCartModal] = useState(false);

  const [pendingItemId, setPendingItemId] =
    useState<string | null>(null);

  // =========================
  // Navigation Functions
  // =========================

  // Open Search
  const openSearch = (category: string | null = null) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage("Search");
  };

  // Search from Home
  const handleHomeSearch = (text: string) => {
    setSelectedCategory(null);
    setSearchQuery(text);

    if (text.trim().length > 0) {
      setCurrentPage("Search");
    }
  };

  return (
    // <View style={styles.container}>
    //   {currentPage === "Home" ? (
    //     <Home
    //       onSelectCategory={openSearch}
    //       onSearch={handleHomeSearch}
    //     />
    //   ) : (
    //     <Search
    //       initialCategory={selectedCategory}
    //       initialSearchText={searchQuery}
    //       onBack={() => setCurrentPage("Home")}
    //     />
    //   )}
    // </View>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    minHeight: 280,
  },

  modalHandle: {
    width: 34,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#E7E5DF",
    alignSelf: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#17231D",
    marginBottom: 15,
  },

  modalDescription: {
    fontSize: 14,
    lineHeight: 23,
    color: "#68736D",
    marginBottom: 14,
  },

  restaurantName: {
    color: "#17231D",
    fontWeight: "700",
  },

  newCartButton: {
    height: 44,
    borderRadius: 30,
    backgroundColor: "#14231C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  newCartButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  keepCartButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  keepCartButtonText: {
    color: "#17231D",
    fontSize: 14,
    fontWeight: "600",
  },
});
