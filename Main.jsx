import { View, Text, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Parent from './screens/Parent';
import LoadingScreen from './components/LoadingScreen.js';

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
import SplashScreen from './screens/SplashScreen';
import {useDispatch,useSelector} from 'react-redux'
import {getProfile} from './redux/slices/UserProfile/index.js'
import { loadUser } from './redux/slices/Mobile/index.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

    return (
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Specify the animation here
        }}>
             {firstLaunch && (<>
             <Stack.Screen name='splashScreen1' component={SplashScreen1} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen2' component={SplashScreen2} options={{headerShown:false}}/>
            <Stack.Screen name='splashScreen3' component={SplashScreen3} options={{headerShown:false}}/></>)}

            <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='otp' component={OtpVerify} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const RootNavigation = () => {
    
    const dispatch = useDispatch()
    const {isAuthenticated,isProfileComplete} = useSelector(state=>state.mobile)


    return (
        <>

            <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Specify the animation here
        }} >
                
           {!isProfileComplete && <Stack.Screen name='setProfile' component={SetProfile} options={{ headerShown: false }} />}
           
              <><Stack.Screen name='parent' component={Parent} options={{ headerShown: false }} />
               <Stack.Screen name='checkout' component={Checkout} options={{ headerShown: false }} />
            



                <Stack.Screen name='address' component={Address} options={{ headerShown: false }} />
                <Stack.Screen name='addAddress' component={AddAddress} options={{ headerShown: false }} />

                <Stack.Screen name='orderHistory' component={OrderHistory} options={{ headerShown: false }} />


                <Stack.Screen name='faq' component={FAQ} options={{ headerShown: false }} />
                <Stack.Screen name='orderHistoryItems' component={OrderHistoryItems} options={{ headerShown: false }} />


                <Stack.Screen name='orderConfirm' component={OrderConfirm} options={{ headerShown: false }} />
                <Stack.Screen name='payment' component={Payment} options={{ headerShown: false }} />
                <Stack.Screen name='analytics' component={Analytics} options={{ headerShown: false }} />

                <Stack.Screen name='userProfile' component={UserProfile} options={{ headerShown: false }} /></>

          


               
            </Stack.Navigator>

        </>
    )

}


const Main = () => {
    const dispatch = useDispatch()
    const {isAuthenticated,isProfileComplete} = useSelector(state=>state.mobile)

    console.log(isAuthenticated,isProfileComplete,'userdata')


    useEffect(() => {
        dispatch(loadUser())

    }, []);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const simulateLoading = async () => {
        // Simulate a 2-second loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
        setLoading(false);
  
      };
  
      simulateLoading();
    }, []);

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
              <StatusBar
        barStyle = "light-content" backgroundColor = "transparent" translucent = {true}
      />
             <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Specify the animation here
        }}>
                {loading && <Stack.Screen name="splash" component={SplashScreen}  options={{ headerShown: false }} />}
              {isAuthenticated ? <Stack.Screen name="RootNavigator" component={RootNavigation}  options={{ headerShown: false }} />
               :
               <Stack.Screen name="AuthNavigator" component={AuthStack}  options={{ headerShown: false }} />
    } 

            </Stack.Navigator>

        </NavigationContainer>
    );
};




export default Main