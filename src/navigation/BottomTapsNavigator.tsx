import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "../pages/Home";
import Search from "../pages/search";
import Cart from "../pages/cart";
import Orders from "../pages/orders";
import AfterLogin from "../pages/afterLogin";

import RestaurantDetails from "../pages/RestaurantDetails";
import Checkout from "../pages/Checkout";

import restaurants from "../data/restaurants.json";

import useFavorites from "../hooks/useFavorites";
import useCart from "../hooks/useCart";

import CartModal from "../components/CartModal";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
type TabParamList = {
  Home: undefined;
  Search: {
    initialCategory?: string | null;
    initialSearchText?: string;
  } | undefined;
  Cart: undefined;
  Orders: undefined;
  Account: undefined;
};

type RootStackParamList = {
  MainTabs: undefined;
  RestaurantDetails: undefined;
  Checkout: undefined;
};

type Restaurant = (typeof restaurants)[number];

function MainTabs({
  favoriteRestaurantIds,
  onToggleFavorite,
  onSelectRestaurant,
}: {
  favoriteRestaurantIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={27} color={color} />
          ),
        }}
      >
        {({ navigation }) => (
          <Home
            onSelectCategory={(category) =>
              navigation.navigate("Search", {
                initialCategory: category,
                initialSearchText: "",
              })
            }
            onSearch={(text) =>
              navigation.navigate("Search", {
                initialCategory: null,
                initialSearchText: text,
              })
            }
            onSelectRestaurant={onSelectRestaurant}
            favoriteRestaurantIds={favoriteRestaurantIds}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={27} color={color} />
          ),
        }}
      >
        {({ navigation, route }) => (
          <Search
            initialCategory={route.params?.initialCategory ?? null}
            initialSearchText={route.params?.initialSearchText ?? ""}
            onBack={() => navigation.navigate("Home")}
            onSelectRestaurant={onSelectRestaurant}
            favoriteRestaurantIds={favoriteRestaurantIds}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={27} color={color} />
          ),
        }}
      >
        {() => (
          <AfterLogin
            favoriteRestaurantIds={favoriteRestaurantIds}
            onToggleFavorite={onToggleFavorite}
            onSelectRestaurant={onSelectRestaurant}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function MyTabs() {
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
    setShowCartModal,
    cartRestaurant,
    cartItems,
    handleAddItem,
    handleStartNewCart,
    handleKeepCurrentCart,
    removeItem,
    increaseCartItem,
  } = useCart(selectedRestaurant);

  if (!favoritesLoaded) {
    return null;
  }

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs">
          {({ navigation }) => (
            <MainTabs
              favoriteRestaurantIds={favoriteRestaurantIds}
              onToggleFavorite={toggleFavorite}
              onSelectRestaurant={(restaurantId) => {
                const restaurant = restaurants.find(
                  (item) => item.id === restaurantId
                );

                if (restaurant) {
                  setSelectedRestaurant(restaurant);
                  navigation.navigate("RestaurantDetails");
                }
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RestaurantDetails">
          {({ navigation }) =>
            selectedRestaurant ? (
              <RestaurantDetails
                restaurant={selectedRestaurant}
                onBack={() => navigation.goBack()}
                itemCounts={
                  cartRestaurantId === selectedRestaurant.id
                    ? itemCounts
                    : {}
                }
                onAddItem={handleAddItem}
                onRemoveItem={removeItem}
                onViewCart={() => {
                  if (cartItems.length > 0) {
                    navigation.navigate("Checkout");
                  }
                }}
                favoriteRestaurantIds={favoriteRestaurantIds}
                onToggleFavorite={toggleFavorite}
              />
            ) : null
          }
        </Stack.Screen>

        <Stack.Screen name="Checkout">
          {({ navigation }) =>
            cartRestaurant ? (
              <Checkout
                restaurant={cartRestaurant}
                items={cartItems}
                onBack={() => navigation.goBack()}
                onAddMoreItems={() => navigation.goBack()}
                onIncreaseItem={increaseCartItem}
                onDecreaseItem={removeItem}
                onPlaceOrder={() => {
                  // تأكيد الطلب هنضيفه لاحقًا.
                }}
              />
            ) : null
          }
        </Stack.Screen>
      </Stack.Navigator>

      <CartModal
        visible={showCartModal}
        cartRestaurant={cartRestaurant}
        selectedRestaurant={selectedRestaurant}
        onStartNewCart={handleStartNewCart}
        onKeepCurrentCart={handleKeepCurrentCart}
      />
    </>
  );
}