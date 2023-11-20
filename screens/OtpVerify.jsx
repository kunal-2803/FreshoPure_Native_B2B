import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { otpVerify } from "../redux/slices/Mobile/index.js";

const OtpVerify = () => {
  const dispatch = useDispatch();
  // const mobNo = useSelector((state) => state.mobile)
  const route = useRoute();
  const mobile = route?.params?.data; 
  

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  // console.log(otp.join("").toString(),'otp')

  const navigation = useNavigation()



  const handlePress =async () => {
    let Otp =await otp.join("")

    console.log(mobile,Otp)
    
    dispatch(otpVerify({mobile:mobile,otpRec:Otp}))
    // navigation.navigate('setProfile')
  }

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  


  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      this.inputs[index + 1].focus();
    }
  };
  const inputs = [];

  const handleSendOTP = () => {
    setTimer(60);
  };

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
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              style={{
                borderBottomColor: "#000",
                borderBottomWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 8,
                marginHorizontal: 10,
                backgroundColor: "#fff",
                textAlign: "center",
                fontSize: 16,
                width: 40,
              }}
              onChangeText={(value) => handleOtpChange(value, index)}
              value={otp[index] || ""}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (inputs[index] = ref)}
            />
          ))}
        </View>

        <View className="flex flex-row my-2">
          <Text className=" text-lightText flex items-center justify-center">
            Trying to autofill OTP in:{" "}
          </Text>
          {timer > 0 ? (
            <Text>{`${timer} seconds`}</Text>
          ) : (
            <TouchableOpacity onPress={handleSendOTP}>
              <Text className="font-semibold">Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton text="Verify" width={windowWidth * 0.8} handlePress={handlePress} />
      </View>

    </KeyboardAvoidingView>
  );
};

export default OtpVerify;
