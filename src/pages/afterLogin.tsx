import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

type AfterLoginProps = {
  favoriteRestaurantIds: string[];
  onToggleFavorite: (restaurantId: string) => void;
  onSelectRestaurant: (restaurantId: string) => void;
};

const AfterLogin = ({
  favoriteRestaurantIds,
  onToggleFavorite,
  onSelectRestaurant,
}: AfterLoginProps) => {
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
      {/* <Favorites
  favoriteRestaurantIds={favoriteRestaurantIds}
  onToggleFavorite={onToggleFavorite}
  onSelectRestaurant={onSelectRestaurant}
/> */}
      <PaymentAndNotifications />

      <OrderHistory />

      <Password />

      <SignOut />

      <TouchableOpacity>
        <Text style={styles.delAcc}>Delete account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AfterLogin;

const styles = StyleSheet.create({
  afterLoginCont: {
    paddingHorizontal: s(22),
    backgroundColor:"#f4f1f7",
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
  delAcc: {
    color: "#ca3939",
    marginBottom: s(70),
    fontSize: s(13),
    alignSelf: "center",
  },
});
