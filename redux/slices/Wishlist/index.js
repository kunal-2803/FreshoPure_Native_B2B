import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//Action
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://freshopure.in'

export const fetchWishlistItems = createAsyncThunk("fetchWishlistItems", async () => {
    const response = await fetch(`${baseUrl}/wishlist/getwishlistitems`, {
        method: 'get',
        headers: {
            'token': await AsyncStorage.getItem('token'),
        }
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addToWishlist = createAsyncThunk("addToWishlist", async (itemId, { rejectWithValue }) => {
    const wishlistItem = [
        {
          "itemId": itemId
        }
      ];

    const response = await fetch(`${baseUrl}/wishlist/additemtowishlist`, {
        method: 'post',
        body: JSON.stringify({ wishlistItem }),
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const removefromWishlist = createAsyncThunk("removefromWishlist", async (itemId, { rejectWithValue }) => {
    console.log(itemId);
    const response = await fetch(`${baseUrl}/wishlist/removeitemfromwishlist`, {
        method: 'post',
        body: JSON.stringify({ Itemid: itemId }),
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        console.log(result)
        return itemId;
    } catch (error) {
        return rejectWithValue(error);
    }
})



const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        isLoading: false,
        data: null,
        added:null,
        removed:null,
        isError: false,
        addWishlistLoading:false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWishlistItems.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchWishlistItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchWishlistItems.rejected, (state, action) => {
            console.log("Error et", action.payload);
            state.isError = true;
            state.isLoading = false;

        });


        builder.addCase(addToWishlist.pending, (state, action) => {
            state.addWishlistLoading = true;
        });
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addWishlistLoading= action.payload;
        });
        builder.addCase(addToWishlist.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });




        builder.addCase(removefromWishlist.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removefromWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            const itemId = action.payload
            state.data.wishlistData = state.data.wishlistData.filter(item => item._id !== itemId);
        });
        builder.addCase(removefromWishlist.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
    },
});
export default wishlistSlice.reducer;
