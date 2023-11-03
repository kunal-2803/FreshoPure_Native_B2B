import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
const images = require("./../assets/logins.png");
const logo = require("../assets/logo.png");
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import InputFeild from "../components/InputFeild.jsx";
import CustomButton from "../components/CustomButton.jsx";
import CustomButton2 from "../components/CustomButton2.jsx";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

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
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      updatedOtp[index] = value;
      return updatedOtp;
    });

    if (value !== "" && index < 5) {
      otpInputs[index + 1].focus();
    }
  };

  // Array to store references to each OTP input field
  const otpInputs = [];

  const handleSendOTP = () => {
    setTimer(60);
  };

  return (
    <View className="flex flex-1 bg-white">
      
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
              ref={(ref) => (otpInputs[index] = ref)}
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

        <CustomButton text="Verify" width={windowWidth * 0.8} />
      </View>
      
    </View>
  );
};

export default OtpVerify;
