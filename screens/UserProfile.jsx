import { View, Text,Image,Dimensions,ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import InputFeild from '../components/InputFeild.jsx'
const bg = require('./../assets/bg-texture.png')
const profile = require('./../assets/profile.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile} from '../redux/slices/UserProfile/index.js'


const UserProfile = () => {
  const navigation = useNavigation()
  const {data} = useSelector(state=>state.profile)
  const dispatch = useDispatch()

  const user = data?.hotelData;


  const [profileData,setProfileData] = useState({fullName:user?.fullName,hotelName:user?.hotelName,email:user?.email,mobileNo:user?.mobileNo,alternateMobileNo:user?.alternateMobileNo})

  const handlePress=()=>{
    navigation.navigate('parent')
  }


  useEffect(()=>{
   dispatch(getProfile())
  },[])

  return (
    <View className="flex" >
      <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>
      <CustomHeader title={'Update Profile'} backButton={true} height={0.20} headerBar={false}/>

     <View className="border-2 border-white rounded-full absolute left-1/2 top-20 z-10" style={{transform:[{translateX:-50}]}}>
     <Image source={profile} className="w-24 h-24 bg-white rounded-full border"/>
     </View>
      
    <ScrollView alwaysBounceVertical={true} className="flex" style={{height:windowHeight*0.84}} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      
    <View className="flex w-full justify-center items-center my-2 mt-14">
      <InputFeild width={windowWidth*0.85} keyboardType='default' value={profileData?.fullName} placeHolder='Full Name'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='default' value={profileData?.hotelName} placeHolder='Hotel Name'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='email-address' value={profileData?.email} placeHolder='Email'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='number-pad' value={profileData?.mobileNo} placeHolder='Phone Number'/>
      </View>
      <View className="flex w-full justify-center items-center my-2">
      <InputFeild width={windowWidth*0.85} keyboardType='number-pad' value={profileData?.alternateMobileNo} placeHolder='Alternate Number'/>
      </View>
 
      <View className="flex w-full justify-center items-center my-2">
      <CustomButton width={windowWidth*0.85} text={'Update'} handlePress={handlePress} isLoading={false}/>
      </View>

    </ScrollView>

    </View>
  )
}

export default UserProfile