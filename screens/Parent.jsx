import { View, Text ,SafeAreaView,Platform,StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'

import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import WishList from './WishList';
import Accounts from './Accounts';

const Tab = createBottomTabNavigator();

const Parent = () => {
  return (
    <View  className="flex-1" style={{paddingTop:Platform.OS ==='android'?StatusBar.currentHeight:0}}>
      <Tab.Navigator initialRouteName='home' screenOptions={{headerShown:false}}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="cart" component={Cart} />
      <Tab.Screen name="wishList" component={WishList} />
      <Tab.Screen name="accounts" component={Accounts} />
    </Tab.Navigator>
    </View>
  )
}

export default Parent