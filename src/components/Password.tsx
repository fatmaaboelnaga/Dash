
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { s } from "react-native-size-matters";

const Password = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.cont, !expanded && styles.collapsed]}>

      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: s(15) }}>
          Password
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={{ fontWeight: "bold", color: "#075B36" }}>
            {expanded ? "" : "Change"}
          </Text>
        </TouchableOpacity>
      </View>

      {!expanded && (
        <Text style={{ color: "gray" }}>
          Changing your password signs you out on other devices.
        </Text>
      )}

      {expanded && (
        <>
          <View style={styles.divider} />

          <Text style={styles.label}>Current password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
          />

          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateText}>Update password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setExpanded(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: s(20),
    padding: s(15),
    marginBottom: s(20),
    borderWidth: s(1),
    borderColor: "#f2ecf8",
  },

  collapsed: {
    height: s(80),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: s(10),
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e1da",
    marginBottom: s(12),
  },

  label: {
    fontSize: s(12),
    marginBottom: s(7),
    marginTop: s(5),
  },

  input: {
    width: "100%",
    height: s(43),
    backgroundColor: "#f4f1f7",
    borderRadius: s(15),
    borderWidth: 1,
    borderColor: "#e8e5df",
    paddingHorizontal: s(12),
    marginBottom: s(8),
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(15),
    marginTop: s(3),
  },

  updateButton: {
    backgroundColor: "#10251e",
    paddingVertical: s(11),
    paddingHorizontal: s(18),
    borderRadius: s(25),
  },

  updateText: {
    color: "white",
    fontWeight: "bold",
    fontSize: s(12),
  },

  cancelText: {
    color: "#555",
    fontSize: s(12),
  },
});
