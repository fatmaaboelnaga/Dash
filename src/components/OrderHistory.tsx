import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const OrderHistory = () => {
  return (
    <View style={styles.cont}>
        <View style={styles.iconCont}>
            <FontAwesome5 name="file-invoice-dollar" size={18} color="black" />
        </View>
        <Text style={styles.text}>Order history</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={22} color="gray" />
        </TouchableOpacity>
    </View>
  );
};

export default OrderHistory;

const iconContSize = s(35);

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    height: s(65),
    backgroundColor: "white",
    borderRadius: s(20),
    padding: s(15),
    marginBottom: s(20),
    borderWidth: s(1),
    borderColor: "#f2ecf8",
    flexDirection:"row",
    alignItems:"center"
  },
  iconCont:{
    width:iconContSize,
    height:iconContSize,
    backgroundColor: "#f4f1f7",
    borderRadius:iconContSize/2,
    justifyContent:"center",
    alignItems:"center",
    marginRight:s(10),

  },
  text:{
    flex:1,
    fontWeight:600,
    fontSize:s(15),
  },
  
});
