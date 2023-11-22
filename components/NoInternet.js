import { View, Text,Image } from 'react-native'
import React from 'react'
const Internet = require('./../assets/NoInternet.png')

const NoInternet = () => {
  return (
    <View className="flex justify-center items-center">
      <Image source={Internet} />
    </View>
  )
}

export default NoInternet