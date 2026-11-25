
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { s } from "react-native-size-matters";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PromoBanner = () => {
  return (
    <View style={styles.container}>

      <View style={styles.textContainer}>
        <Text style={styles.label}>NEW HERE?</Text>

        <Text style={styles.title}>
          Free delivery on{"\n"}
          your first 3 orders
        </Text>

        <Text style={styles.subtitle}>
          Use code <Text style={styles.code}>DASH3</Text> at checkout.
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <MaterialCommunityIcons
          name="moped"
          size={s(65)}
          color="#174C32"
        />
      </View>

    </View>
  );
};

export default PromoBanner;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: s(130),
    backgroundColor: "#205C3F",
    borderRadius: s(25),
    paddingHorizontal: s(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: s(25),
    overflow: "hidden",
  },

  textContainer: {
    flex: 1,
  },

  label: {
    color: "#FFD22F",
    fontSize: s(10),
    fontWeight: "800",
    marginBottom: s(7),
  },

  title: {
    color: "#FFFFFF",
    fontSize: s(18),
    fontWeight: "800",
    lineHeight: s(22),
    marginBottom: s(6),
  },

  subtitle: {
    color: "#D6E5DA",
    fontSize: s(11),
  },

  code: {
    color: "#FFD22F",
    fontWeight: "900",
  },

  imageContainer: {
    width: s(85),
    height: s(85),
    borderRadius: s(45),
    backgroundColor: "#FFD22F",
    borderWidth: s(4),
    borderColor: "#C9A927",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: s(5),
  },
});
