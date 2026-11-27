import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Search from '../pages/search';
import Cart from '../pages/cart';
import Orders from '../pages/orders';
import BeforeLogin from '../pages/before login';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={BeforeLogin} />

    </Tab.Navigator>
  );
}