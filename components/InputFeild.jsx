import { View, Text,TextInput } from 'react-native'
import React from 'react'

const InputFeild = ({width,placeHolder,onChangeText ,text}) => {
  return (
    text==true?<TextInput onChangeText={onChangeText} placeholder={placeHolder} style={{width:width}} className="bg-lightgray border border-bordergray rounded-md p-2 w-full"/>:
      <TextInput onChangeText={onChangeText} placeholder={placeHolder} style={{width:width}} className="bg-lightgray border border-bordergray rounded-md p-2 w-full" keyboardType="numeric"/>
  )
}

export default InputFeild