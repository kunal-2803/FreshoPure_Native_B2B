import { View, Text,TextInput } from 'react-native'
import React from 'react'

const InputFeild = ({width,placeHolder,value,keyboardType,handleChange}) => {
  return (
      <TextInput onChangeText={handleChange} placeholder={placeHolder} value={value} style={{width:width}} className="bg-lightgray border border-bordergray rounded-md p-2 w-full" keyboardType={keyboardType}/>
  )
}

export default InputFeild