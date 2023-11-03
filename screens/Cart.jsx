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
} from "react-native";
import React, { useState,useEffect } from "react";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
const bg = require("./../assets/bg-texture.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const apple = require("./../assets/apple.png");
import Ionicons from "react-native-vector-icons/Ionicons";
import {fetchCartItems} from '../redux/slices/Cart/index.js'
import {useDispatch,useSelector} from 'react-redux';   

const Cart = () => {
  const dispatch=useDispatch();
  const {data,isError,isLoading} = useSelector(state=>state.cartItems)
  

  useEffect(()=>{
    dispatch(fetchCartItems())
  },[])
  return (
    <View className="flex">
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

      <View className="flex w-full justify-center items-center">
        <ScrollView style={{ width: windowWidth * 0.9 }}>
       


        </ScrollView>
      </View>
    </View>
  );
};

const CartItem = ()=>{
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
        <Image source={apple} className="w-10 h-10"></Image>
        <View>
          <Text className="font-semibold ml-2">Apple</Text>
          <Text className="ml-2 text-xs text-lightText mt-1">
            2kg 500gm
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
