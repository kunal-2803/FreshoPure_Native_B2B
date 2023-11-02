import { View, Text ,Dimensions,StatusBar,TouchableOpacity,Image} from 'react-native'
const Avatar = require('./../assets/Avatar.png')
const notification = require('./../assets/notification.png')
import React from 'react'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import BackIcon from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const CustomHeader = ({title,backButton,height,headerBar}) => {
  return (
    <View style={{width:windowWidth,minHeight:windowHeight*height}} className="bg-green rounded-b-3xl flex flex-row">
     <StatusBar
        barStyle = "light-content" backgroundColor = "#54B175" translucent = {true}
      />
      {!headerBar && <View className="flex flex-row justify-center items-start w-full text-white relative mt-8">
      <TouchableOpacity className="absolute left-4">
      <BackIcon name="chevron-back" size={30} color="#fff"/>
      </TouchableOpacity>
      <Text className="text-white text-xl ">{title}</Text>
      </View>}
      {headerBar && <View className="w-full flex justify-center items-center">
        <View style={{width:windowWidth*0.9}} className="bg-white h-12 rounded-lg flex flex-row items-center justify-between px-2">
          <Image source={Avatar}/>
          <View className="flex items-center flex-row justify-center">
            <EvilIcons name="location" size={24}/>
            <Text className="flex items-center">Malviya Nagar, Jaipur</Text><EvilIcons name="chevron-down" size={26}/>
          </View>
          <EvilIcons name="bell" size={32}/> 
          </View>
      </View>
      }
    </View>
  )
}

export default CustomHeader