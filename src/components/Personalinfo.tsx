import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const Personalinfo = () => {
    const info = {name:"Alex", email:"alex@gmail.com", phone:"Not added"}
  return (
    <View style={styles.cont}>
        <View style={styles.header}>
            <Text style={{fontWeight:"bold", fontSize:s(15)}}>Personal info</Text>
            <TouchableOpacity>
                <Text style={{fontWeight:"bold", color:"#075B36"}}>Edit</Text>  
            </TouchableOpacity>
        </View>

        <View style={styles.infoCont}>
            <Text style={{color:"gray"}}>Name</Text>
            <Text>{info.name}</Text>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.infoCont}>
            <Text style={{color:"gray"}}>Email</Text>
            <Text>{info.email}</Text>
        </View>

        <View style={styles.divider}></View>

        <View style={styles.infoCont}>
            <Text style={{color:"gray"}}>Phone</Text>
            <Text>{info.phone}</Text>
        </View>
    </View>
  )
}

export default Personalinfo

const styles = StyleSheet.create({
    cont:{
        width:"100%",
        height:vs(120),
        borderRadius:s(20),
        backgroundColor:"white",
        borderWidth:s(1),
        borderColor:"#f2ecf8",
        padding:s(15),
        marginBottom:s(20),
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:s(10)
    },
    infoCont:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1,
    },
    divider:{
        alignSelf:"center",
        width:"100%",
        height:1,
        backgroundColor:"#f4f1f7",
        margin:s(8),
    },
})