import { useState } from "react";

import restaurants from "../data/restaurants.json";

type Restaurant = (typeof restaurants)[number];

export default function useCart(
  selectedRestaurant: Restaurant | null
) {
  const [itemCounts, setItemCounts] =
    useState<Record<string, number>>({});

  const [cartRestaurantId, setCartRestaurantId] =
    useState<string | null>(null);

  const [showCartModal, setShowCartModal] = useState(false);

  const [pendingItemId, setPendingItemId] =
    useState<string | null>(null);

  // Get cart restaurant
  const cartRestaurant = restaurants.find(
    (restaurant) => restaurant.id === cartRestaurantId
  );

  // Prepare cart items
  const cartItems = cartRestaurant
    ? cartRestaurant.menuSections
        .flatMap((section) => section.items)
        .filter((item) => (itemCounts[item.id] || 0) > 0)
        .map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: itemCounts[item.id],
        }))
    : [];

  // Add item
  const handleAddItem = (itemId: string) => {
    if (!selectedRestaurant) return;

    const cartIsEmpty = Object.keys(itemCounts).length === 0;

    if (
      cartIsEmpty ||
      cartRestaurantId === selectedRestaurant.id
    ) {
      setCartRestaurantId(selectedRestaurant.id);

      setItemCounts((previous) => ({
        ...previous,
        [itemId]: (previous[itemId] || 0) + 1,
      }));

      return;
    }

    setPendingItemId(itemId);
    setShowCartModal(true);
  };

  // Start new cart
  const handleStartNewCart = () => {
    if (!selectedRestaurant || !pendingItemId) return;

    setItemCounts({
      [pendingItemId]: 1,
    });

    setCartRestaurantId(selectedRestaurant.id);
    setPendingItemId(null);
    setShowCartModal(false);
  };

  // Keep current cart
  const handleKeepCurrentCart = () => {
    setPendingItemId(null);
    setShowCartModal(false);
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setItemCounts((previous) => {
      const updated = { ...previous };

      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }

      return updated;
    });
  };

  // Increase item quantity
  const increaseCartItem = (itemId: string) => {
    setItemCounts((previous) => ({
      ...previous,
      [itemId]: (previous[itemId] || 0) + 1,
    }));
  };

  return {
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
  };
}