import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'

const ProfilePic = () => {
  return (
    <View style={styles.cont}>
      <Text style={{fontWeight:"bold", fontSize:s(15)}}>Alex</Text>
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({
    cont:{
        width: s(50),
        height:s(50),
        borderRadius:s(25),
        backgroundColor:'#FFC928',
        justifyContent:"center",
        alignItems:"center",
    },
})