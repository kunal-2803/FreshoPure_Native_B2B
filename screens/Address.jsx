import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
const bg = require("./../assets/bg-texture.png");
const address = require("./../assets/address.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import { useNavigation } from "@react-navigation/native";
import { selectedAddress, allAddress, selectDiffAddress, deleteaddress } from "../redux/slices/Address/index.js";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/AntDesign'
import SkeletonComponent from '../components/SkeletonComponent.jsx'
import NoInternet from '../components/NoInternet.js'
import useNetworkStatus from '../utils/useNetworkStatus.js'

const Address = () => {
  const isConnected = useNetworkStatus()
  const dispatch = useDispatch();
  const { AllAddress, isLoading, selected } = useSelector(
    (state) => state.address
  );

  const [selectedAddressId,setSelectedAddressId] = useState(selected?.address?._id)
  const navigation = useNavigation();


  const handleRemoveAddress =()=>{
    dispatch(deleteaddress(selectedAddressId))
     dispatch(allAddress())
  }


  const handleDiffAddress = () => {
    dispatch(selectDiffAddress(selectedAddressId))
    {isConnected && dispatch(allAddress())}
    {isConnected && dispatch(selectedAddress())}

  };

  useEffect(() => {
    if(isConnected){dispatch(selectedAddress());}
    if(isConnected){dispatch(allAddress())}
    if(isConnected || !AllAddress){dispatch(allAddress())}
  }, []);


  useEffect(()=>{
  setSelectedAddressId(selected?.address?._id)

  },[AllAddress,selected])

  if(!isConnected){
    
    return(
      <>
     <CustomHeader title={'My Addresses'} backButton={true} height={0.16} headerBar={false}/>
      <NoInternet />
      </>
    )
  }

  return (
    <View className="flex mb-2" style={{ height: windowHeight*1.045 }}>
            <CustomHeader title={'My Addresses'} backButton={true} height={0.16} headerBar={false}/>

      <Image
        source={bg}
        className="absolute"
        style={{ height: windowHeight * 1.4 }}
        resizeMode="repeat"
      />

      <View>
      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          <Text className="font-semibold capitalize text-md my-2">
            Selected Address
          </Text>
          {isLoading ?
            <>
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
            </> 
          :<AddressComponent item={selected?.address} setSelectedAddressId={setSelectedAddressId} selectedAddressId={selectedAddressId}/>}
        </View>
      </View>

      {/* othet address */}

      <View className="flex justify-center items-center w-full mt-4">
        <View style={{ width: windowWidth * 0.9 }} className="">
          {AllAddress?.hotelAddresses?.length > 0 && <Text className="font-semibold capitalize text-md my-2">
            Other Addresses
          </Text>}

          
          
          {isLoading ?
            <>
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
              <SkeletonComponent width={windowWidth * 0.9} height={windowHeight * 0.08} />
            </> 
            :
            <FlatList
         className = ""
         style={{width:windowWidth*0.9}}
         data={AllAddress?.hotelAddresses}
         renderItem={item=><AddressComponent item={item?.item} setSelectedAddressId={setSelectedAddressId} selectedAddressId={selectedAddressId}/>}
         keyExtractor={item => item._id}
    />
    }
        </View>
      </View>

       
           <View className="flex items-center w-full mt-4">
        <View
          className="flex-row justify-between"
          style={{ width: windowWidth * 0.9 }}
        >
          <TouchableOpacity
            style={{ width: windowWidth * 0.42 }}
            className="bg-white border-linegray border p-2 rounded-lg flex justify-center items-center my-2"
            onPress={()=>handleRemoveAddress()}
          >
            <Text className="text-green uppercase text-xs">Remove Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: windowWidth * 0.42 }}
            className="bg-green p-2 rounded-lg flex justify-center items-center my-2"
            onPress={() => navigation.navigate('addAddress')}
          >
            <Text className="text-white uppercase text-xs">
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex justify-center items-center w-full">
        <CustomButton width={windowWidth * 0.9} text="Save Address" handlePress={handleDiffAddress}/>
      </View>
      </View>
    </View>
  );
};

const AddressComponent = ({item,setSelectedAddressId,selectedAddressId}) => {
  return (
    <View
      className="bg-lightgray h-14 rounded-lg flex flex-row px-1 justify-between items-center my-1"
      style={{
        shadowColor: "rgba(0, 0, 0,1)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 6,
      }}
    >
      <View className="flex flex-row items-center">
        <Image source={address} className="w-10 h-10" />
        <View className="ml-2 w-3/4">
          <Text className="text-xs text-lightText">
            {item?.addressLine1}, {item?.addressLine2}, {item?.city}, {item?.state}, {item?.pinCode}
          </Text>
        </View>
      </View>
      <TouchableOpacity className={`border-2 mr-2 rounded-full ${selectedAddressId === item?._id ? 'bg-green p-1 border-white' : 'border-lightText  bg-white p-2' }`} onPress={()=>setSelectedAddressId(item?._id)}>{selectedAddressId === item?._id && <Icon name="check" color={'#fff'}/>}</TouchableOpacity>
    </View>
  );
};

export default Address;
