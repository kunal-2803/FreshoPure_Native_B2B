import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import React, { useState,useEffect } from "react";

import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import {useNavigation} from '@react-navigation/native'
const bg = require("./../assets/bg-texture.png");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

import Ionicons from "react-native-vector-icons/Ionicons";

import {fetchCartItems ,removefromCart} from '../redux/slices/Cart/index.js'
import {useDispatch,useSelector} from 'react-redux';   

const Cart = () => {
  const dispatch=useDispatch();
  const navigation = useNavigation()
  const {data,isError,isLoading} = useSelector(state=>state.cartItems)
  
  useEffect(()=>{
    dispatch(fetchCartItems())
  },[])
  return (
    <View className="flex relative h-full">
      <CustomHeader
        title={"Profile"}
        backButton={true}
        height={0.18}
        headerBar={true}
        parentHeader={"Cart Items"}
      />
      <Image
        source={bg}
        className="absolute"
        style={{ height: windowHeight * 1.4 }}
        resizeMode="repeat"
      />

      <KeyboardAvoidingView behavior="padding" className="flex w-full justify-center items-center">
      <FlatList
         className = ""
         style={{width:windowWidth*0.9}}
         data={data?.cartData}
         renderItem={item=><CartItem item={item?.item}/>}
         keyExtractor={item => item._id}
    />
      </KeyboardAvoidingView>
      <View className="flex justify-center absolute bottom-0 w-full items-center" style={{marginBottom:windowHeight*0.08}}>
      <CustomButton text='Checkout' handlePress={()=>navigation.navigate('checkout')} width={windowWidth*0.9}/>
      </View>
    </View>
  );
};

const CartItem = ({item})=>{
  const dispatch=useDispatch();
  function func(img) {
    let image = img.substr(12)
    const retImage = 'https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com' + image
    
    return retImage
  }

  return (
    <View
    className="w-full h-fit my-2 rounded-md flex flex-col justify-between p-2 items-center shadow-freshoxl bg-white"
    style={{
      shadowColor: "rgba(0, 0, 0,1)",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 6,
    }}
  >
    <View className="flex flex-row justify-between w-full">
      <View className="flex flex-row items-center">
        <Image source={{uri:func(item?.image)}} className="w-10 h-10"></Image>
        <View>
          <Text className="font-semibold ml-2 capitalize">{item?.itemName}</Text>
          <Text className="ml-2 text-xs text-lightText mt-1">
            {item?.quantity?.kg}kg {item?.quantity?.gram}gm
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center">
        <TextInput
          className="border w-10 rounded-md mx-1 border-linegray flex justify-center items-center px-2"
          placeholder="00"
        />
        <Text className="text-xs text-lightText">Kg</Text>
        <TextInput
          className="border w-10 rounded-md mx-1 border-linegray flex justify-center items-center px-2"
          placeholder="000"
        />
        <Text className="text-xs text-lightText">Gram</Text>
      </View>
    </View>

    <View className="flex items-center mt-2">
      <View
        className="flex-row justify-between px-4"
        style={{ width: windowWidth * 0.9 }}
      >
        <TouchableOpacity
          style={{ width: windowWidth * 0.35 }}
          className="bg-white border-linegray border p-2 rounded-lg flex justify-center items-center my-2"
          onPress={()=>dispatch(removefromCart(item?._id))}
        >
          <Text className="text-green uppercase text-xs">Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: windowWidth * 0.35 }}
          className="bg-green p-2 rounded-lg flex justify-center items-center my-2"
        >
          <Text className="text-white uppercase text-xs">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default Cart;
