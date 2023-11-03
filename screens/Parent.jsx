import { View, Text ,SafeAreaView,Platform,StatusBar,Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import WishList from './WishList';
import Accounts from './Accounts';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ios = Platform.OS == 'ios';
const Tab = createBottomTabNavigator();

const Parent = () => {
  return (
    <View  className="flex-1" style={{paddingTop:Platform.OS ==='android'?StatusBar.currentHeight:0}}>
      <Tab.Navigator initialRouteName='home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,        
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          height: 55,
          alignItems: 'center',
          position:'absolute',
          bottom:0,
          borderTopRightRadius:20,
          borderTopLeftRadius:20,
          width:windowWidth,
          backgroundColor: '#54B175',
        },
        tabBarItemStyle: {
          marginTop: ios? 30: 0,
          
        }
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="cart" component={Cart} />
      <Tab.Screen name="wishList" component={WishList} />
      <Tab.Screen name="accounts" component={Accounts} />
    </Tab.Navigator>
    </View>
  )
}

const menuIcons = (route, focused)=> {
  let icon;
  

  if (route.name === 'home') {
    icon =  focused? <Icon name="home" size={25} color={'#54B175'} /> : <Icon name="home-outline" size={25} color='#fff'/>
  } else if (route.name === 'accounts') {
    icon =  focused? <FontAwesome name="user" size={25} color={'#54B175'} /> : <FontAwesome name="user-o" size={25} color='#fff' />
  }else if(route.name==='cart'){
    icon =  focused? <Icon name="cart" size={25} color={'#54B175'} /> : <Icon name="cart-outline" size={25} color='#fff'/>
  }else if(route.name==='wishList'){
    icon =  focused? <Icon name="heart-sharp" size={25} color={'#54B175'} /> : <Icon name="heart-outline" size={25} color='#fff'/>
  }

  
  return (
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:360,padding:10,width:45,height:45,backgroundColor:focused ? '#fff' : '' }}>
      {route.name === 'cart' &&  <View style={{position:'absolute',right:0,top:5,backgroundColor:'red',width:15,height:15,zIndex:10,justifyContent:'center',alignItems:'center',borderRadius:360}}><Text style={{color:'#fff',fontSize:8}}>2</Text></View>}
      {route.name === 'wishList' && <View style={{position:'absolute',right:0,top:5,backgroundColor:'red',width:15,height:15,zIndex:10,justifyContent:'center',alignItems:'center',borderRadius:360}}><Text style={{color:'#fff',fontSize:8}}>2</Text></View>}
      {icon}
    </View>
  )
}

export default Parent