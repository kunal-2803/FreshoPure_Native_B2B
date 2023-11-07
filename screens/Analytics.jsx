import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React,{useState} from 'react'
// import PieChart from 'react-native-pie-chart'

import CustomHeader from '../components/CustomHeader.jsx'
import CustomButton from '../components/CustomButton.jsx'

import OrderHistoryComponet from '../components/OrderHistoryComponet';
// import PieChart from '../components/PieChart';
// import LineChart from '../components/LineChart';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const bg = require('./../assets/bg-texture.png')

const Analytics = () => {


    return (
        <View className="flex">
    <CustomHeader title={'Analytics'} backButton={true} height={0.14} headerBar={false}/>
    <Image source={bg} className="absolute" style={{height:windowHeight*1.4}} resizeMode="repeat"/>

    <View className="w-full flex justify-center items-center mt-2" style={{height:windowHeight*0.84}}>
    <ScrollView style={{width:windowWidth*0.9}} className="border h-full" showsVerticalScrollIndicator={false}>

        {/* <View className="flex justify-between flex-row pr-2 border h-36">

        </View> */}

        <View className="flex justify-between flex-row pr-2 border h-fit">
            {/* <PieChart/> */}

        </View>
{/* 
        <View className="flex justify-between flex-row pr-2 border h-52">
            <LineChart/>

        </View>

        <View className="flex justify-between flex-row pr-2 border h-36">

        </View>

        <View className="flex justify-between flex-row pr-2 border h-36">

        </View> */}

        
     </ScrollView>
    </View>
        


        </View>
    )
}

export default Analytics