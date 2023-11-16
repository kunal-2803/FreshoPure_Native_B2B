import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from "expo-linear-gradient"
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SkeletonComponent = ({width,height}) => {
  return (
    <View>
      <ShimmerPlaceHolder style={{width:width,height:height}} className="rounded-md mx-auto my-2 "/>

    </View>
  )
}

export default SkeletonComponent;