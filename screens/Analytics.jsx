import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import PieChart from 'react-native-pie-chart'
import { orderHistory } from '../redux/slices/Order/index.js'
import SkeletonComponent from '../components/SkeletonComponent'

import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'

import OrderHistoryComponet from '../components/OrderHistoryComponet';
// import { PieChart } from 'react-native-chart-kit';
import PieCharts from '../components/PieCharts.js';
// import LineChart from '../components/LineChart';
import { useNavigation } from '@react-navigation/native'
import useNetworkStatus from '../utils/useNetworkStatus.js'
import NoInternet from '../components/NoInternet.js'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const bg = require('./../assets/bg-texture.png')
const NoOrder = require('./../assets/NoOrder.png')

const Analytics = () => {
    const dispatch = useDispatch();
    const isConnected = useNetworkStatus()
    const navigation = useNavigation()
    const { isError, isLoading, orderhistorty } = useSelector(state => state.order)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        { isConnected && dispatch(orderHistory()) }
    }, [dispatch])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        { isConnected && dispatch(orderHistory()) }
        setRefreshing(false)
    }, [refreshing])

    const orderData = [];

    if(orderhistorty?.orderHistory[0]){
        orderData.push(orderhistorty?.orderHistory[0])
    }
    if(orderhistorty?.orderHistory[1]){
        orderData.push(orderhistorty?.orderHistory[1])
    }
        
     

    return (
        <View>
            {isConnected ?
                <View className="flex">
                    <CustomHeader title={'Analytics'} backButton={true} height={0.14} headerBar={false} />
                    {/* <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/> */}


                    {/* <PieCharts /> */}

                    <View className="w-full flex justify-center items-center mt-2" style={{ height: windowHeight * 1 }}>
                        <ScrollView style={{ width: windowWidth * 0.9,height:windowHeight*0.84 ,marginBottom:12}} className=" h-full" showsVerticalScrollIndicator={false}>



                            <View className="flex mx-auto flex-row " style={{ width: windowWidth * 0.7 }}>
                                {orderhistorty?.orderHistory?.length >0 ?
                                    <PieCharts /> : <><Image source={NoOrder} style={{ width: windowWidth * 0.6, resizeMode: 'contain' }} /></>
                                }
                            </View>

                            <View className="flex flex-row mx-6 justify-between my-6 items-center">

                                <Text className="font-semibold">Order History</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('orderHistory')}><Text className="font-light">View All</Text></TouchableOpacity>

                            </View>
                            {isLoading ?
                                <>
                                    <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.2} />

                                    <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.2} />

                                </>

                                :
                                isConnected ?
                                    <View className="my-4 mb-12 flex justify-center items-center">

                                        {orderhistorty.orderHistory.length >0 ?

                                          orderhistorty.orderHistory?.slice(0, 2).map((item,index)=><OrderHistoryComponet item={item} key={index}/>)
                                             : <><Text>No Orders Yet !!</Text></>
                                        }

                                    </View> : <NoInternet />
                            }

                        </ScrollView>
                    </View>



                </View> :
                <View className="mt-48 "><NoInternet /></View>
            }
        </View>
    )
}

export default Analytics