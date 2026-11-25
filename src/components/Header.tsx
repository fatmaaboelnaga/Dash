
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.container}>

      {/* Delivery Address */}
      <TouchableOpacity style={styles.addressContainer}>

        <View style={styles.locationIcon}>
          <Ionicons
            name="location-outline"
            size={s(20)}
            color="white"
          />
        </View>

        <View>
          <Text style={styles.deliverText}>
            Deliver to
          </Text>

          <View style={styles.addressRow}>
            <Text style={styles.addressText}>
              221 Harbor St
            </Text>

            <Ionicons
              name="chevron-down"
              size={s(14)}
              color="#17231D"
            />
          </View>
        </View>

      </TouchableOpacity>

      {/* Logo */}
      <Text style={styles.logo}>
        dash<Text style={styles.dot}>.</Text>
      </Text>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: s(18),
  },

  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: s(35),
    height: s(35),
    borderRadius: s(20),
    backgroundColor: "#205C3F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: s(8),
  },

  deliverText: {
    fontSize: s(10),
    color: "#7A827D",
    marginBottom: s(2),
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(3),
  },

  addressText: {
    fontSize: s(12),
    fontWeight: "700",
    color: "#17231D",
  },

  logo: {
    fontSize: s(19),
    fontWeight: "900",
    color: "#17231D",
  },

  dot: {
    color: "#205C3F",
  },
});
