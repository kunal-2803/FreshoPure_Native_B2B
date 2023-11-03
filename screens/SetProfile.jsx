import { View, Text,Image,Dimensions,ScrollView } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import InputFeild from '../components/InputFeild.jsx'
const bg = require('./../assets/bg-texture.png')
const profile = require('./../assets/profile.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native'

const SetProfile = () => {
  const navigation = useNavigation()

  const handlePress=()=>{
    navigation.navigate('parent')
  }

  return (
    <View className="flex" >
      <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>
      <CustomHeader title={'Profile'} backButton={true} height={0.20} headerBar={false}/>

     <View className="border-2 border-white rounded-full absolute left-1/2 top-20 z-10" style={{transform:[{translateX:-50}]}}>
     <Image source={profile} className="w-24 h-24 bg-white rounded-full border"/>
     </View>
      
    <ScrollView alwaysBounceVertical={true} className="flex" style={{height:windowHeight*0.84}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      
    <View className="flex w-full justify-center items-center my-2 mt-14">
      <InputFeild width={windowWidth*0.85} placeHolder='Full Name'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Hotel Name'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Email'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Phone Number'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Alternate Number'/>
      </View>

      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Address Line 1'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Address Line 2'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='City'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='State'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} placeHolder='Pin Code'/>
      </View>

      <View className="flex w-full justify-center items-center my-2">
      <CustomButton width={windowWidth*0.85} text={'Proceed'} handlePress={handlePress}/>
      </View>

    </ScrollView>

    </View>
  )
}

export default SetProfile