import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Action
export const fetchWishlistItems = createAsyncThunk("fetchWishlistItems", async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/wishlist/getwishlistitems`, {
        method: 'get',
        headers: {
            'token': localStorage.getItem("token")
        }
    });
    const res = await response.json()
    return res;
});

export const addToWishlist = createAsyncThunk("addToWishlist", async (itemId, { rejectWithValue }) => {
    const wishlistItem = [
        {
          "itemId": itemId
        }
      ];

    const response = await fetch(`${process.env.REACT_APP_URL}/wishlist/additemtowishlist`, {
        method: 'post',
        body: JSON.stringify({ wishlistItem }),
        headers: {
            'token': localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const removefromWishlist = createAsyncThunk("removefromWishlist", async (itemId, { rejectWithValue }) => {
    const response = await fetch(`${process.env.REACT_APP_URL}/wishlist/removeitemfromwishlist`, {
        method: 'post',
        body: JSON.stringify({ Itemid: itemId }),
        headers: {
            'token': localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
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
        isError: false
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
            console.log("Error", action.payload);
            state.isError = true;
        });


        builder.addCase(addToWishlist.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.added= action.payload;
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
