import { View, Text, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import CustomButton from '../components/CustomButton';

const SplashScreen3 = () => {

  return (
    <View className=" flex items-center justify-center ">

      <View style={{ width: width * 0.9, marginTop: height * 0.16 }} className="items-center" >
        <LottieView
          source={require('../assets/screen1.json')}
          autoPlay
          loop
          style={{ height: 260 }}
        />
      </View>
      <Text className="font-bold text-xl mt-5"><Text className="text-[#dc2626]">#</Text> Fresh Food for Fresh Moments</Text>
      <Text className="text-center mt-3 ">Dont Need to get out side {'\n'}everyday for your grocery items</Text>

      <View className="flex flex-row space-x-2 mt-24">
        <View className="w-2 h-2 bg-green rounded-full border-green border" />
        <View className="w-2 h-2  rounded-full border-green border" />
        <View className="w-2 h-2  rounded-full border-green border" />
      </View>


      <View className="mt-5">
        <CustomButton text={"Continue"} width={width * 0.8} ></CustomButton>
      </View>

    </View>
  )
}

export default SplashScreen3