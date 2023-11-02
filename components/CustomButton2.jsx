import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
const logo = require('../assets/google.png')

const CustomButton2 = () => {
  return (
    <TouchableOpacity className="bg-buttongray py-2 px-8 flex justify-center items-center rounded-md flex-row mt-3">
        <Image source={logo}/>
      <Text className="text-[#475569] ml-1">Google</Text>
    </TouchableOpacity>
  )
}

export default CustomButton2