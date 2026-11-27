
import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";

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

  // =========================
  // Cart Functions
  // =========================

  // Add Item with Restaurant Validation
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

  // Start New Cart
  const handleStartNewCart = () => {
    if (!selectedRestaurant || !pendingItemId) return;

    setItemCounts({
      [pendingItemId]: 1,
    });

    setCartRestaurantId(selectedRestaurant.id);
    setPendingItemId(null);
    setShowCartModal(false);
  };

  // Keep Current Cart
  const handleKeepCurrentCart = () => {
    setPendingItemId(null);
    setShowCartModal(false);
  };

  // Remove Item
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

  // Increase Cart Item
  const increaseCartItem = (itemId: string) => {
    setItemCounts((previous) => ({
      ...previous,
      [itemId]: (previous[itemId] || 0) + 1,
    }));
  };

  // Get Cart Restaurant
  const cartRestaurant = restaurants.find(
    (restaurant) => restaurant.id === cartRestaurantId
  );

  // Prepare Cart Items
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

  // =========================
  // Back Navigation
  // =========================

  const goBackFromDetails = () => {
    setCurrentPage(previousPage);
  };

  const goBackFromSearch = () => {
    setCurrentPage("Home");
  };

  const openCheckout = () => {
    if (cartItems.length > 0) {
      setCurrentPage("Checkout");
    }
  };

  const goBackFromCheckout = () => {
    if (cartRestaurant) {
      setSelectedRestaurant(cartRestaurant);
    }

    setCurrentPage("RestaurantDetails");
  };

  const handlePlaceOrder = () => {
    // Order confirmation will be implemented later.
  };

  // Wait until saved favorites are loaded
  if (!favoritesLoaded) {
    return <View style={styles.container} />;
  }

  // =========================
  // Main UI
  // =========================

  return (
    <View style={styles.container}>

      {/* Sign In */}
      {currentPage === "SignIn" && (
        <SignIn
          onCreateAccount={() =>
            setCurrentPage("CreateAccount")
          }
          onSignIn={handleSignIn}
        />
      )}

      {/* Create Account */}
      {currentPage === "CreateAccount" && (
        <CreateAccount
          onSignIn={() => setCurrentPage("SignIn")}
          onCreateAccount={handleCreateAccount}
        />
      )}

      {/* Home */}
      {currentPage === "Home" && (
        <Home
          onSelectCategory={openSearch}
          onSearch={handleHomeSearch}
          onSelectRestaurant={openRestaurantDetails}
          favoriteRestaurantIds={favoriteRestaurantIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Search */}
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

      {/* Restaurant Details */}
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

      {/* Checkout */}
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

      {/* Change Restaurant Modal */}
      <Modal
        visible={showCartModal}
        transparent
        animationType="slide"
        onRequestClose={handleKeepCurrentCart}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={handleKeepCurrentCart}
        >
          <Pressable
            style={styles.modalContent}
            onPress={() => {}}
          >
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>
              Start a new cart?
            </Text>

            <Text style={styles.modalDescription}>
              Your cart has items from{" "}
              <Text style={styles.restaurantName}>
                {cartRestaurant?.name}
              </Text>
              . Starting a new cart will remove them and add
              this item from{" "}
              <Text style={styles.restaurantName}>
                {selectedRestaurant?.name}
              </Text>
              .
            </Text>

            <TouchableOpacity
              style={styles.newCartButton}
              onPress={handleStartNewCart}
              activeOpacity={0.85}
            >
              <Text style={styles.newCartButtonText}>
                Start new cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepCartButton}
              onPress={handleKeepCurrentCart}
              activeOpacity={0.7}
            >
              <Text style={styles.keepCartButtonText}>
                Keep current cart
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

    </View>
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
