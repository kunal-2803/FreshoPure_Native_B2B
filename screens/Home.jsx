import { View, Text, FlatList, Dimensions, Image, StatusBar, ScrollView, TouchableOpacity, SafeAreaView,RefreshControl,KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect,useRef,useMemo,useCallback } from 'react'

import CustomHeader from '../components/CustomHeader.jsx'
import SkeletonComponent from '../components/SkeletonComponent.jsx'
import BottomSheet from '../components/BottomSheet.js'

const bg = require('./../assets/bg-texture.png')
const apple = require('./../assets/apple.png')
const NoItems = require('./../assets/NoItems.png')

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import ButtonLoader from '../components/ButtonLoader.js'

import Ionicons from 'react-native-vector-icons/Ionicons'
import useNetworkStatus from '../utils/useNetworkStatus.js'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../redux/slices/HotelItems/index.js'
import { addToWishlist ,fetchWishlistItems,removefromWishlist} from '../redux/slices/Wishlist/index.js'
import { addToCart,fetchCartItems } from '../redux/slices/Cart/index.js'
import NoInternet from '../components/NoInternet.js'

const Home = () => {
  const isConnected = useNetworkStatus()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const {data,isLoading,isError} = useSelector(state=>state.hotelItems)
  const {addLoading} = useSelector(state=>state.cartItems)
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery,setSearchQuery] = useState('')
  const [filteredByCategory,setFilterByCategory] = useState(data?.hotelItems?.items)
  const [searchItems,setSearchItems] = useState(filteredByCategory)
  const [filteredData,setFilteredData] = useState([])
  const extraData={'data':"value"}
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  const dispatch = useDispatch()

  const onRefresh = useCallback(async()=>{
    setRefreshing(true)
    {isConnected && dispatch(fetchItems()); dispatch(fetchCartItems()); dispatch(fetchWishlistItems()) }
    setRefreshing(false)
    },[refreshing,dispatch])

  useEffect(()=>{
    {isConnected &&  dispatch(fetchCartItems())}
    {isConnected &&  dispatch(fetchWishlistItems())}
  },[dispatch])


  useEffect(() => {
    {isConnected &&  dispatch(fetchItems())}

    if(data === 'undefined'){
      {isConnected &&  dispatch(fetchItems())}
    }
  }, [])


  // useEffect(() => {
  //   if(selectedCategory === 'All' ){
  //     setFilterByCategory(data?.hotelItems?.items)
  //   }else{
  //     const filtered = data?.hotelItems?.items?.filter(product => product.category === selectedCategory);
  //     setFilterByCategory(filtered);
  //   }
 
  // }, [selectedCategory]);


  // useEffect(()=>{

  //   if(searchQuery?.length === 0){
  //     setSearchItems(filteredByCategory)
  //   }else{
  //     let searchItemsData = filteredByCategory?.filter(item=> item.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
  //     setSearchItems(searchItemsData)
  //   }

  // },[searchQuery])

  const filteredItems = data?.hotelItems?.items?.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const searchMatch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });




  return (
    <>
      <KeyboardAvoidingView className="flex">
      <StatusBar
        barStyle = "light-content" backgroundColor = "#54B175" translucent = {true}
      />
        <CustomHeader title={'Profile'} backButton={true} height={0.24} headerBar={true} isSearchBar={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <Image source={bg} className="absolute" style={{ height: windowHeight * 1.4 }} resizeMode="repeat" />

        {/* filter list */}
        <View className="my-2 flex">
          <Text className="my-2 mx-2 font-semibold text-xl">Categories</Text>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex flex-row">
              <TouchableOpacity onPress={() => setSelectedCategory('All')} className={`mx-1 bg-${selectedCategory === 'All' ? 'green' : 'white'} flex items-start px-4 py-1 rounded-xl`}>
                <Text style={{ color: selectedCategory === 'All' ? '#fff' : '#000' }}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory('Local Vegetables')} className={`mx-1 bg-${selectedCategory === 'Local Vegetables' ? 'green' : 'white'} flex items-start px-4 py-1 rounded-xl`}>
                <Text style={{ color: selectedCategory === 'Local Vegetables' ? '#fff' : '#000' }}>Local Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory('Frozen Vegetables')} className={`mx-1 bg-${selectedCategory === 'Frozen Vegetables' ? 'green' : 'white'} flex items-start px-4 py-1 rounded-xl`}>
                <Text style={{ color: selectedCategory === 'Frozen Vegetables' ? '#fff' : '#000' }}>Frozen Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory('Exotic Vegetables')} className={`mx-1 bg-${selectedCategory === 'Exotic Vegetables' ? 'green' : 'white'} flex items-start px-4 py-1 rounded-xl`}>
                <Text style={{ color: selectedCategory === 'Exotic Vegetables' ? '#fff' : '#000' }}>Exotic Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCategory('Local & Imported Fruits')} className={`mx-1 bg-${selectedCategory === 'Local & Imported Fruits' ? 'green' : 'white'} flex items-start px-4 py-1 rounded-xl`}>
                <Text style={{ color: selectedCategory === 'Local & Imported Fruits' ? '#fff' : '#000' }}>Local & Imported Fruits</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>


        {/* item list */}
        <SafeAreaView style={{ height: windowHeight * 0.52 }} className="flex items-center w-full">
        {isLoading ?
            <>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            <SkeletonComponent width={windowWidth*0.9} height={windowHeight*0.08}/>
            </>:
           ( isConnected) ? (filteredItems?.length > 0 ? <FlatList
            className=""
            style={{ width: windowWidth * 0.9,marginBottom:60 }}
            data={filteredItems}
            renderItem={item => <ItemList item={item?.item} loading={addLoading} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator ={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh} 
              // colors={[themeColors.bgMid]} 
              // tintColor={themeColors.bgMid} 
              />
            }
            extraData={[extraData]}
          /> : <View className="flex h-fit justify-center mt-12 items-center text-center"><Image source={NoItems} style={{width:windowWidth*0.5,resizeMode:'contain'}}/>
          <Text className="font-semibold text-lightText">Opps! No Item Found!</Text></View>) : <NoInternet/>
        }

        </SafeAreaView>
        {/* <View className="border h-screen w-screen absolute"> */}
    {/* <BottomSheet bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} index={0}/> */}
    {/* </View> */}
      </KeyboardAvoidingView>
    </>
  )
}

