import { View, Text, StyleSheet, TouchableOpacity,TextInput,Dimensions,TouchableWithoutFeedback, Keyboard,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import HeaderComponent from '../components/HeaderComponent'
import InputFeild from '../components/InputFeild';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { addAddress ,clearData,selectedAddress,allAddress} from "../redux/slices/Address/index.js";
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from '@react-navigation/native'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { useNavigation } from '@react-navigation/native'
import useNetworkStatus from '../utils/useNetworkStatus.js'
const bg = require('./../assets/bg-texture.png')

const AddAddress = () => {
  const dispatch = useDispatch()
  const isConnected = useNetworkStatus()

  const navigation = useNavigation()
  const {isLoading,isError,isSuccess} = useSelector(state=>state.address)
  const [profileData,setProfileData] = useState({addressLine1:'',addressLine2:'',city:'',state:'',pinCode:'',mobileNo:''})

  
  const [formErrors, setFormErrors] = useState({
    addressLine1:'',
    addressLine2:'',
    city:'',
    state:'',
    pinCode:'',
    mobileNo:''
  });



  const handleInputChange =(name,value)=>{
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};


    if (profileData.addressLine1.trim() === '') {
      newErrors.addressLine1 = '*Address Line One is required';
      isValid = false;
    }
    if (profileData.addressLine2.trim() === '') {
      newErrors.addressLine2 = '*Address Line Two is required';
      isValid = false;
    }

    if (profileData.state.trim() === '') {
      newErrors.state = '*State is required';
      isValid = false;
    }

    if (profileData.city.trim() === '') {
      newErrors.city = '*City is required';
      isValid = false;
    }
    if (profileData.pinCode.trim() === '') {
      newErrors.pinCode = '*Pin Code is required';
      isValid = false;
    }else if(profileData.pinCode.length !== 6){
      newErrors.pinCode = '*Pin Code must be of 6 digits';
      isValid = false;
    }

    if (profileData.mobileNo.trim() === '') {
      newErrors.mobileNo = '*Mobile Number is required';
      isValid = false;
    }else if(profileData.mobileNo.length !== 10){
      newErrors.mobileNo = '*Mobile Number must be of 10 digits';
      isValid = false;

    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // All fields are valid, proceed with submission
      isConnected &&  dispatch(addAddress(profileData))
    } else {
      // Display an error or take appropriate action
      console.log('Form validation failed!');
    }
  };

  
  useEffect(()=>{
   if(isSuccess){
    navigation.dispatch(
      StackActions.replace('address')
    );
    if(isConnected){dispatch(selectedAddress());}
    dispatch(clearData())
   }

   if(!isSuccess){
    console.log('error')
    dispatch(clearData())
   }

  },[isError,dispatch,isSuccess])

  return (
    <View className="flex justify-center items-center">
      <Image source={bg} className="absolute" style={{height:height*1.4}} resizeMode="repeat"/>
      <CustomHeader title={'Add Address'} backButton={true} height={0.16} headerBar={false}/>
     <View className="flex items-center">
      
     <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2 mt-14">
      <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('addressLine1',text)} name="addressLine1" keyboardType='default' placeHolder='Address Line One'/>
      <Text className="text-left text-xs text-red">{formErrors.addressLine1}</Text>
      </View>

      <View style={{width:windowWidth*0.85}} className="flex w-full justify-center  my-2">
      <InputFeild width={windowWidth*0.85} handleChange={(text)=>handleInputChange('addressLine2',text)} name="addressLine2" keyboardType='default' placeHolder='Address Line Two'/>
      <Text className="text-left text-xs text-red">{formErrors.addressLine2}</Text>
      </View>


      <View className="flex flex-row justify-between" style={{width:windowWidth*0.85}}>
      <View  className="flex justify-center  my-2">
      <InputFeild width={windowWidth*0.41} handleChange={(text)=>handleInputChange('city',text)} name="city" keyboardType='default' placeHolder='City'/>
      <Text className="text-left text-xs text-red">{formErrors.city}</Text>
      </View>

      <View  className="flex justify-center  my-2">
      <InputFeild width={windowWidth*0.41} handleChange={(text)=>handleInputChange('state',text)} name="state" keyboardType='default' placeHolder='State'/>
      <Text className="text-left text-xs text-red">{formErrors.state}</Text>
      </View>
      </View>

      <View className="flex flex-row justify-between" style={{width:windowWidth*0.85}}>
      <View  className="flex justify-center  my-2">
      <InputFeild width={windowWidth*0.41} handleChange={(text)=>handleInputChange('pinCode',text)} name="pinCode" keyboardType='numeric' placeHolder='Pin Code'/>
      <Text className="text-left text-xs text-red">{formErrors.pinCode}</Text>
      </View>

      <View  className="flex justify-center  my-2">
      <InputFeild width={windowWidth*0.41} handleChange={(text)=>handleInputChange('mobileNo',text)} name="mobileNo" keyboardType='numeric' placeHolder='Phone Number'/>
      <Text className="text-left text-xs text-red">{formErrors.mobileNo}</Text>
      </View>
      </View>


      </View>

      <View className="mt-6">
      {/* <CustomButton  text={"Use My Location"} width={width*0.8} ></CustomButton> */}
      
      
      <CustomButton text={"Save Address"} width={width*0.9} handlePress={handleSubmit} isLoading={isLoading}/>
      </View>
      
    </View>
  )
}


export default AddAddress