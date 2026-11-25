
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

const categories = [
  { id: "1", name: "Pizza", icon: "pizza-outline" },
  { id: "2", name: "Burgers", icon: "fast-food-outline" },
  { id: "3", name: "Ramen", icon: "restaurant-outline" },
  { id: "4", name: "Tacos", icon: "fast-food-outline" },
  { id: "5", name: "Bowls", icon: "nutrition-outline" },
];

type CategoriesProps = {
  selectedCategory?: string | null;
  onSelectCategory?: (category: string | null) => void;
  showAll?: boolean;
};

const Categories = ({
  selectedCategory,
  onSelectCategory,
  showAll = false,
}: CategoriesProps) => {
  const [internalSelected, setInternalSelected] = useState<string | null>(
    null
  );

  const activeCategory =
    selectedCategory !== undefined
      ? selectedCategory
      : internalSelected;

  const displayedCategories = showAll
    ? [{ id: "all", name: "All", icon: "apps-outline" }, ...categories]
    : categories;

  const handleCategoryPress = (category: string) => {
    const nextCategory = category === "All" ? null : category;

    if (selectedCategory === undefined) {
      setInternalSelected(nextCategory);
    }

    onSelectCategory?.(nextCategory);
  };

  return (
    <FlatList
      data={displayedCategories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const isSelected =
          item.name === "All"
            ? activeCategory === null
            : activeCategory === item.name;

        return (
          <TouchableOpacity
            style={styles.category}
            onPress={() => handleCategoryPress(item.name)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                isSelected && styles.selectedIconContainer,
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={s(25)}
                color={isSelected ? "#FFFFFF" : "#17231D"}
              />
            </View>

            <Text
              style={[
                styles.categoryName,
                isSelected && styles.selectedCategoryName,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  list: {
    gap: s(14),
    paddingBottom: s(20),
  },

  category: {
    alignItems: "center",
    width: s(56),
  },

  iconContainer: {
    width: s(56),
    height: s(56),
    backgroundColor: "#FFFFFF",
    borderRadius: s(28),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderColor: "#E5E3DC",
    elevation: 1,
  },

  selectedIconContainer: {
    backgroundColor: "#17231D",
    borderColor: "#17231D",
  },

  categoryName: {
    fontSize: s(11),
    color: "#17231D",
    marginTop: s(7),
  },

  selectedCategoryName: {
    fontWeight: "700",
    color: "#17231D",
  },
});
