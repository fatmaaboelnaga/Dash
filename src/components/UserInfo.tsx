import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import ProfilePic from './ProfilePic'
import UserDashboard from './UserDashboard'

const info = {name:"Alex", email:"alex@gmail.com", joiningDate:"November 2026"}

const UserInfo = () => {
  return (
    <View style={styles.cont}>
      <View style={styles.userInfoTop}>
        <View style={{paddingRight:s(20)}}><ProfilePic /></View>
        <View style={{flex:1}}>
            <Text style={{color:'white', fontWeight:"bold", fontSize:s(20), paddingBottom:s(3)}}>{info.name}</Text>
            <Text style={{color:'rgba(255,255,255,0.5)', fontWeight:"bold"}}>{info.email}</Text>
            <Text style={{color:'rgba(255,255,255,0.5)', fontWeight:"bold"}}>Member since {info.joiningDate}</Text>
        </View>
      </View>
    <UserDashboard />

    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({
    cont : {
        backgroundColor:'#075B36',
        width: '100%',
        height:vs(135),
        borderRadius:s(20),
        padding : s(15),
        justifyContent:"space-between",
        marginBottom:s(20),
    },
    userInfoTop : {
        flexDirection:"row",
    },
})