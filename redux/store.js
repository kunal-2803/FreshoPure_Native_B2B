import { configureStore } from '@reduxjs/toolkit'
import itemReducer from './slices/HotelItems'
import mobileReducer from './slices/Mobile'
import addressReducer from './slices/Address'
import cartReducer from './slices/Cart'
import wishlistReducer from './slices/Wishlist'
import profileReducer from './slices/UserProfile'
import OrderReducer from './slices/Order'

export const store = configureStore({
  reducer: {
    hotelItems:itemReducer,
    mobile: mobileReducer,
    address:addressReducer,
    cartItems: cartReducer,
    wishlistItems: wishlistReducer,
    profile:profileReducer,
    order:OrderReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})