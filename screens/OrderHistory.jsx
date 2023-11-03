import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React from 'react'

import CustomHeader from '../components/CustomHeader';

import OrderHistoryComponet from '../components/OrderHistoryComponet';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const bg = require('./../assets/bg-texture.png')


const OrderHistory = () => {
  return (
    <View>
      <CustomHeader title={'Order History'} backButton={true} height={0.16} headerBar={false} />
      <Image source={bg} className="absolute" style={{ height: height * 1.4 }} resizeMode="repeat" />

    <View className="mt-12">
    <OrderHistoryComponet></OrderHistoryComponet>
      <OrderHistoryComponet></OrderHistoryComponet>
    </View>
      


      
    </View>
  )
}

export default OrderHistory