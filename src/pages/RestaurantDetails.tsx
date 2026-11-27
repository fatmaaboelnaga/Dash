
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  LayoutChangeEvent,
} from "react-native";

import { s } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

import restaurants from "../data/restaurants.json";

type Restaurant = (typeof restaurants)[number];

type RestaurantDetailsProps = {
  restaurant: Restaurant;
  onBack: () => void;
  itemCounts: Record<string, number>;
  onAddItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onViewCart: () => void;
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
};

const RestaurantDetails = ({
  restaurant,
  onBack,
  itemCounts,
  onAddItem,
  onRemoveItem,
  onViewCart,
  favoriteRestaurantIds = [],
  onToggleFavorite,
}: RestaurantDetailsProps) => {
  const [selectedSection, setSelectedSection] = useState(
    restaurant.menuSections[0]?.id || ""
  );

  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [fallbackHeroFailed, setFallbackHeroFailed] = useState(false);

  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const sectionPositions = useRef<Record<string, number>>({});

 const isFavorite = favoriteRestaurantIds.includes(restaurant.id);

  const fallbackHeroImage = restaurant.menuSections
    .flatMap((section) => section.items)
    .find((item) => item.image)?.image;

  const heroSource = !heroImageFailed
    ? restaurant.image
    : !fallbackHeroFailed
      ? fallbackHeroImage
      : undefined;

  const handleSectionLayout = (
    sectionId: string,
    event: LayoutChangeEvent
  ) => {
    sectionPositions.current[sectionId] =
      event.nativeEvent.layout.y;
  };

  const scrollToSection = (sectionId: string) => {
    setSelectedSection(sectionId);

    const position = sectionPositions.current[sectionId];

    if (position !== undefined) {
      scrollRef.current?.scrollTo({
        y: Math.max(0, s(236) + position - s(15)),
        animated: true,
      });
    }
  };

  const cartCount = Object.values(itemCounts).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = restaurant.menuSections.reduce(
    (total, section) =>
      total +
      section.items.reduce(
        (sum, item) =>
          sum + item.price * (itemCounts[item.id] || 0),
        0
      ),
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never"
      >
        {/* Hero Image */}
        <View style={styles.heroImage}>
          {heroSource ? (
            <ImageBackground
              source={{ uri: heroSource }}
              style={StyleSheet.absoluteFill}
              imageStyle={styles.heroImageImage}
              onError={() => {
                if (!heroImageFailed) {
                  setHeroImageFailed(true);
                } else {
                  setFallbackHeroFailed(true);
                }
              }}
            />
          ) : (
            <View style={styles.heroFallback}>
              <Ionicons
                name="restaurant-outline"
                size={s(45)}
                color="#68736D"
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={s(22)}
              color="#17231D"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite(restaurant.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={s(23)}
              color={isFavorite ? "#E94B4B" : "#17231D"}
            />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.category}>
            {restaurant.cuisine} · {restaurant.category}
          </Text>

          <Text style={styles.restaurantName}>
            {restaurant.name}
          </Text>

          {/* Restaurant Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View style={styles.statTop}>
                <Ionicons
                  name="star"
                  size={s(14)}
                  color="#FFB900"
                />
                <Text style={styles.statValue}>
                  {restaurant.rating}
                </Text>
              </View>

              <Text style={styles.statSubText}>
                {restaurant.reviewsCount >= 1000
                  ? `${(restaurant.reviewsCount / 1000).toFixed(1)}k`
                  : restaurant.reviewsCount}{" "}
                reviews
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.statTop}>
                <Ionicons
                  name="time-outline"
                  size={s(14)}
                  color="#17231D"
                />
                <Text style={styles.statValue}>
                  {restaurant.deliveryTime.split(" ")[0]}
                </Text>
              </View>

              <Text style={styles.statSubText}>minutes</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.statTop}>
                <Ionicons
                  name="location-outline"
                  size={s(14)}
                  color="#17231D"
                />
                <Text style={styles.statValue}>
                  {restaurant.distance} km
                </Text>
              </View>

              <Text style={styles.statSubText}>away</Text>
            </View>
          </View>

          {/* Delivery Offer */}
          <View style={styles.deliveryBanner}>
            <Ionicons
              name="bicycle-outline"
              size={s(15)}
              color="#17231D"
            />

            <Text style={styles.deliveryText}>
              ${restaurant.deliveryFee.toFixed(2)} delivery
              {restaurant.offer?.discount
                ? ` · ${restaurant.offer.discount} off ${restaurant.offer.condition}`
                : ""}
            </Text>
          </View>

          {/* Menu Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContainer}
          >
            {restaurant.menuSections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.categoryChip,
                  selectedSection === section.id &&
                    styles.selectedCategoryChip,
                ]}
                onPress={() => scrollToSection(section.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedSection === section.id &&
                      styles.selectedCategoryChipText,
                  ]}
                >
                  {section.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Menu Sections */}
          <View style={styles.menuContainer}>
            {restaurant.menuSections.map((section) => (
              <View
                key={section.id}
                style={styles.menuSection}
                onLayout={(event) =>
                  handleSectionLayout(section.id, event)
                }
              >
                <Text style={styles.sectionTitle}>
                  {section.name}
                </Text>

                {section.items.map((item) => {
                  const quantity = itemCounts[item.id] || 0;

                  return (
                    <View
                      key={item.id}
                      style={styles.menuItem}
                    >
                      <View style={styles.itemInfo}>
                        <View style={styles.itemNameRow}>
                          <Text style={styles.itemName}>
                            {item.name}
                          </Text>

                          {item.badge ? (
                            <View style={styles.popularBadge}>
                              <Text style={styles.popularBadgeText}>
                                {item.badge}
                              </Text>
                            </View>
                          ) : null}
                        </View>

                        <Text style={styles.itemDescription}>
                          {item.description}
                        </Text>

                        <Text style={styles.itemPrice}>
                          ${item.price.toFixed(2)}
                        </Text>
                      </View>

                      {/* Quantity Control */}
                      <View style={styles.itemRight}>
                        {quantity === 0 ? (
                          <TouchableOpacity
                            style={styles.quantityControl}
                            onPress={() => onAddItem(item.id)}
                            activeOpacity={0.8}
                          >
                            <Ionicons
                              name="add"
                              size={s(19)}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.quantityControl}>
                            <TouchableOpacity
                              onPress={() => onRemoveItem(item.id)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="trash-outline"
                                size={s(13)}
                                color="#FFFFFF"
                              />
                            </TouchableOpacity>

                            <Text style={styles.quantityControlText}>
                              {quantity}
                            </Text>

                            <TouchableOpacity
                              onPress={() => onAddItem(item.id)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="add"
                                size={s(17)}
                                color="#FFFFFF"
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Cart Bar */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={onViewCart}
          activeOpacity={0.85}
        >
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>
              {cartCount}
            </Text>
          </View>

          <Ionicons
            name="bag-handle-outline"
            size={s(16)}
            color="#FFFFFF"
          />

          <Text style={styles.cartText}>View cart</Text>

          <View style={{ flex: 1 }} />

          <Text style={styles.cartTotal}>
            ${cartTotal.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F1",
  },

  scrollContent: {
    paddingTop: 0,
    paddingBottom: s(100),
  },

  heroImage: {
    width: "100%",
    height: s(280),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: s(45),
    paddingHorizontal: s(24),
    overflow: "hidden",
  },

  heroImageImage: {
    resizeMode: "cover",
  },

  heroFallback: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#E9E8DF",
    alignItems: "center",
    justifyContent: "center",
  },

  iconButton: {
    width: s(38),
    height: s(38),
    borderRadius: s(22),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  favoriteButton: {
    width: s(38),
    height: s(38),
    borderRadius: s(22),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    backgroundColor: "#F7F7F1",
    marginTop: -s(25),
    borderTopLeftRadius: s(28),
    borderTopRightRadius: s(28),
    paddingTop: s(20),
    paddingHorizontal: s(20),
    paddingBottom: s(35),
  },

  category: {
    fontSize: s(11),
    color: "#68736D",
    marginBottom: s(5),
  },

  restaurantName: {
    fontSize: s(23),
    fontWeight: "900",
    color: "#17231D",
    marginBottom: s(16),
  },

  statsCard: {
    height: s(54),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E1D8",
    borderRadius: s(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: s(13),
  },

  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: s(3),
  },

  statTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
  },

  statValue: {
    fontSize: s(11),
    fontWeight: "800",
    color: "#17231D",
  },

  statSubText: {
    fontSize: s(9),
    color: "#68736D",
  },

  statDivider: {
    width: 1,
    height: s(30),
    backgroundColor: "#E3E1D8",
  },

  deliveryBanner: {
    height: s(35),
    backgroundColor: "#F9E9B8",
    borderRadius: s(20),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(12),
    gap: s(7),
  },

  deliveryText: {
    flex: 1,
    fontSize: s(10),
    color: "#17231D",
    fontWeight: "500",
  },

  categoriesScroll: {
    marginHorizontal: -s(20),
  },

  categoriesContainer: {
    paddingHorizontal: s(20),
    paddingTop: s(25),
    paddingBottom: s(12),
    gap: s(8),
  },

  categoryChip: {
    paddingHorizontal: s(13),
    paddingVertical: s(7),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: "#E0DED5",
    backgroundColor: "#FFFFFF",
  },

  selectedCategoryChip: {
    backgroundColor: "#17231D",
    borderColor: "#17231D",
  },

  categoryChipText: {
    fontSize: s(10),
    color: "#17231D",
  },

  selectedCategoryChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  menuContainer: {
    marginHorizontal: -s(20),
    borderTopWidth: 1,
    borderColor: "#E0DED5",
    paddingHorizontal: s(20),
    paddingTop: s(20),
  },

  menuSection: {
    marginBottom: s(22),
  },

  sectionTitle: {
    fontSize: s(15),
    fontWeight: "800",
    color: "#17231D",
    marginBottom: s(14),
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingVertical: s(13),
    borderBottomWidth: 1,
    borderBottomColor: "#E0DED5",
    minHeight: s(90),
  },

  itemInfo: {
    flex: 1,
    paddingRight: s(10),
  },

  itemNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: s(7),
  },

  itemName: {
    fontSize: s(12),
    fontWeight: "700",
    color: "#17231D",
  },

  popularBadge: {
    backgroundColor: "#FFC928",
    borderRadius: s(10),
    paddingHorizontal: s(7),
    paddingVertical: s(3),
  },

  popularBadgeText: {
    fontSize: s(8),
    fontWeight: "800",
    color: "#17231D",
  },

  itemDescription: {
    fontSize: s(10),
    color: "#68736D",
    lineHeight: s(17),
    marginTop: s(6),
  },

  itemPrice: {
    fontSize: s(12),
    fontWeight: "800",
    color: "#17231D",
    marginTop: s(7),
  },

  itemRight: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: s(2),
  },

  quantityControl: {
    minWidth: s(77),
    height: s(30),
    paddingHorizontal: s(10),
    borderRadius: s(20),
    backgroundColor: "#12221B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: s(10),
    elevation: 3,
  },

  quantityControlText: {
    color: "#FFFFFF",
    fontSize: s(11),
    fontWeight: "800",
  },

  cartBar: {
    position: "absolute",
    bottom: s(12),
    left: s(18),
    right: s(18),
    height: s(54),
    borderRadius: s(30),
    backgroundColor: "#12221B",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(11),
    gap: s(9),
    elevation: 6,
  },

  cartCount: {
    width: s(35),
    height: s(35),
    borderRadius: s(20),
    backgroundColor: "#FFC21C",
    alignItems: "center",
    justifyContent: "center",
  },

  cartCountText: {
    color: "#17231D",
    fontSize: s(13),
    fontWeight: "900",
  },

  cartText: {
    color: "#FFFFFF",
    fontSize: s(12),
    fontWeight: "700",
  },

  cartTotal: {
    color: "#FFFFFF",
    fontSize: s(13),
    fontWeight: "900",
  },
});
