
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { s } from "react-native-size-matters";

export type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutProps = {
  restaurant: {
    name: string;
    image?: string;
    deliveryTime?: string;
    deliveryFee: number;
  };
  items: CheckoutItem[];
  onBack: () => void;
  onAddMoreItems: () => void;
  onIncreaseItem: (id: string) => void;
  onDecreaseItem: (id: string) => void;
  onPlaceOrder: () => void;
};

const Checkout = ({
  restaurant,
  items,
  onBack,
  onAddMoreItems,
  onIncreaseItem,
  onDecreaseItem,
  onPlaceOrder,
}: CheckoutProps) => {
  const [tip, setTip] = useState(3);
  const [payment, setPayment] = useState("Visa");
  const [address, setAddress] = useState("221 Harbor St, Apt 4B");
  const [instructions, setInstructions] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const serviceFee = 1;
  const total = subtotal + restaurant.deliveryFee + serviceFee + tip;

  const paymentMethods = [
    {
      id: "Visa",
      title: "Visa",
      subtitle: "•••• 4242",
      icon: "card-outline" as const,
    },
    {
      id: "Apple Pay",
      title: "Apple Pay",
      subtitle: "Default",
      icon: "logo-apple" as const,
    },
    {
      id: "Cash",
      title: "Cash",
      subtitle: "Pay on delivery",
      icon: "cash-outline" as const,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={s(21)} color="#17231D" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Restaurant */}
        <View style={styles.restaurantRow}>
          {restaurant.image ? (
            <Image
              source={{ uri: restaurant.image }}
              style={styles.restaurantImage}
            />
          ) : (
            <View style={styles.restaurantPlaceholder}>
              <Ionicons name="restaurant" size={s(22)} color="#17231D" />
            </View>
          )}

          <View>
            <Text style={styles.restaurantName}>
              {restaurant.name}
            </Text>
            <Text style={styles.deliveryTime}>
              Arrives in {restaurant.deliveryTime || "15–20 min"}
            </Text>
          </View>
        </View>

        {/* Cart Items */}
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ${item.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => onDecreaseItem(item.id)}
              >
                <Ionicons
                  name={item.quantity === 1 ? "trash-outline" : "remove"}
                  size={s(15)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => onIncreaseItem(item.id)}
              >
                <Ionicons name="add" size={s(17)} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add more items */}
        <TouchableOpacity
          onPress={onAddMoreItems}
          style={styles.addMoreButton}
        >
          <Text style={styles.addMoreText}>+ Add more items</Text>
        </TouchableOpacity>

        {/* Delivery */}
        <Text style={styles.sectionTitle}>Delivery</Text>

        <View style={styles.addressBox}>
          <Ionicons
            name="location-outline"
            size={s(18)}
            color="#17633F"
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.addressInput}
            placeholder="Enter your address"
            placeholderTextColor="#8A908B"
          />
        </View>

        <Text style={styles.inputLabel}>
          Instructions for courier
        </Text>

        <TextInput
          value={instructions}
          onChangeText={setInstructions}
          style={styles.instructionsInput}
          placeholder="Gate code, leave at door..."
          placeholderTextColor="#8A908B"
          multiline
          textAlignVertical="top"
        />

        {/* Tip */}
        <Text style={styles.sectionTitle}>Tip your courier</Text>

        <View style={styles.tipRow}>
          {[0, 2, 3, 5].map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => setTip(amount)}
              style={[
                styles.tipButton,
                tip === amount && styles.selectedTip,
              ]}
            >
              <Text
                style={[
                  styles.tipText,
                  tip === amount && styles.selectedTipText,
                ]}
              >
                {amount === 0 ? "None" : `$${amount.toFixed(2)}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment */}
        <Text style={styles.sectionTitle}>Payment</Text>

        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setPayment(method.id)}
            style={[
              styles.paymentCard,
              payment === method.id && styles.selectedPayment,
            ]}
          >
            <Ionicons
              name={method.icon}
              size={s(19)}
              color="#17231D"
            />

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>
                {method.title}
              </Text>
              <Text style={styles.paymentSubtitle}>
                {method.subtitle}
              </Text>
            </View>

            <Ionicons
              name={
                payment === method.id
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={s(18)}
              color={payment === method.id ? "#17633F" : "#929A95"}
            />
          </TouchableOpacity>
        ))}

        {/* Sign in */}
        <TouchableOpacity style={styles.signInBanner}>
          <Ionicons name="person-outline" size={s(18)} color="#17231D" />

          <Text style={styles.signInText}>
            Sign in to save this order and your addresses
          </Text>

          <Text style={styles.signInLink}>Sign in</Text>
        </TouchableOpacity>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery fee</Text>
          <Text style={styles.summaryValue}>
            ${restaurant.deliveryFee.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service fee</Text>
          <Text style={styles.summaryValue}>
            ${serviceFee.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Courier tip</Text>
          <Text style={styles.summaryValue}>
            ${tip.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      {/* Place Order */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={onPlaceOrder}
          disabled={items.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderText}>Place order</Text>
          <Text style={styles.placeOrderText}>
            ${total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F1",
  },

  header: {
    height: s(55),
    flexDirection: "row",
    alignItems: "center",
     paddingHorizontal: s(20),
    paddingTop: s(60),
    paddingBottom: s(30),
    borderBottomWidth: 1,
    borderBottomColor: "#E3E1D8",
    gap: s(10),
  },

  backButton: {
    width: s(30),
    height: s(35),
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: s(15),
    fontWeight: "800",
    color: "#17231D",
  },

  scrollContent: {
    paddingHorizontal: s(19),
    paddingTop: s(16),
    paddingBottom: s(20),
  },

  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
    marginBottom: s(12),
  },

  restaurantImage: {
    width: s(38),
    height: s(38),
    borderRadius: s(22),
  },

  restaurantPlaceholder: {
    width: s(38),
    height: s(38),
    borderRadius: s(22),
    backgroundColor: "#E9E8DF",
    alignItems: "center",
    justifyContent: "center",
  },

  restaurantName: {
    fontSize: s(13),
    fontWeight: "800",
    color: "#17231D",
  },

  deliveryTime: {
    fontSize: s(10),
    color: "#68736D",
    marginTop: s(3),
  },

  cartItem: {
    minHeight: s(55),
    backgroundColor: "#FFFFFF",
    borderRadius: s(19),
    borderWidth: 1,
    borderColor: "#E3E1D8",
    paddingHorizontal: s(12),
    paddingVertical: s(9),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: s(7),
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: s(12),
    color: "#17231D",
  },

  itemPrice: {
    fontSize: s(10),
    color: "#68736D",
    marginTop: s(3),
  },

  quantityControl: {
    minWidth: s(70),
    height: s(29),
    borderRadius: s(20),
    backgroundColor: "#12221B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: s(7),
  },

  quantityText: {
    color: "#FFFFFF",
    fontSize: s(11),
    fontWeight: "800",
  },

  addMoreButton: {
    marginTop: s(3),
    marginBottom: s(22),
  },

  addMoreText: {
    fontSize: s(11),
    color: "#17633F",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: s(14),
    fontWeight: "800",
    color: "#17231D",
    marginBottom: s(12),
    marginTop: s(1),
  },

  addressBox: {
    height: s(42),
    borderRadius: s(25),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E1D8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(12),
    marginBottom: s(10),
    gap: s(8),
  },

  addressInput: {
    flex: 1,
    fontSize: s(11),
    color: "#17231D",
  },

  inputLabel: {
    fontSize: s(11),
    color: "#17231D",
    marginBottom: s(7),
  },

  instructionsInput: {
    minHeight: s(55),
    backgroundColor: "#FFFFFF",
    borderRadius: s(18),
    borderWidth: 1,
    borderColor: "#E3E1D8",
    padding: s(11),
    fontSize: s(11),
    color: "#17231D",
    marginBottom: s(20),
  },

  tipRow: {
    flexDirection: "row",
    gap: s(6),
    marginBottom: s(20),
  },

  tipButton: {
    flex: 1,
    height: s(37),
    borderRadius: s(17),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E1D8",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedTip: {
    backgroundColor: "#12221B",
    borderColor: "#12221B",
  },

  tipText: {
    fontSize: s(11),
    fontWeight: "700",
    color: "#17231D",
  },

  selectedTipText: {
    color: "#FFFFFF",
  },

  paymentCard: {
    minHeight: s(53),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E1D8",
    borderRadius: s(19),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(12),
    marginBottom: s(6),
    gap: s(10),
  },

  selectedPayment: {
    borderColor: "#17231D",
  },

  paymentInfo: {
    flex: 1,
  },

  paymentTitle: {
    fontSize: s(12),
    color: "#17231D",
  },

  paymentSubtitle: {
    fontSize: s(10),
    color: "#68736D",
    marginTop: s(2),
  },

  signInBanner: {
    minHeight: s(52),
    backgroundColor: "#F9E9B8",
    borderRadius: s(18),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(12),
    gap: s(8),
    marginTop: s(18),
    marginBottom: s(20),
  },

  signInText: {
    flex: 1,
    fontSize: s(10),
    color: "#17231D",
  },

  signInLink: {
    fontSize: s(10),
    fontWeight: "800",
    color: "#17633F",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: s(9),
  },

  summaryLabel: {
    fontSize: s(11),
    color: "#68736D",
  },

  summaryValue: {
    fontSize: s(11),
    color: "#17231D",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#E3E1D8",
    marginVertical: s(7),
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: s(5),
  },

  totalLabel: {
    fontSize: s(13),
    fontWeight: "800",
    color: "#17231D",
  },

  totalValue: {
    fontSize: s(13),
    fontWeight: "900",
    color: "#17231D",
  },

  footer: {
    paddingHorizontal: s(16),
    paddingTop: s(9),
    paddingBottom: s(12),
    borderTopWidth: 1,
    borderTopColor: "#E3E1D8",
    backgroundColor: "#F7F7F1",
  },

  placeOrderButton: {
    height: s(45),
    borderRadius: s(25),
    backgroundColor: "#FFC21C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: s(19),
    elevation: 3,
  },

  placeOrderText: {
    fontSize: s(12),
    fontWeight: "900",
    color: "#17231D",
  },
});
