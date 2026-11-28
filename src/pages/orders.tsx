
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ms, s, vs } from 'react-native-size-matters';

type ordersProps = {orderSomething? : ()=> void;

}
const Orders = ({orderSomething}:ordersProps)=>{return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.header_title}>Orders</Text>
        </View>
        
         <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="receipt-outline" size={ms(36)} color="#111C17" />
        </View>

        <Text style={styles.title}>No orders yet</Text>
        <Text style={styles.subtitle}>
          When you place an order, you can track it here.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={orderSomething}
        >
          <Text style={styles.buttonText}>Order something</Text>
        </TouchableOpacity>
      </View>
    </View>
);
}
const styles = StyleSheet.create({
    container:{  flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {paddingHorizontal: s(20),
    paddingTop : vs(40),
    paddingBottom: vs(10)
  },

  header_title: {
    fontSize: ms(30),
    fontWeight :'700',
    color: '#17231D'
  },

  content :{ flex :1 ,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(30),
  },

  title:{
    fontSize :ms(17),
    fontWeight : '600',
    color: '#17231D',
    marginBottom: vs(20),
  },

  subtitle:{
    fontSize :ms(15),
    fontWeight : '500',
    color: "#69736D",
    textAlign: 'center',
    marginBottom: vs(12),
  },
    button: {
    backgroundColor: '#17231D',
    paddingVertical: vs(13),
    paddingHorizontal: s(26),
    borderRadius: s(30),
    marginTop: vs(3),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: ms(14),
    fontWeight: '500',
  },

  iconCircle: {
  width: s(82),
  height: s(82),
  borderRadius: s(41),
  backgroundColor: '#ebb625',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: vs(20),
},
});


export default Orders;