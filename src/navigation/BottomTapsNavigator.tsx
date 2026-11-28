import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Search from '../pages/search';
import Cart from '../pages/cart';
import Orders from '../pages/orders';
import BeforeLogin from '../pages/before login';
import AfterLogin from '../pages/afterLogin';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: {
      fontSize: 13,
    },
  }}
    >
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} /> */}

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={27} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AfterLogin}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={27} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}