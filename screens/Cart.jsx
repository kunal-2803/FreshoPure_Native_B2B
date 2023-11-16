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
import SkeletonComponent from "../components/SkeletonComponent.jsx";

const bg = require("./../assets/bg-texture.png");
const cartEmpty = require("./../assets/empty-cart.png");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

import Ionicons from "react-native-vector-icons/Ionicons";

import {fetchCartItems ,removefromCart,updateCartItems} from '../redux/slices/Cart/index.js'

import {useDispatch,useSelector} from 'react-redux';   

const Cart = () => {
  const dispatch=useDispatch();
  const navigation = useNavigation()
  const {data,isError,isLoading} = useSelector(state=>state.cartItems)
  
  useEffect(()=>{
    dispatch(fetchCartItems())
  },[dispatch])

  const handlePress=()=>{
    // dispatch(loginApi(mobile));
    // saveData();
    navigation.navigate('checkout')
  }

  return (
    <View className="flex relative h-screen">
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

      <View className="flex w-full items-center">
      {isLoading?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.15}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.15}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.15}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.15}/>
            </>
            :
            (data?.cartData?.length > 0 ? <FlatList
         showsVerticalScrollIndicator={false}
         style={{width:windowWidth*0.9,height:windowHeight*0.62}}
         data={data?.cartData}
         renderItem={item=><CartItem item={item?.item}/>}
         keyExtractor={item => item._id}
    /> : <View className="flex justify-center items-center text-center mt-12"><Image source={cartEmpty} style={{width:windowWidth*0.5,resizeMode:'contain'}}/>
         <Text className="font-semibold text-lightText">Opps! We can’t find your product!</Text><Text className="font-semibold text-lightText"> But you can add it to cart</Text></View>)
      }
        
      </View>
      <View className="flex justify-center absolute bottom-20 w-full items-center">
      {data?.cartData?.length > 0 && <CustomButton text='Checkout' handlePress={()=>navigation.navigate('checkout')} width={windowWidth*0.9}/>}
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
  const [kg,setKg] = useState(1);
  const [gram,setGram] = useState(0);

  const onChangeKg = (text)=>{
    // console.log(text)
    setKg(text);
  }
  const onChangeGram = (text)=>{
    // console.log(text)
    setGram(text);
  }
  const handleSave =(id)=>{
    const data ={}
    data.kg =kg;
    data.gram = gram
    data.itemId = id
    dispatch(updateCartItems(data))
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
        <Image source={{uri:func(item?.image)}} className="w-10 h-10"/>
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
          placeholder='00'
          onChangeText={(text)=>onChangeKg(text)}
        />
        <Text className="text-xs text-lightText">Kg</Text>
        <TextInput
          className="border w-10 rounded-md mx-1 border-linegray flex justify-center items-center px-2"
          placeholder="000"
          onChangeText={(text)=>onChangeGram(text)}
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
          onPress={()=>handleSave(item?._id)}
        >
          <Text className="text-white uppercase text-xs">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default Cart;
