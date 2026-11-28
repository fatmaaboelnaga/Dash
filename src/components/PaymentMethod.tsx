
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";

const PaymentMethod = (props) => {
  return (
    <View style={styles.cont}>
      <View style={{ marginRight: s(10) }}>
        {props.icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: s(14) }}>{props.name}</Text>
        <Text style={{ fontSize: s(10), color: "gray" }}>
          {props.desc}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.checkbox}
        onPress={props.onSelect}
      >
        {props.selected && <View style={styles.innerCircle} />}
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;

const CheckBoxSize = 20;

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    height: s(50),
    backgroundColor: "#f4f1f7",
    borderRadius: s(15),
    borderWidth: s(1),
    borderColor: "#e4dfea",
    padding: s(12),
    marginBottom: s(8),
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: s(CheckBoxSize),
    height: s(CheckBoxSize),
    backgroundColor: "white",
    borderRadius: s(CheckBoxSize / 2),
    borderWidth: s(1),
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: s(10),
    height: s(10),
    backgroundColor: "black",
    borderRadius: s(5),
  },
});
