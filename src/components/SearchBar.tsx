
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

import { s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={s(19)}
        color="#68736D"
      />

     <TextInput
  style={styles.input}
  placeholder="Search restaurants or dishes"
  placeholderTextColor="#68736D"
  value={value}
  onChangeText={onChangeText}
/>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: s(43),
    backgroundColor: "#FFFFFF",
    borderRadius: s(25),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(14),
    borderWidth: s(1),
    borderColor: "#E3E1DA",
    elevation: 2,
    marginBottom: s(22),
  },

  input: {
    flex: 1,
    marginLeft: s(10),
    fontSize: s(12),
    color: "#17231D",
  },
});
