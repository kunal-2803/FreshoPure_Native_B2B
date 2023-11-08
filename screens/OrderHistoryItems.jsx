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

const OrderHistoryItem = () => {
  const dispatch=useDispatch();
  const {orderItems,isError,isLoading} = useSelector(state=>state.order)
  const route = useRoute();
  const order_id = route.params.data; 
  console.log(orderItems)
  
  useEffect(()=>{
    dispatch(orderHistoryItems(order_id))
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
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.1}/>
            </>:
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <View className="bg-lightgray h-14 rounded-lg flex flex-row px-2 justify-between items-center my-1" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            
            <View>
              <Text className="text-xs text-lightText ml-2">10 Items</Text>
              <Text className="text-md font-bold ml-2">Order Id #67546778-6543</Text>
              <View className="flex flex-row">
              <Text className="text-xs text-lightText ml-2">₹ 549.00  </Text>
              <Text className="font-bold text-green text-xs">Completed</Text>
              </View>
            </View>


            <View className="flex items-end mr-2">
              <Text className="text-xs text-lightText">10:31 AM</Text>
              <Text className="text-xs text-lightText">3rd July,2023</Text>
            </View>

           
          </View>
        </View>
      </View>
      }

      {/*  address */}
     
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2">
            Other Addresses
          </Text>
          {isLoading?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.1}/>
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
                  43, Electronics City Phase 1, Electronic City
                </Text>
              </View>
            </View>
            <TouchableOpacity className="border-2 mr-2 border-lightText rounded-full bg-white p-2"></TouchableOpacity>
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

          <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            <View className="flex flex-row items-center">
              <Image source={apple} className="w-10 h-10"></Image>
              <View>
              <Text className="font-semibold ml-2">Apple</Text>
              <Text className="ml-2 text-xs text-lightText mt-1">2kg 500gm</Text>
              </View>
            </View>

            <View className="flex items-center mr-2">
            <Text className="font-semibold ml-2">₹ 62.00</Text>
              <Text className="ml-2 text-xs text-lightText mt-1 line-through">₹ 74.00</Text>
            </View>
          </View>

          <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            <View className="flex flex-row items-center">
              <Image source={apple} className="w-10 h-10"></Image>
              <View>
              <Text className="font-semibold ml-2">Apple</Text>
              <Text className="ml-2 text-xs text-lightText mt-1">2kg 500gm</Text>
              </View>
            </View>

            <View className="flex items-center mr-2">
            <Text className="font-semibold ml-2">₹ 62.00</Text>
              <Text className="ml-2 text-xs text-lightText mt-1 line-through">₹ 74.00</Text>
            </View>
          </View>

          <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6}}>
            <View className="flex flex-row items-center">
              <Image source={apple} className="w-10 h-10"></Image>
              <View>
              <Text className="font-semibold ml-2">Apple</Text>
              <Text className="ml-2 text-xs text-lightText mt-1">2kg 500gm</Text>
              </View>
            </View>

            <View className="flex items-center mr-2">
            <Text className="font-semibold ml-2">₹ 62.00</Text>
              <Text className="ml-2 text-xs text-lightText mt-1 line-through">₹ 74.00</Text>
            </View>
          </View>


        </View>
      </View>



    </View>
  );
};

export default OrderHistoryItem;
