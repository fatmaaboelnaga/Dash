import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'

const Favorites = () => {
  return (
    <View style={styles.cont}>
          <View style={styles.header}>
            <Text style={{fontWeight:"bold", fontSize:s(15)}}>Favorites</Text>
          </View>
          <Text style={{color:"gray"}}>Tap the heart on any restaurant to keep it here.</Text>
          
    </View>
  )
}

export default Favorites

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
            marginBottom:s(10)
        },
})