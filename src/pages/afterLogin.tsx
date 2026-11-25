import { ScrollView, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import React from "react";
import UserInfo from "../components/UserInfo";
import Personalinfo from "../components/Personalinfo";
import SavedAddresses from "../components/SavedAddresses";
import Favorites from "../components/Favorites";
import PaymentAndNotifications from "../components/PaymentAndNotifications";
import OrderHistory from "../components/OrderHistory";
import Password from "../components/Password";
import SignOut from "../components/SignOut";

const AfterLogin = () => {
  return (
    <ScrollView style={styles.afterLoginCont}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <View style={styles.userInfoCont}>
        <UserInfo />
      </View>

        <Personalinfo />

        <SavedAddresses />

        <Favorites />

        <PaymentAndNotifications />

        <OrderHistory />

        <Password />

        <SignOut />

        <Text style={styles.delAcc}>Delete account</Text>
    </ScrollView>
  );
};

export default AfterLogin;

const styles = StyleSheet.create({
  afterLoginCont: {
    paddingHorizontal: s(22),
  },

  header: {
    paddingTop: s(60),
    paddingBottom: s(20),
  },

  headerTitle: {
    fontSize: s(25),
    fontWeight: "700",
  },
  userInfoCont: {
    alignItems: "center",
  },
  delAcc:{
    color:"#ca3939",
    marginBottom:s(70),
    fontSize:s(13),
    alignSelf:"center"
  },
});
