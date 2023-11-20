import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {store} from './redux/store.js'
import {Provider} from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import Main from './Main';
import { PersistGate } from 'redux-persist/es/integration/react'
let persistor = persistStore(store)

export default function App() {
  return (
 <Provider store={store}>
  <PersistGate persistor={persistor}>
  <Main/>
  </PersistGate>
 </Provider>
  
  );
}


