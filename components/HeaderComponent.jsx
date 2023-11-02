import { View, Text } from 'react-native'
import React from 'react'

const HeaderComponent = (props) => {
  return (
    <View>
      <Text>{props.heading}</Text>
    </View>
  )
}

export default HeaderComponent