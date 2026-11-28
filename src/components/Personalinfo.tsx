import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { s, vs } from 'react-native-size-matters'

const Personalinfo = () => {
    const info = {name:"Alex", email:"alex@gmail.com", phone:"Not added"}
    const [editing, setEditing] = useState(false);
    console.log(editing)
  return (
    <View style={[styles.cont, editing&&styles.contExp]}>
        <View style={styles.header}>
            <Text style={{fontWeight:"bold", fontSize:s(15)}}>Personal info</Text>
            <TouchableOpacity
            onPress={()=>setEditing(!editing)}
            >
                <Text style={{fontWeight:"bold", color:"#075B36"}}>{!editing? "Edit" : ""}</Text>  
            </TouchableOpacity>
        </View>

        {
           !editing&&(
            <>
                 
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

        
            </>
           )
        }

        {
            editing && (
                <>
                    <Text style={{marginBottom:s(6), fontWeight:600}}>Full name</Text>
                    <TextInput style={styles.input} placeholder={info.name}/>
                    <Text style={{marginBottom:s(6), fontWeight:600}}>phone</Text>
                    <TextInput style={styles.input} placeholder='+1 555 010 2030'/>
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.saveBtn} onPress={()=>setEditing(!editing)}>
                            <Text style={{color:"white", fontWeight:600}}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>setEditing(!editing)}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )
        }

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
    contExp:{
        height:vs(190),
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
    input:{
        width:"100%",
        height:vs(30),
        borderRadius:s(15),
        backgroundColor:"#f4f1f7",
        paddingHorizontal:s(15),
        marginBottom:s(8)
    },
    btns:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:s(3),
    },
    saveBtn:{
        backgroundColor:"black",
        width:s(100),
        height:vs(30),
        justifyContent:"center",
        alignItems:"center",
        borderRadius:s(20),
        marginRight:s(10),
    },
})
