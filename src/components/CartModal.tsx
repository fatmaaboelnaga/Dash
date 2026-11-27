
import React from "react";

import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import restaurants from "../data/restaurants.json";

type Restaurant = (typeof restaurants)[number];

type CartModalProps = {
  visible: boolean;
  cartRestaurant: Restaurant | undefined;
  selectedRestaurant: Restaurant | null;
  onStartNewCart: () => void;
  onKeepCurrentCart: () => void;
};

export default function CartModal({
  visible,
  cartRestaurant,
  selectedRestaurant,
  onStartNewCart,
  onKeepCurrentCart,
}: CartModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onKeepCurrentCart}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onKeepCurrentCart}
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
            onPress={onStartNewCart}
            activeOpacity={0.85}
          >
            <Text style={styles.newCartButtonText}>
              Start new cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keepCartButton}
            onPress={onKeepCurrentCart}
            activeOpacity={0.7}
          >
            <Text style={styles.keepCartButtonText}>
              Keep current cart
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
