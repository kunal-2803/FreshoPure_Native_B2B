import { View, Text ,SafeAreaView,Platform,StatusBar} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native'
import Home from './Home';
import SplashScreen2 from './SplashScreen2';
const Tab = createBottomTabNavigator();

const SplashScreen1 = () => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={{paddingTop:Platform.OS ==='android'?StatusBar.currentHeight:0}}>
      <SafeAreaView>
      <Text className="bg-red">SplashScreen 1</Text>
      <Text className="mt-10" onPress={()=>navigation.navigate("splashScreen2")}>Login</Text>
        {/* <BottomNavigation></BottomNavigation> */}
        {/* <Tab.Navigator initialRouteName='splashScreen1' screenOptions={{headerShown:false}}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="splashScreen2" component={SplashScreen2} />
    </Tab.Navigator> */}
      </SafeAreaView>
    </View>
    {/* <Text>Hello</Text> */}
    </View>
  )
}

export default SplashScreen1