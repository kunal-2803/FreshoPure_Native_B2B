import { View, Text, StyleSheet, TouchableOpacity,TextInput,Dimensions,TouchableWithoutFeedback, Keyboard,Image } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import InputFeild from '../components/InputFeild';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const bg = require('./../assets/bg-texture.png')

const AddAddress = () => {
  return (
    <View className="flex justify-center items-center">
      <Image source={bg} className="absolute" style={{height:height*1.4}} resizeMode="repeat"/>
      <CustomHeader title={'Add Address'} backButton={true} height={0.16} headerBar={false}/>
     <View className="space-y-7 mt-10">
      <View>
        
        <InputFeild width={width*0.9} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      <View>
        
        <InputFeild width={width*0.9} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      <View>
        
        <InputFeild width={width*0.9} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      
      <View className="flex-row flex justify-between space-x-4" style={{width:width*0.9}}>
      <View>
        
        <InputFeild width={width*0.43} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      <View>
        
        <InputFeild width={width*0.43} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      </View>
        
    
      <View className="flex-row flex justify-between space-x-4" style={{width:width*0.9}}>
      <View>
        
        <InputFeild width={width*0.43} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      <View>
        
        <InputFeild width={width*0.43} placeHolder={'Hemendra Mali'}></InputFeild>
      </View>
      </View>
      </View>

      <View className="mt-10">
      {/* <CustomButton  text={"Use My Location"} width={width*0.8} ></CustomButton> */}
      
      <View className="flex items-center w-full my-4">
      <TouchableOpacity style={{width:width*0.9}} className="flex justify-center items-center bg-white border border-lightText rounded-lg flex-row py-2 mx-auto">
      <MaterialIcons name="my-location" size={20} className="item-center px-3" color={'#64748B'}/>
      <Text  className="flex items-center justify-center text-lightText ml-1">Use My Location</Text>
      </TouchableOpacity>

      </View>
      
      <CustomButton text={"Save Address"} width={width*0.9}></CustomButton>
      </View>
      
    </View>
  )
}


export default AddAddress