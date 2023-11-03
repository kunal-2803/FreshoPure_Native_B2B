import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Image, ScrollView } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'

import CustomHeader from '../components/CustomHeader';

import OrderHistoryComponet from '../components/OrderHistoryComponet';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const bg = require('./../assets/bg-texture.png')

const Analytics = () => {
    const widthAndHeight = width * 0.55
    const series = [100, 321, 123, 789, 537]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']
    const centerText = "Text in Doughnut"
    return (
        <View>
            {/* <Text>Analytics</Text> */}
            <CustomHeader title={'Analytics'} backButton={true} height={0.16} headerBar={false} />
            <Image source={bg} className="absolute" style={{ height: height * 1.4 }} resizeMode="repeat" />
            <View className="items-center border mx-auto mt-5" style={{ width: width * 0.9 }}>
                <Text>Your spending</Text>
                {/* <View className="bg-brown p-8 rounded-full h-36 items-center ">
                    <View className="rounded-full bg-white items-center h-20">
                        <Text >Total Payable</Text>
                        <Text >Rs. 677899</Text>
                    </View>
                </View> */}


                <View style={styles.container}>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.7}
                        coverFill={'#FFF'}
                    />
                    {/* <View style={styles.centerTextContainer}>
                        <Text style={styles.centerText}>{centerText}</Text>
                    </View> */}
                    <Text className=" absolute text-green text-xs items-center h-20 w-30" style={{marginTop:height*0.1}} >Total Payable</Text>
                </View>


                <View className="flex flex-row">

                </View>
                <View className="flex flex-row">

                </View>
            </View>





        </View>
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
    centerTextContainer: {
        position: 'absolute',
        top: '45%', // Adjust this value to position the text as desired
        alignItems: 'center',
        width: '100%',
      },
      centerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
})

export default Analytics