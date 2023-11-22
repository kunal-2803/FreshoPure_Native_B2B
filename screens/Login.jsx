import { View, Text ,Image,StatusBar,Dimensions ,KeyboardAvoidingView,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const images = require('./../assets/logins.png')
const logo = require('../assets/logo.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import InputFeild from '../components/InputFeild.jsx'
import CustomButton from '../components/CustomButton.jsx'
import CustomButton2 from '../components/CustomButton2.jsx'
import {useNavigation} from '@react-navigation/native'

import { loginApi,clearData } from '../redux/slices/Mobile/index.js';
import { useDispatch, useSelector } from 'react-redux';



const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const {isLoading,isError,data,isSuccess} = useSelector(state=>state.mobile)


  const [mobileNo, setmobileNo] = useState('');
  const [error,setError] = useState('')

  const onChangeText = (text)=>{
    // console.log(text)
    setmobileNo(text);
  }

  const handlePress=async()=>{
    if (validateForm()) {
    dispatch(loginApi({mobile:'91'+mobileNo}));
    }
  }

  useEffect(()=>{

    if(isError){
      console.log('something went wrong login')
      dispatch(clearData())
    }
    if(isSuccess){
      navigation.navigate('otp',{data:'91'+mobileNo})
      dispatch(clearData())
    }

  },[dispatch,isError,isSuccess])


  const validateForm = () => {
    let isValid = true;
    let newErrors = '';

    if (mobileNo.trim() === '') {
      newErrors = '*Mobile Number is required';
      isValid = false;
    }else if(mobileNo.length !== 10){
      newErrors = '*Mobile Number must be of 10 digits';
      isValid = false;
    }else if(!/^[1-9]\d{9}$/.test(mobileNo)){
      newErrors = '*Please enter a valid Mobile Number'
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  }

  

  return (
    <KeyboardAvoidingView behavior='position' className ="flex flex-1 bg-white">
      {/* <Text>Login</Text> */}
      <StatusBar
        barStyle = "light-content" hidden = {false} backgroundColor = "transparent" translucent = {true}
      />
      <Image source={images} resizeMode="cover" style={{width:windowWidth,height:windowHeight*0.43}} className="justify-center"/>
      <View className="flex justify-center items-center w-full">
        <Image source={logo} style={{ height:windowHeight*0.15, width:windowWidth*0.5 }} className="border-x"/>
        <View style={{width:windowWidth*0.5,height:1}} className="bg-linegray"></View>
        <Text className="font-bold text-2xl text-brown mt-2">Login <Text className="font-bold text-2xl" style={{color:'#000'}}>or</Text> Sign Up</Text>
      </View>
      <View style={{width:windowWidth}} className="flex justify-center items-center my-4">

        <View>
        <View className="bg-lightgray border border-bordergray rounded-md p-2 w-full flex flex-row items-center" style={{width:windowWidth*0.8}} >
          <Text className="pr-1">+91</Text>
        <TextInput onChangeText={(text)=>onChangeText(text)} keyboardType='phone-pad' maxLength={10} placeholder='Phone Number' value={mobileNo} className="border-l border-bordergray w-full pl-2" />
        </View>
       {error && <Text className="text-left text-xs text-red my-1 mx-1">{error}</Text>}
        </View>


        
        <Text className="my-2 font-urban">By continuing, I agree to the <Text className="font-semibold text-brown">Terms of Use</Text>{'\n'} & <Text className="font-semibold text-brown">Privacy Policy</Text></Text>
        <CustomButton text="Login" width={windowWidth*0.8}  handlePress={handlePress} isLoading={isLoading}/>
          <Text className="text-lightText">or continue with</Text>
          <CustomButton2 width={windowWidth*0.8}/>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login