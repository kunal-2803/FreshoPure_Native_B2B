import { View, Text ,ImageBackground} from 'react-native'
import React from 'react'
const images = require('./../assets/logins.png')
const image ="https://freshopure.com/static/media/landing.b3648d9d0ec67a032d2d.jpg"

const Login = () => {
  return (
    <View className ="flex flex-1">
      {/* <Text>Login</Text> */}
      <View className=" flex-1">
      <ImageBackground source={images} resizeMode="stretch" className="justify-center flex-1 w-100 h-100" ></ImageBackground>
      </View>
      <View className="bg-green-50 flex-1"><Text>Fresh O Pure Business</Text></View>
      <View className="bg-orange-500 "><Text>1</Text></View>
      <View className="bg-orange-100 "><Text>By continuing, I agree to the Terms of Use
& Privacy Policy</Text></View>
      <View className="bg-orange-200 "><Text>1</Text></View>
    </View>
  )
}

export default Login