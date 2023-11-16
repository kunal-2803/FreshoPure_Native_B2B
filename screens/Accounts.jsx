import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomHeader from '../components/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import {getProfile} from '../redux/slices/UserProfile/index.js'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {useNavigation} from '@react-navigation/native'
const profile = require('./../assets/profile.png')
const bg = require('./../assets/bg-texture.png')
import {useDispatch,useSelector} from 'react-redux'

const Accounts = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {data} = useSelector(state=>state.profile)


  useEffect(()=>{
   dispatch(getProfile())
  },[dispatch])

  async function handleLogout(){
    await AsyncStorage.removeItem('token');
    // navigation.navigate('login')
  }


  return (
    <View>
    <CustomHeader backButton={false} height={0.14} headerBar={false}/>

    <View className="border-2 border-white rounded-full absolute left-1/2 top-10 z-10" style={{transform:[{translateX:-50}]}}>
    <Image source={profile} className="w-24 h-24 bg-white rounded-full border"/>
    </View>

      <Image source={bg} className="absolute" style={{ height: height * 1.4 }} resizeMode="repeat" />

      <View className="mt-12 items-center space-y-2">
        <Text className="font-bold text-xl capitalize">{data?.hotelData?.fullName}</Text>
        <Text className="font-light capitalize">{data?.hotelData?.email}</Text>
        <Text className="font-light capitalize">{data?.hotelData?.hotelName}</Text>
      </View>

      <ScrollView style={{ height: height * 0.47, width: width * 0.86 }} showsVerticalScrollIndicator={false} className=" mt-12 space-y-3  mx-auto">
        <TouchableOpacity onPress={()=>navigation.navigate('userProfile')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <FontAwesome name='user' size={24} />
              </View>
              <Text className="ml-4 ">Personal details</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('orderHistory')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <Ionicons name='download' size={24} />
              </View>
              <Text className="ml-4 ">Orders</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('address')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <Ionicons name='location-sharp' size={24} />
              </View>
              <Text className="ml-4 ">Address</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>navigation.navigate('analytics')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white  w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <FontAwesome name='gear' size={24} />
              </View>
              <Text className="ml-4 ">Analytics</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={()=>navigation.navigate('address')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <FontAwesome name='credit-card' size={22} />
              </View>
              <Text className="ml-4 ">Payment details</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={()=>navigation.navigate('faq')}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <MaterialCommunityIcons name='chat-question' size={24} />
              </View>
              <Text className="ml-4 ">FAQ</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{handleLogout()}}>
          <View className="flex flex-row   items-center justify-between">
            <View className="flex flex-row  items-center">
              <View className="rounded-md shadow-md  bg-white w-10 items-center" style={[styles.shadowProp, styles.space]}>
                <MaterialCommunityIcons name='logout' size={24} />
              </View>
              <Text className="ml-4 ">Log Out</Text>
            </View>
            <View className="mr-0">
              <MaterialIcons name='keyboard-arrow-right' size={24} />
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height:5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  space: {
    padding: 5,
    paddingHorizontal: 8
  }

})

export default Accounts