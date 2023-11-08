import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import SkeletonComponent from '../components/SkeletonComponent.jsx'
const bg = require('./../assets/bg-texture.png')
const address = require('./../assets/address.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native'
import { selectedAddress, allAddress } from '../redux/slices/Address/index.js'
import { useDispatch, useSelector } from 'react-redux';

const Address = () => {
  const dispatch = useDispatch();
  const { AllAddress, isLoading, selected, isError } = useSelector(state => state.address)
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('addAddress')


  }

  useEffect(() => {
    dispatch(selectedAddress())
    dispatch(allAddress())
  }, [])

  return (
    <View className="flex">
      <CustomHeader title={'My Addresses'} backButton={true} height={0.14} headerBar={false} />
      <Image source={bg} className="absolute" style={{ height: windowHeight * 1.4 }} resizeMode="repeat" />

      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2" >Selected Address</Text>
          {isLoading ?
            <>
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.1} />
            </> :
            <AddressComponent />
          }
        </View>
      </View>


      {/* othet address */}

      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2">Other Addresses</Text>
          {isLoading ?
            <>
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
            </> :
            <FlatList
              className=""
              style={{ width: windowWidth * 0.9 }}
              data={AllAddress?.hotelAddresses}
              renderItem={item => <AddressComponent item={item?.item} />}
              keyExtractor={item => item._id}
            />
          }
        </View>
      </View>


      <View className="flex items-center w-full mt-4">
        <View className="flex-row justify-between" style={{ width: windowWidth * 0.9 }}>
          <TouchableOpacity style={{ width: windowWidth * 0.42 }} className="bg-white border-linegray border p-2 rounded-lg flex justify-center items-center my-2">
            <Text className="text-green uppercase text-xs">Remove Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: windowWidth * 0.42 }} className="bg-green p-2 rounded-lg flex justify-center items-center my-2" onPress={() => handlePress()}>
            <Text className="text-white uppercase text-xs">Add New Address</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View className="flex justify-center items-center w-full">
        <CustomButton width={windowWidth * 0.9} text="Save Address" />
      </View>



    </View>
  )
}

const AddressComponent = () => {
  return (
    <View className="bg-lightgray h-14 rounded-lg flex flex-row px-1 justify-between items-center my-1" style={{
      shadowColor: 'rgba(0, 0, 0,1)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 6
    }}>
      <View className="flex flex-row items-center">
        <Image source={address} className="w-10 h-10" />
        <View className="ml-2 w-3/4">
          <Text className="text-xs text-lightText">43, Electronics City Phase 1, Electronic City</Text>
        </View>
      </View>
      <TouchableOpacity className="border-2 mr-2 border-lightText rounded-full bg-white p-2"></TouchableOpacity>
    </View>
  )
}

export default Address