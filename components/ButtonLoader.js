import { View, Text, TouchableOpacity,ActivityIndicator, Animated } from 'react-native'
import React,{useEffect,useRef} from 'react'

const ButtonLoader = ({color}) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      spin();
    }, []);
  
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }
      ).start(() => spin());
    }
  
    const spinAnimation = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
  
    return (
      <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
      <ActivityIndicator size="small" color={color} />
      </Animated.View>
    )
  }

export default ButtonLoader