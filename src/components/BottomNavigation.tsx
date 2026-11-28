
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { s } from "react-native-size-matters";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", icon: "home-outline", activeIcon: "home" },
    { name: "Search", icon: "search-outline", activeIcon: "search" },
    { name: "Cart", icon: "bag-outline", activeIcon: "bag" },
    { name: "Orders", icon: "receipt-outline", activeIcon: "receipt" },
    { name: "Account", icon: "person-outline", activeIcon: "person" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => setActiveTab(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={(isActive ? tab.activeIcon : tab.icon) as any}
              size={s(30)}
              color={isActive ? "#17231D" : "#69736D"}
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    height: s(88),
    borderTopWidth: 1,
    borderTopColor: "#DADAD5",
    paddingHorizontal: s(8),
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: s(6),
  },

  label: {
    fontSize: s(14),
    color: "#69736D",
    fontWeight: "500",
  },

  activeLabel: {
    color: "#17231D",
    fontWeight: "600",
  },
});
