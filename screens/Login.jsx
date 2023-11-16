import { View, Text ,Image,StatusBar,Dimensions ,KeyboardAvoidingView} from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const images = require('./../assets/logins.png')
const logo = require('../assets/logo.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import InputFeild from '../components/InputFeild.jsx'
import CustomButton from '../components/CustomButton.jsx'
import CustomButton2 from '../components/CustomButton2.jsx'
import {useNavigation} from '@react-navigation/native'

import { loginApi } from '../redux/slices/Mobile/index.js';
import { useDispatch } from 'react-redux';



const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState(null);
 
  const saveData =async ()=>{
    try{
      await AsyncStorage.setItem('MobileNo',mobile);
      console.log("saved")
    }catch(error){

    }
  }

  const onChangeText = (text)=>{
    // console.log(text)
    setMobile(text);
  }

  const handlePress=()=>{
    dispatch(loginApi(mobile));
    saveData();
    navigation.navigate('otp')
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
        <InputFeild width={windowWidth*0.8} value={mobile} onChangeText={(text)=>onChangeText(text)}/>
        <Text className="my-2 font-urban">By continuing, I agree to the <Text className="font-semibold text-brown">Terms of Use</Text>{'\n'} & <Text className="font-semibold text-brown">Privacy Policy</Text></Text>
        <CustomButton text="Login" width={windowWidth*0.8}  handlePress={handlePress}/>
          <Text className="text-lightText">or continue with</Text>
          <CustomButton2 width={windowWidth*0.8}/>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login