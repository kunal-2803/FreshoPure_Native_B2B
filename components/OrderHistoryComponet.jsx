import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const OrderImg = require('./../assets/orderimg.png')
import {useNavigation} from '@react-navigation/native'



const OrderHistoryComponet = () => {

    const navigation = useNavigation()

    const handlePress=()=>{
      navigation.navigate('orderHistoryItems')
    }

    return (
        <View>
            <View className="justify-center items-center mb-5">
                <View className="rounded-md bg-bordergray" style={{ width: width * 0.9 }} >

                    <View className="flex flex-row items-center justify-between">
                        <View className="flex flex-row items-center">
                            <View>
                                <Image source={OrderImg} className="h-20 m-4" style={{ width: width * 0.23 }} />
                            </View>
                            <View style={{ width: width * 0.34 }}>
                                <Text className="text-lightText text-xs">10:30 AM</Text>
                                <Text><Text className="font-bold">Order Id:</Text> #9355</Text>
                                <View className="flex flex-row justify-between">
                                    <Text className="text-lightText text-xs ">10 Items</Text>
                                    <Text className="text-lightText text-xs ">|</Text>
                                    <Text className="text-lightText text-xs">30/08/2023</Text>
                                </View>
                                <View className="flex flex-row justify-between">
                                    <Text className="text-lightText text-xs">Rs. 5049</Text>
                                    <Text className="text-green text-xs font-bold">Completed</Text>
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
                            <TouchableOpacity style={{ width: width * 0.36 }} className="bg-green p-2 rounded-lg flex justify-center items-center mb-4">
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