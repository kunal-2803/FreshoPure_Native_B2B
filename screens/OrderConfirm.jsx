import { View, Text, TouchableOpacity,TextInput,Dimensions,Image } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const confirmImage = require('./../assets/orderConfirmed.png')

const OrderConfirm = () => {
  return (
    <View className="flex justify-center items-center">
       <Image 
        source={confirmImage}
        style={{marginTop:height*0.24}}
      />
      <Text className="mt-6 font-bold text-2xl">Order Confirmed!</Text>
      <Text className="mt-3 text-center">Your order has been confirmed, we will send {'\n'} you confirmation email shortly.</Text>

      <TouchableOpacity style={{marginTop:100}}>
        <Text className="border py-2 items-center text-center rounded-md" style={{width:width*0.8}}>Go to Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:10}}>
        <Text className="border py-2 items-center text-center rounded-md" style={{width:width*0.8}}>Continue Shopping</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default OrderConfirm