import { View, Text ,Dimensions,StatusBar,TouchableOpacity,Image,TextInput} from 'react-native'
const Avatar = require('./../assets/Avatar.png')
const notification = require('./../assets/notification.png')
import React,{useEffect,useState} from 'react'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BackIcon from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'
import { selectedAddress } from "../redux/slices/Address/index.js";
import { useDispatch, useSelector } from "react-redux";
import SkeletonComponent from '../components/SkeletonComponent.jsx'
import {getProfile} from '../redux/slices/UserProfile/index.js'
import useNetworkStatus from '../utils/useNetworkStatus.js'

const CustomHeader = ({title,backButton,height,headerBar,parentHeader,isSearchBar,setSearchQuery,searchQuery}) => {
  const navigation = useNavigation()
  const [greeting, setGreeting] = useState('');
  const isConnected = useNetworkStatus()

  const dispatch = useDispatch();
  const { isLoading,selected, isError } = useSelector(
    (state) => state.address
  );
  const {data} = useSelector(state=>state.profile)
  const user = data?.hotelData;
  // const userImage = data?.image

  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    getCurrentGreeting();
  }, []);

  useEffect(() => {
    {isConnected &&dispatch(selectedAddress());}
    {isConnected && dispatch(getProfile())}
  }, [dispatch]);

  return (
    <View style={{width:windowWidth,minHeight:windowHeight*height}} className={`bg-green rounded-b-3xl flex flex-row z-10 ${isSearchBar ? 'mb-6':'' }`}>
     <StatusBar
        barStyle = "light-content" backgroundColor = "#54B175" translucent = {true}
      />
      {!headerBar && <View className="flex flex-row justify-center items-start w-full text-white relative mt-10">
      {backButton === true && <TouchableOpacity className="absolute left-4" onPress={()=>navigation.goBack()}>
      <BackIcon name="chevron-back" size={30} color="#fff"/>
      </TouchableOpacity>}
      <Text className="text-white text-xl ">{title}</Text>
      </View>}
      {headerBar && <View className="w-full flex items-center">
        <View style={{width:windowWidth*0.9}} className="bg-white mt-4 h-12 rounded-lg flex flex-row items-center justify-between px-2">
          <Image source={{
          uri: user.image,
        }} className=" w-8 h-8 rounded-full"/>
          <View className="flex items-center flex-row justify-center">
            
            {isLoading ? <SkeletonComponent width={windowWidth*0.5} height={windowHeight*0.04}/> :<><EvilIcons name="location" size={24}/><Text className="flex items-center">{selected?.address?.city + ',' + selected?.address?.state}</Text></>}
          </View>
          <EvilIcons name="bell" size={32}/> 
          </View>
          {parentHeader && <Text className="text-white font-semibold text-2xl capitalize mt-4">{parentHeader}</Text>}
          {isSearchBar && <View className="w-full flex items-center h-fit absolute -bottom-6">
            <View width={windowWidth*0.9} className="my-2">
            <Text className="text-white text-lg font-extralight">{greeting},</Text>
            <Text className="text-white text-2xl font-semibold capitalize">{user?.fullName}</Text>
            </View>

            <View width={windowWidth*0.9} className="flex flex-row justify-between">
            <View className="bg-white h-12 rounded-xl flex flex-row items-center p-2" width={windowWidth*0.7}>
              <EvilIcons name="search" size={26} className="border " color="#64748B"/>
              <TextInput placeholder="Search for Items" className="text-lightText outline-none w-full ml-2" value={searchQuery} onChangeText={(text)=>setSearchQuery(text)}/>
            </View>
            {/* <View className="bg-white h-12 rounded-xl flex justify-center items-center" width={windowWidth*0.13}><FontAwesome name="sliders" size={20} color="#64748B"/></View> */}
            </View>


          </View>}
      </View>
      }
     
    </View>
  )
}

export default CustomHeader