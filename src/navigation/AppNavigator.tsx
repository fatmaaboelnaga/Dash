
import React, { useState } from "react";

import { StyleSheet, View } from "react-native";

import SignIn from "../pages/SignIn";
import CreateAccount from "../pages/CreateAccount";

import Home from "../pages/Home";
import Search from "../pages/search";
import RestaurantDetails from "../pages/RestaurantDetails";
import Checkout from "../pages/Checkout";

import restaurants from "../data/restaurants.json";

import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

import CartModal from "../components/CartModal";

type Page =
  | "SignIn"
  | "CreateAccount"
  | "Home"
  | "Search"
  | "RestaurantDetails"
  | "Checkout";

type PreviousPage = "Home" | "Search";

type Restaurant = (typeof restaurants)[number];

export default function AppNavigator() {
  const [currentPage, setCurrentPage] =
    useState<Page>("SignIn");

  const [previousPage, setPreviousPage] =
    useState<PreviousPage>("Home");

  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  // Favorites
  const {
    favoriteRestaurantIds,
    favoritesLoaded,
    toggleFavorite,
  } = useFavorites();

  // Cart
  const {
    itemCounts,
    cartRestaurantId,
    showCartModal,
    cartRestaurant,
    cartItems,
    handleAddItem,
    handleStartNewCart,
    handleKeepCurrentCart,
    removeItem,
    increaseCartItem,
  } = useCart(selectedRestaurant);

  // Authentication
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

  // Open Restaurant Details
  const openRestaurantDetails = (restaurantId: string) => {
    const restaurant = restaurants.find(
      (item) => item.id === restaurantId
    );

    if (restaurant) {
      setPreviousPage(
        currentPage === "Search" ? "Search" : "Home"
      );

      setSelectedRestaurant(restaurant);
      setCurrentPage("RestaurantDetails");
    }
  };

  // Back Navigation
  const goBackFromDetails = () => {
    setCurrentPage(previousPage);
  };

  const goBackFromSearch = () => {
    setCurrentPage("Home");
  };

  // Open Checkout
  const openCheckout = () => {
    if (cartItems.length > 0) {
      setCurrentPage("Checkout");
    }
  };

  // Back from Checkout
  const goBackFromCheckout = () => {
    if (cartRestaurant) {
      setSelectedRestaurant(cartRestaurant);
    }

    setCurrentPage("RestaurantDetails");
  };

  // Place Order
  const handlePlaceOrder = () => {
    // Order confirmation will be implemented later.
  };

  if (!favoritesLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>

      {currentPage === "SignIn" && (
        <SignIn
          onCreateAccount={() =>
            setCurrentPage("CreateAccount")
          }
          onSignIn={handleSignIn}
        />
      )}

      {currentPage === "CreateAccount" && (
        <CreateAccount
          onSignIn={() => setCurrentPage("SignIn")}
          onCreateAccount={handleCreateAccount}
        />
      )}

      {currentPage === "Home" && (
        <Home
          onSelectCategory={openSearch}
          onSearch={handleHomeSearch}
          onSelectRestaurant={openRestaurantDetails}
          favoriteRestaurantIds={favoriteRestaurantIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {currentPage === "Search" && (
        <Search
          initialCategory={selectedCategory}
          initialSearchText={searchQuery}
          onBack={goBackFromSearch}
          onSelectRestaurant={openRestaurantDetails}
          favoriteRestaurantIds={favoriteRestaurantIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {currentPage === "RestaurantDetails" &&
        selectedRestaurant && (
          <RestaurantDetails
            restaurant={selectedRestaurant}
            onBack={goBackFromDetails}
            itemCounts={
              cartRestaurantId === selectedRestaurant.id
                ? itemCounts
                : {}
            }
            onAddItem={handleAddItem}
            onRemoveItem={removeItem}
            onViewCart={openCheckout}
            favoriteRestaurantIds={favoriteRestaurantIds}
            onToggleFavorite={toggleFavorite}
          />
        )}

      {currentPage === "Checkout" && cartRestaurant && (
        <Checkout
          restaurant={cartRestaurant}
          items={cartItems}
          onBack={goBackFromCheckout}
          onAddMoreItems={goBackFromCheckout}
          onIncreaseItem={increaseCartItem}
          onDecreaseItem={removeItem}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      <CartModal
        visible={showCartModal}
        cartRestaurant={cartRestaurant}
        selectedRestaurant={selectedRestaurant}
        onStartNewCart={handleStartNewCart}
        onKeepCurrentCart={handleKeepCurrentCart}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
