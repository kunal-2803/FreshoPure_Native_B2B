import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import React, { useState, useEffect, useMemo,useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPTextInput from 'react-native-otp-textinput';
import { StackActions } from '@react-navigation/native'
const images = require("./../assets/logins.png");
const logo = require("../assets/logo.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import InputFeild from "../components/InputFeild.jsx";
import CustomButton from "../components/CustomButton.jsx";
import CustomButton2 from "../components/CustomButton2.jsx";
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { otpVerify,clearData,loadUser,resendOtp } from "../redux/slices/Mobile/index.js";

const OtpVerify = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const mobile = route?.params?.data; 
  const {isSuccess,isLoading} = useSelector(state=>state.mobile)
  const [seconds, setSeconds] = useState(59);


  const [otp, setOtp] = useState("");
 

  const navigation = useNavigation();

  const handlePress = async () => {
    dispatch(otpVerify({ mobile: mobile, otpRec: otp }));
  };

  const handleOTPChange = (otp) => {
    setOtp(otp);
  };

  const handleSendOTP = () => {
    setSeconds(59)
    dispatch(resendOtp({mobile: mobile}))
  };


  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId); // Cleanup the interval on component unmount
  }, []);



  useEffect(()=>{


    if(isSuccess){
      navigation.dispatch(
        StackActions.replace('RootNavigator')
      );
      dispatch(clearData())
    }
    if(!isSuccess){
      console.log('Incorrect Otp')
      dispatch(clearData())
    }

  },[isSuccess,dispatch])

  const formattedTime = useMemo(() => {
    const formattedSeconds = String(seconds % 60).padStart(2, '0');
    return formattedSeconds;
  }, [seconds]);



  return (
    <KeyboardAvoidingView behavior="position" className="flex flex-1 bg-white">

      {/* <Text>Login</Text> */}
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={images}
        resizeMode="cover"
        style={{ width: windowWidth, height: windowHeight * 0.43 }}
        className="justify-center"
      />
      <View className="flex justify-center items-center w-full">
        <Image
          source={logo}
          style={{ height: windowHeight * 0.15, width: windowWidth * 0.5 }}
          className="border-x"
        />
        <View
          style={{ width: windowWidth * 0.5, height: 1 }}
          className="bg-linegray"
        ></View>
        <Text className="font-bold text-2xl text-brown mt-2">
          OTP Verification
        </Text>
        <View
          style={{ width: windowWidth * 0.8 }}
          className="flex justify-center items-center"
        >
          <Text className="my-2 font-urban text-lightText">
            Enter the verification code we just sent on your Phone Number..
          </Text>
        </View>
      </View>
      <View
        style={{ width: windowWidth }}
        className="flex justify-center items-center my-4"
      >
        {/* otp feild */}

        <View className="flex flex-row mb-4">
        <OTPTextInput
        handleTextChange={handleOTPChange}
        inputCount={4} // Specify the number of OTP digits
        keyboardType="numeric"
        offTintColor='#88653E'
        textInputStyle={{ borderBottomWidth: 1, color:'#000' }} 
      />
        </View>

        <View className="flex flex-row my-2">
          <Text className=" text-lightText flex items-center justify-center">
            Trying to autofill OTP in:{" "}
          </Text>
          {formattedTime > 0 ? (
            <Text>{`${formattedTime} seconds`}</Text>
          ) : (
            <TouchableOpacity onPress={handleSendOTP}>
              <Text className="font-semibold">Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton text="Verify" width={windowWidth * 0.8} handlePress={handlePress} isLoading={isLoading}/>
      </View>

    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
