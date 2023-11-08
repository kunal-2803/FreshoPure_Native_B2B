import { View, Text , Dimensions,Image,StatusBar,ScrollView,TouchableOpacity,SafeAreaView, FlatList} from 'react-native'
import React,{useState, useEffect } from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
import SkeletonComponent from '../components/SkeletonComponent.jsx'
const bg = require('./../assets/bg-texture.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const apple = require('./../assets/apple.png')
import Ionicons from 'react-native-vector-icons/Ionicons'

import {useDispatch,useSelector} from 'react-redux'
import { fetchWishlistItems,removefromWishlist } from '../redux/slices/Wishlist/index.js'
import { addToCart } from '../redux/slices/Cart/index.js'

const Wishlist = () => {
  const [selectedCategory,setSelectedCategory] = useState('All')
  const {data,isError,isLoading} = useSelector(state=>state.wishlistItems)
  const dispatch = useDispatch()
  console.log(data?.wishlistData,"wishlist")
  
  useEffect(()=>{
    dispatch(fetchWishlistItems())
   },[])

  return (
    <>
    <View className="flex">
    <CustomHeader title={'Profile'} backButton={true} height={0.18} headerBar={true} parentHeader={'wishlist'}/>
    <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>


        {/* item list */}
         <SafeAreaView style={{height:windowHeight*0.5}} className="flex justify-center items-center w-full">
         {isLoading?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            </>:

         <FlatList
         className = ""
         style={{width:windowWidth*0.9}}
         data={data?.wishlistData}
         renderItem={item=><ItemList item={item?.item}/>}
         keyExtractor={item => item._id}
    />
         }
          
          
         </SafeAreaView>
    <View className="flex justify-center items-center">
   
    </View>

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
     <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6,}}>
            <View className="flex flex-row items-center">
            <Image source={{uri:func(item?.image)}} className="w-10 h-10"></Image>
              <Text className="font-semibold ml-2">{item.itemName}</Text>
            </View>

            <View className="flex flex-row items-center">
              <Ionicons name="heart-outline" size={28} onPress={()=>dispatch(removefromWishlist(item?._id))}/>
              <TouchableOpacity className="flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4 " onPress={()=>dispatch(addToCart(item?._id))}><Text className="text-green uppercase">Add</Text></TouchableOpacity>
            </View>
          </View> 
          
  )
}

export default Wishlist