
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { s } from 'react-native-size-matters'

const SavedAddresses = () => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <View style={[styles.cont, expanded ? styles.exp : styles.collapsed]}>

      <View style={styles.header}>
        <Text style={{fontWeight:"bold", fontSize:s(15)}}>
          Saved addresses
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={{fontWeight:"bold", color:"#075B36"}}>
            {expanded ? "Cancel" : "+ Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {!expanded && (
        <Text style={{color:"gray", marginTop:s(10)}}>
          Save an address to fill in checkout automatically.
        </Text>
      )}

      {expanded && (
        <>
          <View style={styles.divider} />

          <Text style={styles.label}>Label</Text>
          <TextInput
            placeholder="Home, Work..."
            style={styles.input}
          />

          <Text style={styles.label}>Street address</Text>
          <TextInput
            placeholder="221 Harbor St"
            style={styles.input}
          />

          <Text style={styles.label}>
            Apt, floor, buzzer (optional)
          </Text>
          <TextInput
            placeholder="Apt 4B"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setChecked(!checked)}
          >
            <View style={[styles.checkbox, checked && styles.checked]}>
              {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>

            <Text style={styles.checkText}>
              Use as default delivery address
            </Text>
          </TouchableOpacity>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setExpanded(false)}
            >
              <Text style={styles.saveText}>Save address</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setExpanded(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

    </View>
  )
}

export default SavedAddresses

const styles = StyleSheet.create({
  cont: {
    width:"100%",
    backgroundColor:"white",
    borderRadius:s(20),
    padding:s(15),
    marginBottom:s(20),
    borderWidth:s(1),
    borderColor:"#f2ecf8",
  },

  collapsed: {
    height:s(80),
  },

  exp: {
  },

  header: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },

  divider: {
    width:"100%",
    height:1,
    backgroundColor:"#e5e1da",
    marginVertical:s(12),
  },

  label: {
    fontSize:s(12),
    marginBottom:s(7),
    marginTop:s(5),
    color:"#222",
    fontWeight:600,
  },

  input: {
    width:"100%",
    height:s(43),
    backgroundColor:"#f4f1f7",
    borderRadius:s(15),
    borderWidth:1,
    borderColor:"#e8e5df",
    paddingHorizontal:s(12),
    fontSize:s(14),
    marginBottom:s(8),
  },

  checkboxContainer: {
    flexDirection:"row",
    alignItems:"center",
    marginTop:s(3),
    marginBottom:s(12),
  },

  checkbox: {
    width:s(16),
    height:s(16),
    borderWidth:1,
    borderColor:"#075B36",
    borderRadius:s(3),
    marginRight:s(8),
    alignItems:"center",
    justifyContent:"center",
  },

  checked: {
    backgroundColor:"#075B36",
  },

  checkmark: {
    color:"white",
    fontSize:s(12),
    fontWeight:"bold",
  },

  checkText: {
    fontSize:s(12),
    color:"#222",
  },

  buttons: {
    flexDirection:"row",
    alignItems:"center",
    gap:s(15),
  },

  saveButton: {
    backgroundColor:"#10251e",
    paddingVertical:s(11),
    paddingHorizontal:s(18),
    borderRadius:s(25),
  },

  saveText: {
    color:"white",
    fontWeight:"bold",
    fontSize:s(12),
  },

  cancelText: {
    color:"#555",
    fontSize:s(12),
  },
})
