import { useEffect, useState } from 'react';
import {View,Text} from 'react-native'
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false); // Assume true as default

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  return isConnected
};

export default useNetworkStatus;