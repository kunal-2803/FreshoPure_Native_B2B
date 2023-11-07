import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Parent from './screens/Parent';
import Home from './screens/Home';
import Login from './screens/Login';
import OtpVerify from './screens/OtpVerify';
import AddAddress from './screens/AddAddress';
import Address from './screens/Address';
import Cart from './screens/Cart';
import OrderConfirm from './screens/OrderConfirm';
import OrderHistory from './screens/OrderHistory';
import OrderHistoryItems from './screens/OrderHistoryItems';
import Payment from './screens/Payment';
import SetProfile from './screens/SetProfile';
import SplashScreen1 from './screens/SplashScreen1';
import SplashScreen2 from './screens/SplashScreen2';
import SplashScreen3 from './screens/SplashScreen3';
import UserProfile from './screens/UserProfile';
import WishList from './screens/WishList';
import Accounts from './screens/Accounts';
import Analytics from './screens/Analytics';
import FAQ from './screens/FAQ';
import Checkout from './screens/Checkout';

const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        <>
        <StatusBar
        barStyle = "light-content" backgroundColor = "transparent" translucent = {true}
      />
        <NavigationContainer>

            <Stack.Navigator >

            <Stack.Screen name='splashScreen1' component={SplashScreen1} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen2' component={SplashScreen2} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen3' component={SplashScreen3} options={{headerShown:false}}/>
            <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='otp' component={OtpVerify} options={{headerShown:false}}/>
            <Stack.Screen name='setProfile' component={SetProfile} options={{headerShown:false}}/>
            <Stack.Screen name='parent' component={Parent} options={{headerShown:false}}/>


            <Stack.Screen name='addAddress' component={AddAddress} options={{headerShown:false}}/>
            <Stack.Screen name='address' component={Address} options={{headerShown:false}}/>

            <Stack.Screen name='orderHistory' component={OrderHistory} options={{headerShown:false}}/>


            <Stack.Screen name='faq' component={FAQ} options={{headerShown:false}}/>
            <Stack.Screen name='orderHistoryItems' component={OrderHistoryItems} options={{headerShown:false}}/>
            <Stack.Screen name='analytics' component={Analytics} options={{headerShown:false}}/>

                
                <Stack.Screen name='orderConfirm' component={OrderConfirm} options={{headerShown:false}}/>
                <Stack.Screen name='payment' component={Payment} options={{headerShown:false}}/>

                <Stack.Screen name='userProfile' component={UserProfile} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </>
    )
}

export default Main