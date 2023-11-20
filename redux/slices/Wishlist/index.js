import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s'
//Action
export const fetchWishlistItems = createAsyncThunk("fetchWishlistItems", async () => {
    const response = await fetch(`http://15.206.181.239/wishlist/getwishlistitems`, {
        method: 'get',
        headers: {
            'token': token
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

    const response = await fetch(`http://15.206.181.239/wishlist/additemtowishlist`, {
        method: 'post',
        body: JSON.stringify({ wishlistItem }),
        headers: {
            'token': token,
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
    const response = await fetch(`http://15.206.181.239/wishlist/removeitemfromwishlist`, {
        method: 'post',
        body: JSON.stringify({ Itemid: itemId }),
        headers: {
            'token': token,
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
            console.log("Error", action.payload);
            state.isError = true;
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
