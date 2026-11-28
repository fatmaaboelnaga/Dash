
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { s, vs } from "react-native-size-matters";
import PaymentMethod from "./PaymentMethod";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const paymentMethods = [
  {
    icon: <Feather name="credit-card" size={23} color="black" />,
    name: "Visa",
    desc: "•••• 4242",
  },
  {
    icon: <AntDesign name="apple" size={23} color="black" />,
    name: "Apple Pay",
    desc: "Default",
  },
  {
    icon: <MaterialCommunityIcons name="cash-multiple" size={23} color="black" />,
    name: "Cash",
    desc: "Pay on delivery",
  }
];

const PaymentAndNotifications = () => {

  const [selectedPayment, setSelectedPayment] = useState("Apple Pay");
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(true);


  return (
    <View style={styles.cont}>

      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: s(15) }}>
          Payment & notifications
        </Text>
        <Text style={{ color: "gray", fontWeight: "500" }}>
          Saved
        </Text>
      </View>

      <Text style={{ marginBottom: s(10), fontWeight: "500" }}>
        Default payment
      </Text>

      <View>
        {paymentMethods.map((elem) => (
          <PaymentMethod
            key={elem.name}
            icon={elem.icon}
            name={elem.name}
            desc={elem.desc}
            selected={selectedPayment === elem.name}
            onSelect={() => setSelectedPayment(elem.name)}
          />
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.notifi}>
        <View>
          <Text style={{ fontSize: s(14), marginBottom: s(5) }}>
            Order updates
          </Text>
          <Text style={{ fontSize: s(12), color: "gray" }}>
            Status alerts while your food is on the way
          </Text>
        </View>

        <TouchableOpacity
        onPress={()=>setActive2(!isActive2)}
        >
            <View style={[styles.switch, !isActive2&&styles.offSwitch, isActive2&&styles.onSwitch]}>
                <View style={[styles.innerSwitch]} />
            </View>

        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.notifi}>
        <View>
          <Text style={{ fontSize: s(14), marginBottom: s(5) }}>
            Deals & promotions
          </Text>
          <Text style={{ fontSize: s(12), color: "gray" }}>
            Free delivery days and new restaurants
          </Text>
        </View>

        <TouchableOpacity
        onPress={()=>setActive1(!isActive1)}
        >
            <View style={[styles.switch, !isActive1&&styles.offSwitch, isActive1&&styles.onSwitch]}>
                <View style={[styles.innerSwitch]} />
            </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default PaymentAndNotifications;

const innerSwitch = s(13);
const offColor = "#e3e0e6";
const onColor = '#FFC928';

const styles = StyleSheet.create({
  cont: {
    width: "100%",
    height: s(375),
    backgroundColor: "white",
    borderRadius: s(20),
    padding: s(15),
    marginBottom: s(20),
    borderWidth: s(1),
    borderColor: "#f2ecf8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: s(10)
  },

  divider: {
    alignSelf: "center",
    width: "100%",
    height: 1,
    backgroundColor: "#f4f1f7",
    margin: s(12),
  },

  notifi: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  switch: {
    width: s(30),
    height: vs(15),
    alignSelf: "center",
    borderRadius: s(12),
    justifyContent: "center",
    paddingHorizontal: s(1),
  },
  offSwitch:{
    backgroundColor: offColor,
  },
  onSwitch:{
    backgroundColor: onColor,
    direction:"rtl",
  },

  innerSwitch: {
    width: s(innerSwitch),
    height: s(innerSwitch),
    borderRadius: s(innerSwitch / 2),
    backgroundColor: "#fcf8ff",
  },
});
