import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'

const SavedAddresses = () => {
  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Text style={{fontWeight:"bold", fontSize:s(15)}}>Saved addresses</Text>
        <TouchableOpacity>
                <Text style={{fontWeight:"bold", color:"#075B36"}}>+ Add</Text>  
        </TouchableOpacity>
      </View>
      <Text style={{color:"gray"}}>Save an address to fill in checkout automatically.</Text>
      
    </View>
  )
}

export default SavedAddresses

const styles = StyleSheet.create({
    cont:{
        width:"100%",
        height:s(80),
        backgroundColor: "white",
        borderRadius:s(20),
        padding : s(15),
        marginBottom:s(20),
        borderWidth:s(1),
        borderColor:"#f2ecf8",

    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:s(10)
    },
})