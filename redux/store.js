import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './slices/HotelItems'
import mobileReducer from './slices/Mobile/index.js'
import addressReducer from './slices/Address'
import cartReducer from './slices/Cart'
import wishlistReducer from './slices/Wishlist'
import profileReducer from './slices/UserProfile'
import OrderReducer from './slices/Order'
import {combineReducers } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

let persistConfig = {
  key:'root',
  storage:AsyncStorage
}
let rootReducer = combineReducers({
  hotelItems:itemReducer,
  mobile: mobileReducer,
  address:addressReducer,
  cartItems: cartReducer,
  wishlistItems: wishlistReducer,
  profile:profileReducer,
  order:OrderReducer,
})

let persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})