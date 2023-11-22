import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import ButtonLoader from './ButtonLoader.js'

const CustomButton = ({text,width,handlePress,isLoading}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress} style={{width:width}} className="bg-green p-4 rounded-md flex justify-center items-center my-2">
      {isLoading ? <ButtonLoader color="#fff"/> : <Text className="text-white">{text}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton