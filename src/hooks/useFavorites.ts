import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
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

  // Save favorites
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

  // Add or remove favorite
  const toggleFavorite = (restaurantId: string) => {
    setFavoriteRestaurantIds((previous) =>
      previous.includes(restaurantId)
        ? previous.filter((id) => id !== restaurantId)
        : [...previous, restaurantId]
    );
  };

  return {
    favoriteRestaurantIds,
    favoritesLoaded,
    toggleFavorite,
  };
}