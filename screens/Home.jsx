import { View, Text,SafeAreaView,Platform,StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SplashScreen1 from './SplashScreen1';
import SplashScreen2 from './SplashScreen2';
// import BottomNavigation from './../Main2'
// import { ANDROID } from 'nativewind/dist/utils/selector';
const Tab = createBottomTabNavigator();
const Home = () => {
    const navigation = useNavigation();
    const x =5
  return (
    <>
    <View className="flex bg-black" style={{paddingTop:Platform.OS ==='android'?StatusBar.currentHeight:0}}>
      <SafeAreaView>
      <Text>Hello</Text>
      <Text onPress={()=>navigation.navigate("login")}>Login</Text>
      {/* <BottomNavigation></BottomNavigation> */}
      <Tab.Navigator initialRouteName='home' screenOptions={{headerShown:false}}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="splashScreen1" component={SplashScreen1} />
      <Tab.Screen name="splashScreen2" component={SplashScreen2} />
    </Tab.Navigator>
      </SafeAreaView>
    </View>
    </>
  )
}

export default Home