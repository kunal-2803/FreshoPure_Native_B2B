import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({text,width,handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{width:width}} className="bg-green p-4 rounded-md flex justify-center items-center my-2">
      <Text className="text-white">{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton