import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {store} from './redux/store.js'
import {Provider} from 'react-redux'

import Main from './Main';

export default function App() {
  return (
 <Provider store={store}>
  <Main/>
 </Provider>
  
  );
}


