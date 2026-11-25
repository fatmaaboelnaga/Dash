import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const info = {Orderes:0, Spent:0, Favorites:0}

const UserDashboard = () => {
  return (
    <View style={styles.cont}>
        <View style={styles.info}>
            <Text style={styles.value}>{info.Orderes}</Text>
            <Text style={styles.keys}>Orderes</Text>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.info}>
            <Text style={styles.value}>${info.Spent}</Text>
            <Text style={styles.keys}>Spent</Text>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.info}>
            <Text style={styles.value}>{info.Favorites}</Text>
            <Text style={styles.keys}>Favorites</Text>
        </View>
        
    </View>
  )
}

export default UserDashboard

const styles = StyleSheet.create({
    cont:{
        width:'100%',
        height:vs(50),
        backgroundColor: 'rgba(43, 146, 101, 0.3)',
        borderRadius:s(20),
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    info:{
        alignItems:"center",
    },
    keys:{
        color:'rgba(255,255,255,0.5)',
    },
    value:{
        color:"white",
        fontSize:s(20),
        fontWeight:"bold"
    },

    divider:{
        width:1,
        height:"60%",
        backgroundColor:"rgba(255,255,255,0.2)",
    },
})