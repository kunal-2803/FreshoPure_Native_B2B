import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, FlatList,RefreshControl, SafeAreaView } from 'react-native'
import React, { useState, useEffect ,useCallback} from 'react'

import CustomHeader from '../components/CustomHeader';
import OrderHistoryComponet from '../components/OrderHistoryComponet';
import SkeletonComponent from '../components/SkeletonComponent'
import useNetworkStatus from '../utils/useNetworkStatus.js'

import { orderHistory } from '../redux/slices/Order/index.js'
import { useDispatch, useSelector} from 'react-redux';
import NoInternet from '../components/NoInternet.js';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const bg = require('./../assets/bg-texture.png')
const NoOrder = require('./../assets/NoOrder.png')


const OrderHistory = () => {
  const dispatch = useDispatch();
  const isConnected = useNetworkStatus()
  const { isError, isLoading, orderhistorty } = useSelector(state => state.order)
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLoading, setpageLoading] = useState(false);


  useEffect(() => {
    {isConnected && dispatch(orderHistory())}
  }, [dispatch])

  const onRefresh = useCallback(async()=>{
    setRefreshing(true)
    {isConnected && dispatch(orderHistory()) }
    setRefreshing(false)
    },[refreshing])

  return (
    <SafeAreaView>
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
       isConnected ?     
       <View className="mt-4 flex justify-center items-center">

         {orderhistorty?.orderHistory?.length >0 ?
           <FlatList
            className="mb-10"
            style={{ width: width * 0.9 }}
            data={orderhistorty?.orderHistory}
            renderItem={item => <OrderHistoryComponet item={item?.item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator ={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh} 
              // colors={[themeColors.bgMid]} 
              // tintColor={themeColors.bgMid} 
              />
            }
          />:<View className="justify-center items-center text-center"><Image source={NoOrder} style={{ width: width * 0.6, resizeMode: 'contain' }} /><Text className="mt-0 font-semibold opacity-60">No Order History Found</Text></View>}

        </View>:<NoInternet/>
      }
    </SafeAreaView>
  )
}

export default OrderHistory