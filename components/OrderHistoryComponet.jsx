import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React,{useEffect} from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const OrderImg = require('./../assets/orderimg.png')
import {useNavigation} from '@react-navigation/native'
import { orderAgain } from '../redux/slices/Order';
import { selectedAddress } from '../redux/slices/Address';
import { useDispatch,useSelector } from 'react-redux';
import useNetworkStatus from '../utils/useNetworkStatus.js'
import { fetchCartItems } from "../redux/slices/Cart/index.js";
import { StackActions } from '@react-navigation/native'



const OrderHistoryComponet = ({item}) => {
    const dispatch = useDispatch();
    const isConnected = useNetworkStatus()
    const navigation = useNavigation()
    const { selected } = useSelector(state => state.address)

    const handlePress=()=>{
      navigation.navigate('orderHistoryItems',{data:item})
    }
    const handleOrderAgain=(orderId, addressId)=>{
        const data ={}
        data.orderId =orderId;
        data.addressId =selected?.address._id;
        {isConnected && dispatch(orderAgain(data))}
        {isConnected && dispatch(fetchCartItems())}
        navigation.navigate('cart')
    }


    useEffect(()=>{
        {isConnected && dispatch(selectedAddress())}
      },[dispatch])

   


    return (
        <View>
            <View className="justify-center items-center mb-5">
                <View className="rounded-md bg-bordergray" style={{ width: width * 0.9 }} >

                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                            <View>
                                <Image source={OrderImg} className="h-20 m-4" style={{ width: width * 0.23 }} />
                            </View>
                            <View className="w-fit">
                                <Text className="text-lightText text-xs uppercase">{item?.time}</Text>
                                <Text className="font-bold">Order Id:{item?.orderId}</Text> 
                                <View className="flex flex-row">
                                    <Text className="text-lightText text-xs ">{item?.totalItems} Items </Text>
                                    <Text className="text-lightText text-xs ">|</Text>
                                    <Text className="text-lightText text-xs"> {item?.date}</Text>
                                </View>
                                <View className="flex flex-row ">
                                    <Text className="text-lightText text-xs mr-2">₹ {item?.totalPrice}</Text>
                                    {item?.orderstatus === 'Order Placed' || 'Order Delivered' ? <Text className="text-green text-xs font-bold">{item?.orderstatus}</Text> : (item?.orderstatus === 'Order InProcess') ? <Text className="text-inProcess text-xs font-bold">{item?.orderstatus}</Text> : <Text className="text-red text-xs font-bold">{item?.orderstatus}</Text>}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity className="mr-4" onPress={handlePress}>
                            <MaterialIcons name='keyboard-arrow-right' size={24} />
                        </TouchableOpacity>
                    </View>


                    <View className="flex items-center  ">
                        <View className="flex-row justify-between" style={{ width: width * 0.8 }}>
                            <TouchableOpacity style={{ width: width * 0.36 }} className="bg-white border-linegray border p-2 rounded-lg flex justify-center items-center mb-4">
                                <Text className="text-green uppercase text-xs">Leave a Review</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: width * 0.36 }} className="bg-green p-2 rounded-lg flex justify-center items-center mb-4" onPress={()=>handleOrderAgain(item?._id,item?.addressId)}>
                                <Text className="text-white uppercase text-xs">Order again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </View>
    )
}

export default OrderHistoryComponet