import { View, Text, Image } from 'react-native'
import React,{useEffect} from 'react'
import * as Animatable from 'react-native-animatable';
const loading = require('./../assets/loading.png')
import { loadUser } from '../redux/slices/Mobile/index.js';
import {useDispatch} from 'react-redux'

const LoadingScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
}, []);

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.5,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <View className="flex justify-center items-center w-full h-full">
           <Animatable.View animation={zoomOut} iterationCount="infinite">
            <Image source={loading} className="w-14 h-fit" style={{resizeMode:'cover',height:82}}/>
           </Animatable.View>

    </View>
  )
}

export default LoadingScreen