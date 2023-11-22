import { View, Text, Image } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
const loading = require('./../assets/loading.png')

const LoadingScreen = () => {
  return (
    <View className="flex justify-center items-center w-full h-full">
           <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <Image source={loading} className="w-14 h-fit" style={{resizeMode:'cover',height:82}}/>
           </Animatable.View>

    </View>
  )
}

export default LoadingScreen