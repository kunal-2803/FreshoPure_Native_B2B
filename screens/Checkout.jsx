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
    FlatList
  } from "react-native";
  import React, { useState,useEffect } from "react";
  import CustomHeader from "../components/CustomHeader.jsx";
  import CustomButton from "../components/CustomButton.jsx";
  const bg = require("./../assets/bg-texture.png");
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const apple = require("./../assets/apple.png");
  import Ionicons from "react-native-vector-icons/Ionicons";
  import EvilIcons from 'react-native-vector-icons/EvilIcons';
  const address = require('./../assets/address.png')
  import Icon from 'react-native-vector-icons/AntDesign'

  import {useDispatch,useSelector} from 'react-redux';   
  import { fetchCartItems } from "../redux/slices/Cart/index.js";
  import { placeOrder } from "../redux/slices/Order/index.js";
  import { selectedAddress } from "../redux/slices/Address/index.js";
 import {useNavigation} from '@react-navigation/native'
 import SkeletonComponent from "../components/SkeletonComponent.jsx";


  const Cart = () => {

    const dispatch=useDispatch();
    const navigation = useNavigation()
    const {data,isError,isLoading} = useSelector(state=>state.cartItems)
    const { selected } = useSelector(state => state.address)
    let totalPrice =0
    data?.cartData.forEach((item) => {
      totalPrice += (item.quantity.kg + (item.quantity.gram / 1000)) * item.costPrice;
    });
    console.log(totalPrice,"pricccefrf")
    // console.log(selected)
    
    useEffect(()=>{
      dispatch(fetchCartItems()),
      dispatch(selectedAddress())
    },[])

    const handlePress=()=>{
      const data ={}
      data.address =selected?.address._id
      data.price =totalPrice
      dispatch(placeOrder(data));
      
      navigation.navigate('orderConfirm')
    }


    return (
      <View className="flex">
        <CustomHeader
          title={"Checkout"}
          backButton={true}
          height={0.14}
          headerBar={false}
        />
        <Image
          source={bg}
          className="absolute"
          style={{ height: windowHeight * 1.4 }}
          resizeMode="repeat"
        />
  
        <View className="flex w-full justify-center items-center">
        <ScrollView className="flex h-full" style={{height:windowHeight}}>
         

          <SafeAreaView style={{ height: windowHeight * 0.28 }} className="flex w-full justify-center items-center">
      {isLoading?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.03}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.03}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.03}/>
            </>:
            <>
      <FlatList
         className = ""
         style={{width:windowWidth*0.9}}
         data={data?.cartData}
         renderItem={item=><ItemComponent item={item?.item}/>}
         keyExtractor={item => item._id}
         showsVerticalScrollIndicator = {false}
    />
    
    </>
      }
     
      </SafeAreaView>




          <View style={{width:windowWidth*0.9,height:1}} className="bg-linegray my-2"></View>

          <View style={{ width: windowWidth * 0.9 }} className="flex flex-row justify-between">
          <Text className="font-semibold capitalize text-md my-2">
            Delivery Address
          </Text>
          <TouchableOpacity><EvilIcons name="chevron-right" size={34}/></TouchableOpacity>
          </View>


          <View style={{width:windowWidth*0.9}}>
          <View className="bg-white h-14 rounded-lg flex flex-row px-1 justify-between items-center my-1" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
          <View className="flex flex-row items-center">
            <Image source={address} className="w-10 h-10"/>
            <View className="ml-2 w-3/4">
              <Text className="text-xs text-lightText">{selected?.address.addressLine1} , {selected?.address.city},{selected?.address.state}, {selected?.address.pinCode}</Text>
            </View>
          </View>
          <TouchableOpacity className="border-2 mr-2 rounded-full bg-green p-1 border-white"><Icon name="check" color={'#fff'}/></TouchableOpacity>
        </View>
          </View>

          <View style={{width:windowWidth*0.9,height:1}} className="bg-linegray my-4 mt-6"></View>

          <View style={{ width: windowWidth * 0.9 }} className="flex flex-row justify-between">
          <Text className="font-semibold capitalize text-md">
            Order Details
          </Text>
          </View>

          <View style={{width:windowWidth*0.9,marginTop:6}}>
          <View className="flex justify-between flex-row w-full my-2">
            <Text className="text-xs text-lightText">Subtotal</Text>
            <Text className="text-xs font-semibold">₹ {totalPrice}</Text>
          </View>

          <View className="flex justify-between flex-row w-full my-2">
            <Text className="text-xs text-lightText">Delivery Charge</Text>
            <View className="flex flex-row">
            <Text className="text-xs font-semibold mr-1">Free</Text>
            <Text className="text-xs font-semibold line-through">₹ 50</Text>
            </View>
          </View>

          <View className="flex justify-between flex-row w-full my-2">
            <Text className="text-xs text-lightText">Total Saving</Text>
            <Text className="text-xs font-semibold">₹ 50</Text>
          </View>

          <View style={{width:windowWidth*0.9,height:1}} className="bg-linegray my-4 mt-1"></View>


          <View className="flex justify-between flex-row w-full">
            <Text className="text-xs text-lightText">Subtotal</Text>
            <Text className="text-xs font-semibold">₹{totalPrice}</Text>
          </View>
          </View>

          <View style={{width:windowWidth*0.9,height:1}} className="bg-linegray my-4 mt-4"></View>

          <CustomButton text="Place Order" width={windowWidth*0.9} handlePress={handlePress}/>

        </ScrollView>
        </View>
      </View>
    );
  };


  const ItemComponent = ({item})=>{
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
          
        </View>
      </View>
  
      <View className="flex items-center mt-2">
        <View
          className="flex-row justify-between px-4"
          style={{ width: windowWidth * 0.9 }}
        >
          
        </View>
      </View>
    </View>
    )
  }
  
  export default Cart;
  