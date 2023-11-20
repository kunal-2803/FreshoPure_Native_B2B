import { View, Text, Dimensions, Image, StatusBar, ScrollView, TouchableOpacity, SafeAreaView, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import SkeletonComponent from '../components/SkeletonComponent.jsx'
import useNetworkStatus from '../utils/useNetworkStatus.js'
const bg = require('./../assets/bg-texture.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const apple = require('./../assets/apple.png')
import Ionicons from 'react-native-vector-icons/Ionicons'
<<<<<<< HEAD

import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlistItems, removefromWishlist } from '../redux/slices/Wishlist/index.js'
import { addToCart, fetchCartItems } from '../redux/slices/Cart/index.js'
import NoInternet from '../components/NoInternet.js'
=======
import ButtonLoader from '../components/ButtonLoader.js'
import {useDispatch,useSelector} from 'react-redux'
import { fetchWishlistItems,removefromWishlist } from '../redux/slices/Wishlist/index.js'
import { addToCart,fetchCartItems } from '../redux/slices/Cart/index.js'
>>>>>>> 779de014a89b1fa82babb8d72388562a3b99f24b
const wishlistEmpty = require("./../assets/empty-wishlist.png");

const Wishlist = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { data, isError, isLoading } = useSelector(state => state.wishlistItems)
  const dispatch = useDispatch()
  const isConnected = useNetworkStatus()
  const [refreshing, setRefreshing] = useState(false);
<<<<<<< HEAD
=======
  
  useEffect(()=>{
    {isConnected && dispatch(fetchWishlistItems())}
   },[dispatch])
>>>>>>> 779de014a89b1fa82babb8d72388562a3b99f24b

  useEffect(() => {
    isConnected && dispatch(fetchWishlistItems())
  }, [dispatch])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    { isConnected && dispatch(fetchWishlistItems()) }
    setRefreshing(false)
  }, [refreshing])



  return (
    <>
      <View className="flex">
        <CustomHeader title={'Profile'} backButton={true} height={0.18} headerBar={true} parentHeader={'wishlist'} />
        <Image source={bg} className="absolute" style={{ height: windowHeight * 1.4 }} resizeMode="repeat" />


        {/* item list */}
<<<<<<< HEAD
        <SafeAreaView style={{ height: windowHeight * 0.74 }} className="flex justify-center items-center w-full">
          {isLoading ?
=======
         <SafeAreaView style={{height:windowHeight*0.74}} className="flex items-center w-full">
         {isLoading?
>>>>>>> 779de014a89b1fa82babb8d72388562a3b99f24b
            <>
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
            </> :

            isConnected ? (data?.wishlistData?.length > 0 ? <FlatList
              className=""
              style={{ width: windowWidth * 0.9 }}
              data={data?.wishlistData}
              renderItem={item => <ItemList item={item?.item} />}
              keyExtractor={item => item._id}
              refreshControl={
                <RefreshControl refreshing={refreshing}
                  onRefresh={onRefresh}
                // colors={[themeColors.bgMid]} 
                // tintColor={themeColors.bgMid} 
                />
              }
            /> : <View className="flex justify-center items-center text-center mt-6"><Image source={wishlistEmpty} className="p-4 border" style={{ width: windowWidth * 0.34, resizeMode: 'contain' }} />
              <Text className="font-semibold text-lightText text-center">There is no item added to your Wishlist.</Text><Text className="font-semibold text-lightText">You can add your items anytime is your Wishlist</Text></View>
            ) : <NoInternet />
          }


        </SafeAreaView>
        <View className="flex justify-center items-center">

        </View>

      </View>
    </>
  )
}

const ItemList = ({ item }) => {
  const dispatch = useDispatch()
<<<<<<< HEAD
  const { data } = useSelector(state => state.cartItems)
  const isConnected = useNetworkStatus()

  useEffect(() => {
    isConnected && dispatch(fetchCartItems())
  }, [dispatch])
=======
  const {data,isLoading} = useSelector(state=>state.cartItems)
  const isConnected = useNetworkStatus()

  useEffect(()=>{
    {isConnected && dispatch(fetchCartItems())}
  },[dispatch])
>>>>>>> 779de014a89b1fa82babb8d72388562a3b99f24b

  const AddToCartHandle = (id)=>{
    {isConnected && dispatch(addToCart(id))}
    {isConnected && dispatch(fetchCartItems())}
  }

  const handleAddToWishlist = (id)=>{
    {isConnected && dispatch(removefromWishlist(id))}
    {isConnected && dispatch(fetchCartItems())}
  }

  function func(img) {
    let image = img.substr(12)
    const retImage = 'https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com' + image

    return retImage
  }
  return (
    <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{
      shadowColor: 'rgba(0, 0, 0,1)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 6,
    }}>
      <View className="flex flex-row items-center">
        <Image source={{ uri: func(item?.image) }} className="w-10 h-10"></Image>
        <Text className="font-semibold ml-2 capitalize">{item.itemName}</Text>
      </View>

      <View className="flex flex-row items-center">
        <Ionicons name="heart" color="#DC143C" size={24} onPress={() => dispatch(removefromWishlist(item?._id))} />
        {data?.cartData?.find(cart => cart._id === item?._id) ? <TouchableOpacity className={`flex justify-center items-center border-green bg-green border px-4 py-2 rounded-md ml-4`} ><Text className="text-white uppercase">Added</Text></TouchableOpacity> :
          <TouchableOpacity className={`flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4`} onPress={() => dispatch(addToCart(item?._id))}><Text className="text-green uppercase">Add</Text></TouchableOpacity>}
      </View>
    </View>

<<<<<<< HEAD
=======
            <View className="flex flex-row items-center">
            <Ionicons name="heart" color="#DC143C" size={24} onPress={() =>handleAddToWishlist(item?._id)} />
            {data?.cartData?.find(cart=> cart._id === item?._id )? <TouchableOpacity className={`flex justify-center items-center border-green bg-green border px-4 py-2 rounded-md ml-4`} ><Text className="text-white uppercase">Added</Text></TouchableOpacity>:
              <TouchableOpacity className={`flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4`} onPress={()=>AddToCartHandle(item?._id)}><Text className="text-green uppercase">{isLoading ? <ButtonLoader/> :'Add'}</Text></TouchableOpacity>}
              </View>
          </View> 
          
>>>>>>> 779de014a89b1fa82babb8d72388562a3b99f24b
  )
}

export default Wishlist