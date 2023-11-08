import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import CustomHeader from '../components/CustomHeader';
import OrderHistoryComponet from '../components/OrderHistoryComponet';
import SkeletonComponent from '../components/SkeletonComponent'

import { orderHistory } from '../redux/slices/Order/index.js'
import { useDispatch, useSelector } from 'react-redux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const bg = require('./../assets/bg-texture.png')


const OrderHistory = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, orderhistorty } = useSelector(state => state.order)
  console.log(isLoading);

  useEffect(() => {
    dispatch(orderHistory())
  }, [])

  return (
    <View>
      <CustomHeader title={'Order History'} backButton={true} height={0.16} headerBar={false} />
      <Image source={bg} className="absolute" style={{ height: height * 1.4 }} resizeMode="repeat" />
      {isLoading ? 
      <>
      <SkeletonComponent width={width*0.9} height={height*0.2}/>

      <SkeletonComponent width={width*0.9} height={height*0.2}/>
      <SkeletonComponent width={width*0.9} height={height*0.2}/>
      <SkeletonComponent width={width*0.9} height={height*0.2}/>
      </>
    
       :      
       <View className="mt-4 flex justify-center items-center">


          <FlatList
            className=""
            style={{ width: width * 0.9 }}
            data={orderhistorty?.orderHistory}
            renderItem={item => <OrderHistoryComponet item={item?.item} />}
            keyExtractor={item => item._id}
          />

        </View>
      }




    </View>
  )
}

export default OrderHistory