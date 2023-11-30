import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LoadingScreen from '../components/LoadingScreen.js';
import {useDispatch,useSelector} from 'react-redux'
import { loadUser } from '../redux/slices/Mobile/index.js';
import {useNavigation} from  '@react-navigation/native'
import {getProfile} from '../redux/slices/UserProfile/index.js'

const SplashScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

  useEffect(()=>{
    dispatch(loadUser())
    dispatch(getProfile())

  },[])


  return (
    <View className="flex">
      <LoadingScreen/>
    </View>
  )
}

export default SplashScreen