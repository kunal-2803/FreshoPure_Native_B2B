import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React,{useState,useEffect} from "react";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import SkeletonComponent from '../components/SkeletonComponent'
const bg = require("./../assets/bg-texture.png");
const address = require("./../assets/address.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const apple = require('./../assets/apple.png')
import Ionicons from 'react-native-vector-icons/Ionicons'
import {orderHistoryItems} from '../redux/slices/Order/index.js'
import {useDispatch,useSelector} from 'react-redux';   
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import useNetworkStatus from '../utils/useNetworkStatus.js'

const OrderHistoryItem = () => {
  const dispatch=useDispatch();
  const {orderItems,isError,isLoading} = useSelector(state=>state.order)
  const route = useRoute();
  const order = route.params.data; 
  const isConnected = useNetworkStatus()

  useEffect(()=>{
    {isConnected && dispatch(orderHistoryItems(order?._id))}
  },[])

  return (
    <View className="flex">
      <CustomHeader
        title={"Order History Items"}
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
{isLoading?
            <View className="mt-4">
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            </View >:
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <View className="bg-lightgray h-14 rounded-lg flex flex-row px-2 justify-between items-center my-1" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            
            <View>
              <Text className="text-xs text-lightText ml-2">{orderItems?.itemsData?.length} Items</Text>
              <Text className="text-md font-bold ml-2">Order Id #{order?.orderId}</Text>
              <View className="flex flex-row">
              <Text className="text-xs text-lightText ml-2">₹ {order?.totalPrice}.00  </Text>
              <Text className="font-bold text-green text-xs">{order?.orderstatus}</Text>
              </View>
            </View>


            <View className="flex items-end mr-2">
              <Text className="text-xs text-lightText uppercase">{order?.time}</Text>
              <Text className="text-xs text-lightText">{order?.date}</Text>
            </View>

           
          </View>
        </View>
      </View>
      }

      {/*  address */}
     
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2">
            Address
          </Text>
          {isLoading?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            </>:
          <View className="bg-lightgray h-14 rounded-lg flex flex-row px-1 justify-between items-center my-1" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            <View className="flex flex-row items-center">
              <Image source={address} className="w-10 h-10" />
              <View className="ml-2 w-3/4">
                <Text className="text-xs text-lightText">
                  
                  {orderItems?.OrderedAddress}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="border-2 mr-2 rounded-full bg-green p-1 border-white"><Icon name="check" color={'#fff'}/></TouchableOpacity>
          </View>
      }
        </View>
      </View>


    {/* items list */}
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2">
            Items
          </Text>

          {orderItems?.itemsData?.map((item,index)=><ItemList key={index} item={item}/>)}

         

        </View>
      </View>



    </View>
  );
};

const ItemList = ({item})=>{

  function func(img) {
    let image = img.substr(12)
    const retImage = 'https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com' + image

    return retImage
  }


  return( <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 6}}>
     <View className="flex flex-row items-center">
       <Image source={{ uri: func(item?.image) }} className="w-10 h-10"></Image>
       <View>
       <Text className="font-semibold ml-2 capitalize">{item?.itemName}</Text>
       <Text className="ml-2 text-xs text-lightText mt-1">{item?.quantity?.kg}kg {item?.quantity?.gram}gm</Text>
       </View>
     </View>

     <View className="flex items-center mr-2">
     <Text className="font-semibold ml-2">₹ {item?.costPrice}</Text>
       <Text className="ml-2 text-xs text-lightText mt-1 line-through">₹ {item?.costPrice + 8}</Text>
     </View>
   </View>

  )

}

export default OrderHistoryItem;
