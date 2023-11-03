import { View, Text , Dimensions,Image,StatusBar,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useState} from 'react'
import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'
const bg = require('./../assets/bg-texture.png')
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const apple = require('./../assets/apple.png')
import Ionicons from 'react-native-vector-icons/Ionicons'

const Wishlist = () => {
  const [selectedCategory,setSelectedCategory] = useState('All')

  return (
    <>
    <View className="flex">
    <CustomHeader title={'Profile'} backButton={true} height={0.18} headerBar={true} parentHeader={'wishlist'}/>
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
        <TouchableOpacity onPress={()=>setSelectedCategory('All')}  className={`mx-2 bg-${selectedCategory === 'All' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'All' ? '#fff' : '#000'}}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Local Vegetables')} className={`mx-2 bg-${selectedCategory === 'Local Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Local Vegetables' ? '#fff' : '#000'}}>Local Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Frozen Vegetables')}  className={`mx-2 bg-${selectedCategory === 'Frozen Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Frozen Vegetables' ? '#fff' : '#000'}}>Frozen Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Exotic Vegetables')}  className={`mx-2 bg-${selectedCategory === 'Exotic Vegetables' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Exotic Vegetables' ? '#fff' : '#000'}}>Exotic Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedCategory('Local & Imported Fruits')}  className={`mx-2 bg-${selectedCategory === 'Local & Imported Fruits' ? 'green': 'white'} flex items-start px-4 py-1 rounded-xl`}>
          <Text style={{color:selectedCategory === 'Local & Imported Fruits' ? '#fff' : '#000'}}>Local & Imported Fruits</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </View>


        {/* item list */}
         <SafeAreaView style={{height:windowHeight*0.5}} className="flex justify-center items-center w-full">
         <ScrollView className="flex" style={{width:windowWidth*0.90}}>
          <View className="w-full h-14 my-2 rounded-md flex flex-row justify-between px-2 items-center shadow-freshoxl bg-white" style={{ shadowColor: 'rgba(0, 0, 0,1)',
           shadowOffset: { width: 0, height: 10 },
           shadowOpacity: 1,
           shadowRadius: 1,
           elevation: 6,}}>
            <View className="flex flex-row items-center">
              <Image source={apple} className="w-10 h-10"></Image>
              <Text className="font-semibold ml-2">Apple</Text>
            </View>

            <View className="flex flex-row items-center">
              <Ionicons name="heart-outline" size={28} />
              <TouchableOpacity className="flex justify-center items-center border-linegray border px-4 py-2 rounded-md ml-4"><Text className="text-green uppercase">Add</Text></TouchableOpacity>
            </View>
          </View>
          
          </ScrollView>
          
         </SafeAreaView>
    <View className="flex justify-center items-center">
    <CustomButton text="Add To Cart" width={windowWidth*0.9}/>
    </View>

    </View>
    </>
  )
}

export default Wishlist