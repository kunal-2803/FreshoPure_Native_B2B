import { View, Text, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import {useDispatch,useSelector} from 'react-redux'
import {getProfile} from './redux/slices/UserProfile/index.js'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='otp' component={OtpVerify} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const RootNavigation = () => {
    const {data} = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const user = data?.hotelData;  

    console.log(data)

    return (
        <>

            <Stack.Navigator >
            
                {/* <Stack.Screen name='address' component={Address} options={{headerShown:false}}/> */}

                {/* <Stack.Screen name='splashScreen1' component={SplashScreen1} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen2' component={SplashScreen2} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen3' component={SplashScreen3} options={{headerShown:false}}/> */}

            
            {/* <Stack.Screen name='analytics' component={Analytics} options={{ headerShown: false }} /> */}



               <Stack.Screen name='parent' component={Parent} options={{ headerShown: false }} />
            <Stack.Screen name='checkout' component={Checkout} options={{ headerShown: false }} />
            <Stack.Screen name='setProfile' component={SetProfile} options={{ headerShown: false }} />
            <Stack.Screen name='analytics' component={Analytics} options={{ headerShown: false }} />




                <Stack.Screen name='address' component={Address} options={{ headerShown: false }} />
                <Stack.Screen name='addAddress' component={AddAddress} options={{ headerShown: false }} />

                <Stack.Screen name='orderHistory' component={OrderHistory} options={{ headerShown: false }} />


                <Stack.Screen name='faq' component={FAQ} options={{ headerShown: false }} />
                <Stack.Screen name='orderHistoryItems' component={OrderHistoryItems} options={{ headerShown: false }} />


                <Stack.Screen name='orderConfirm' component={OrderConfirm} options={{ headerShown: false }} />
                <Stack.Screen name='payment' component={Payment} options={{ headerShown: false }} />

                <Stack.Screen name='userProfile' component={UserProfile} options={{ headerShown: false }} />
            </Stack.Navigator>

        </>
    )

}


const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(token !== null);
        };

        checkToken();
    }, []);

    if (isAuthenticated === null) {
        // Loading state, you can show a loading spinner or another component
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar
                barStyle="light-content" backgroundColor="transparent" translucent={true}
            />
            {/* {isAuthenticated ? <RootNavigation /> : <AuthStack />} */}
            <RootNavigation /> 
        </NavigationContainer>
    );
};




export default Main