const ItemList = ({ item,loading}) => {
  const dispatch = useDispatch()
  const {data} = useSelector(state=>state.cartItems)
  const wishlist = useSelector(state=>state.wishlistItems.data)
  const isConnected = useNetworkStatus()


  const handleAddToCart=(item)=>{
    {isConnected && dispatch(addToCart(item?._id))}
    {isConnected &&  dispatch(fetchItems())}

  }

  const handleAddWishlist = (item)=>{
    {isConnected && dispatch(addToWishlist(item?._id))}
      {isConnected &&  dispatch(fetchItems())}

  }

  const handleRemoveWishlist = (item)=>{
    {isConnected && dispatch(removefromWishlist(item?._id))}
      {isConnected &&  dispatch(fetchItems())}

  }


  useEffect(()=>{
    {isConnected && dispatch(fetchCartItems())}
      {isConnected && dispatch(fetchWishlistItems())}
  },[])

  function func(img) {
    let image = img.substr(12)
    const retImage = 'https://letusfarm-image-storage.s3.ap-south-1.amazonaws.com' + image

    return retImage
  }


  return (
    <>
    <View className=" h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{
      shadowColor: 'rgba(0, 0, 0,1)',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 1,
      width: windowWidth * 0.9,
      elevation: 6
    }}>
              

      <View className="flex flex-row items-center">
        <Image source={{ uri: func(item?.image) }} className="w-10 h-10"></Image>
        <Text className="font-semibold ml-2 capitalize">{item?.itemName}</Text>
      </View>

      <View className="flex flex-row items-center">
        {wishlist?.addWishlistLoading ? 'true' : wishlist?.wishlistData?.find(wishlist=>wishlist?._id === item?._id) ? <TouchableOpacity onPress={() =>handleRemoveWishlist(item)} ><Ionicons name="heart" color="#DC143C" size={24} /></TouchableOpacity> : <TouchableOpacity onPress={() => handleAddWishlist(item)} ><Ionicons name="heart-outline" size={24}/></TouchableOpacity>}
        {data?.cartData?.find(cart=> cart._id === item?._id )? <TouchableOpacity className={`flex justify-center items-center border-green bg-green border px-4 py-2 rounded-md ml-4`} ><Text className="text-white uppercase">Added</Text></TouchableOpacity>:
        <TouchableOpacity className={`flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4`} onPress={() =>handleAddToCart(item)}><Text className="text-green uppercase">{loading ? <ButtonLoader color="#54B175"/> : 'Add'}</Text></TouchableOpacity>}
      </View>
    </View>
   
    </>

  )
}
 

export default Home