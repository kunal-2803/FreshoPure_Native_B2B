import { View, Text, TouchableOpacity,TextInput,Dimensions,Image,BackHandler } from 'react-native'
import React,{useEffect} from 'react'
const bg = require('./../assets/bg-texture.png')
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import CustomButton from '../components/CustomButton.jsx'
const confirmImage = require('./../assets/orderConfirmed.png')
import {useNavigation} from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux'
import { fetchCartItems } from "../redux/slices/Cart/index.js";
import NoInternet from '../components/NoInternet.js'
import useNetworkStatus from '../utils/useNetworkStatus.js'
import { StackActions } from '@react-navigation/native'

const OrderConfirm = () => {
  const navigation = useNavigation()
  const isConnected = useNetworkStatus()
   const dispatch = useDispatch()
   
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('home'); // Navigate to the "Home" tab
      return true; // Return true to prevent default back button behavior
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();// Clean up the event listener when the component is unmounted
  }, []);

  useEffect(() => {
    {isConnected && dispatch(fetchCartItems())}
  }, [])


  return ( 
    <View className="flex justify-center items-center bg-white h-screen">
            <Image source={bg} className="absolute" style={{height:height*1.4}} resizeMode="repeat"/>

       <LottieView
          source={require('../assets/orderconfirm.json')}
          autoPlay
          loop
          style={{ height: height*0.5 }}
        />
      <Text className="mt-6 font-bold text-2xl">Order Confirmed!</Text>
      <Text className="mt-3 text-center text-lightText">Your order has been confirmed, we will send {'\n'} you confirmation email shortly.</Text>

      <TouchableOpacity onPress={()=>navigation.dispatch(
        StackActions.replace('orderHistory')
      )} style={{width:width*0.85}} className="bg-bordergray p-4 rounded-md flex justify-center items-center my-2">
       <Text className="text-lightText">Go to Orders</Text>
    </TouchableOpacity>

      <CustomButton text="Continue Shopping" width={width*0.85} handlePress={()=>navigation.dispatch(
        StackActions.replace('home')
      )}/>
      
    </View>
  )
}

export default OrderConfirm