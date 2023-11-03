// import { View, Text,SafeAreaView,Platform,StatusBar } from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'
// import SplashScreen1 from './SplashScreen1';
// import SplashScreen2 from './SplashScreen2';
// // import BottomNavigation from './../Main2'
// // import { ANDROID } from 'nativewind/dist/utils/selector';
// const Tab = createBottomTabNavigator();
// const Home = () => {
//     const navigation = useNavigation();
//     const x =5
//   return (
//     <>
//     <View className="flex bg-black" style={{paddingTop:Platform.OS ==='android'?StatusBar.currentHeight:0}}>
//       <SafeAreaView>
//       <Text>Hello</Text>
//       <Text onPress={()=>navigation.navigate("login")}>Login</Text>
//       {/* <BottomNavigation></BottomNavigation> */}
//       <Tab.Navigator initialRouteName='home' screenOptions={{headerShown:false}}>
//       <Tab.Screen name="home" component={Home} />
//       <Tab.Screen name="splashScreen1" component={SplashScreen1} />
//       <Tab.Screen name="splashScreen2" component={SplashScreen2} />
//     </Tab.Navigator>
//       </SafeAreaView>
//     </View>
//     </>
//   )
// }

// export default Home

import { View, Text ,FlatList, Dimensions,Image,StatusBar,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
const bg = require('./../assets/bg-texture.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const apple = require('./../assets/apple.png')
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useDispatch,useSelector} from 'react-redux'
import {fetchItems} from '../redux/slices/HotelItems/index.js'
import { addToWishlist } from '../redux/slices/Wishlist/index.js'

const Home = () => {
  const [selectedCategory,setSelectedCategory] = useState('All')
  const {data,isLoading,isError} = useSelector(state=>state.hotelItems)
  const dispatch = useDispatch()

  

  useEffect(()=>{
   dispatch(fetchItems())
  },[])


  return (
    <>
    <View className="flex">
    <CustomHeader title={'Profile'} backButton={true} height={0.18} headerBar={true}/>
    <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>

    {/* filter list */}
    <View className="my-2 flex">
    <Text className="my-2 mx-2 font-semibold text-xl">Categories</Text>
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row">
        <TouchableOpacity onPress={()=>setSelectedCategory('All')}  className={`mx-1 bg-${selectedCategory === 'All' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'All' ? '#fff' : '#000'}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Local Vegetables')} className={`mx-1 bg-${selectedCategory === 'Local Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Local Vegetables' ? '#fff' : '#000'}}>Local Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Frozen Vegetables')}  className={`mx-1 bg-${selectedCategory === 'Frozen Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Frozen Vegetables' ? '#fff' : '#000'}}>Frozen Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Exotic Vegetables')}  className={`mx-1 bg-${selectedCategory === 'Exotic Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Exotic Vegetables' ? '#fff' : '#000'}}>Exotic Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Local & Imported Fruits')}  className={`mx-1 bg-${selectedCategory === 'Local & Imported Fruits' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Local & Imported Fruits' ? '#fff' : '#000'}}>Local & Imported Fruits</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>


        {/* item list */}
         <SafeAreaView style={{height:windowHeight*0.6}} className="flex justify-center items-center w-full">

         <FlatList
         className = ""
         style={{width:windowWidth*0.9}}
         data={data?.hotelItems?.items}
         renderItem={item=><ItemList item={item?.item}/>}
         keyExtractor={item => item._id}
    />
         {/* <ScrollView className="flex" style={{width:windowWidth*0.90}}>
          <ItemList/>
          </ScrollView> */}
         </SafeAreaView>
    

    </View>
    </>
  )
}

const ItemList = ({item})=>{
  const dispatch = useDispatch()
  function func(img) {
    let image = img.substr(12)
    const retImage = 'https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com' + image
    
    return retImage
  }
    return(
    <View  className=" h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           width:windowWidth*0.9,
           elevation: 6}}>
            <View className="flex flex-row items-center">
              <Image source={{uri:func(item?.image)}} className="w-10 h-10"></Image>
              <Text className="font-semibold ml-2 capitalize">{item?.itemName}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Ionicons name="heart-outline" size={24} onPress={()=>dispatch(addToWishlist(item?._id))} />
              <TouchableOpacity className="flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4"><Text className="text-green uppercase">Add</Text></TouchableOpacity>
            </View>
          </View>
          
  )
}

export default Home