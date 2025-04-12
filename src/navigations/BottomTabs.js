import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartList from '../screens/CartList';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductList from '../screens/ProductList';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarButton: (props) => (
        <TouchableWithoutFeedback {...props}>
          <View style={{ flex: 1, alignItems: 'center' }}>{props.children}</View>
        </TouchableWithoutFeedback>
      ),
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = 'cart-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fb',
        paddingTop: 16
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 300,
      },
      tabBarActiveTintColor: '#0055ff',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={ProductList} />
    <Tab.Screen name="Cart" component={CartList} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default BottomTabs;