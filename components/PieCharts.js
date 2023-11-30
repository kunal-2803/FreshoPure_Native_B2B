import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import PieChart from 'react-native-pie-chart'

import { useDispatch, useSelector } from 'react-redux';
import { analyticsAPI } from '../redux/slices/Order';
import useNetworkStatus from '../utils/useNetworkStatus.js'
import NoInternet from "../components/NoInternet.js";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const PieCharts = () => {
  const isConnected = useNetworkStatus()
  dispatch = useDispatch();
  const [totalSpent, setTotalSpent] = useState(0);
  const [isPressed, setIsPressed] = useState('week');

  useEffect(() => {
    isConnected && dispatch(analyticsAPI('month'))
    setTotalSpent(analytics?.totalSpent)
  }, [])
  const { isError, isLoading, analytics } = useSelector(state => state.order)

  const handlePress = (duration) => {
    isConnected && dispatch(analyticsAPI(duration));
    setTotalSpent(analytics?.totalSpent);
    setIsPressed(duration);
    console.log(isPressed, "isPressssed")
  };

  const widthAndHeight = windowWidth * 0.57

  const series = [analytics?.catagory[0].LocalVegetables, analytics?.catagory[1].LocalImportedFruits]
  const sliceColor = [ '#54B175','#789292',]



  return (
   
        <ScrollView style={{ flex: 1 }}>
          {analytics && analytics.totalSpent ?
            <>
              <View style={styles.container}>
                <Text className="text-center text-lg font font-bold opacity-80 my-5">Your Spending</Text>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.7}
                  coverFill={'#FFF'}
                />
                <Text className="absolute  text-center text-lightText" style={{ marginTop: windowHeight * 0.228 }}>Total Payable {'\n'}<Text className="font-bold ">Rs. {analytics?.totalSpent}</Text> </Text>
              </View>
            </> : <View><Text className="text-center justify-center pt-28" style={{ height: windowHeight * 0.39 }}>No Orders Found</Text></View>}

          <View className="flex flex-row justify-between mt-3 px-4">
            <View className="flex flex-row items-center space-x-1">
              <View className="w-3 h-3 rounded-full bg-[#789292]" />
              <Text className="text-sm">Vegetables</Text>
            </View>
            <View className="flex flex-row items-center space-x-1">
              <View className="w-3 h-3 rounded-full bg-[#54B175]" />
              <Text className="text-sm">Fruits</Text>
            </View>
          </View>

          <View className="flex flex-row space-x-12 mx-auto mt-8">
            <TouchableOpacity onPress={() => { handlePress('today') }} style={{ opacity: isPressed == 'today' ? 0.2 : 1 }}><Text className="font-semibold">1D</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { handlePress('week') }} style={{ opacity: isPressed == 'week' ? 0.2 : 1 }}><Text className="font-semibold">1W</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { handlePress('month') }} style={{ opacity: isPressed == 'month' ? 0.2 : 1 }}><Text className="font-semibold">1M</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { handlePress('year') }} style={{ opacity: isPressed == 'year' ? 0.2 : 1 }}><Text className="font-semibold">1Y</Text></TouchableOpacity>
          </View>

        </ScrollView> 
      


  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
})
export default PieCharts