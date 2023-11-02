import { View, Text, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SplashScreen1 = () => {

  return (
    <View className=" flex items-center justify-center ">

      <View style={{width:width*0.9 ,marginTop:height*0.16}} className="items-center" >
        <LottieView
          source={require('../assets/screen1.json')}
          autoPlay
          loop
          style={{  height: 260 }}
        />
      </View>
      <Text className="font-bold text-xl mt-5"># Fresh Food for Fresh Moments</Text>
      <Text className="text-center mt-3 font-semibold">Dont Need to get out side {'\n'}everyday for your grocery items</Text>



    </View>
  )
}

export default SplashScreen1