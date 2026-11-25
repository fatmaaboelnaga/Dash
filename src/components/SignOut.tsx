import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s } from 'react-native-size-matters'
import Entypo from '@expo/vector-icons/Entypo';

const SignOut = () => {
  return (
    <View style={styles.cont}>
        <Entypo name="log-out" size={19} color="black"  />
        <Text style={styles.text}>Sign out</Text>
    </View>
  )
}

export default SignOut

const styles = StyleSheet.create({
    cont: {
        width: "100%",
        height: s(50),
        backgroundColor: "white",
        borderRadius: s(20),
        padding: s(15),
        marginBottom: s(30),
        borderWidth: s(1),
        borderColor: "#f2ecf8",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
      },
    
      text:{
        fontWeight:600,
        fontSize:s(15),
        marginLeft:s(6),
      },
})