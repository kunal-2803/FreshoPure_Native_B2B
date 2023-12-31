import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://freshopure.in'


//Action
export const fetchCartItems = createAsyncThunk("fetchCartItems", async () => {
    const response = await fetch(`${baseUrl}/cart/getcartitems`, {
        method: 'get',
        headers: {
            'token': await AsyncStorage.getItem('token')
        }
    });
    const res = await response.json()
    return res;
});
export const addToCart = createAsyncThunk("addToCart", async (itemId, { rejectWithValue }) => {
    const orderedItem = [
        {
            "itemId": itemId,
            "quantity": {
                "kg": 1,
                "gram": 0
            }
        }
    ];

    const response = await fetch(`${baseUrl}/cart/additemtocart`, {
        method: 'post',
        body: JSON.stringify({ orderedItem }),
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const removefromCart = createAsyncThunk("removefromCart", async (itemId, { rejectWithValue }) => {
    const response = await fetch(`${baseUrl}/cart/removeitemfromcart`, {
        method: 'post',
        body: JSON.stringify({ Itemid: itemId }),
        headers: {
            'token':await AsyncStorage.getItem('token'),
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

export const updateCartItems = createAsyncThunk("updateCartItems", async (data) => {
    const quantity = {
        kg: data.kg,
        gram: data.gram
    };
    const itemId = data.itemId

    const response = await fetch(`${baseUrl}/cart/updatecartitems`, {
        method: 'post',
        body: JSON.stringify({ itemId, quantity }),
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });

    const responseItems = await fetch(`${baseUrl}/cart/getcartitems`, {
        method: 'get',
        headers: {
            'token': await AsyncStorage.getItem('token')
        }
    });
    try {
        const result = await responseItems.json();
        console.log(result)
        return result;
    } catch (error) {
        return error;
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        data: null,
        price:0,
        added:null,
        removed:null,
        updated:null,
        isError: false,
        addLoading:false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
                });
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });


        builder.addCase(addToCart.pending, (state, action) => {
            state.addLoading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.addLoading = false;
            state.added = action.payload;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });




        builder.addCase(removefromCart.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removefromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            const itemId = action.payload;
            state.removed = action.payload;
            state.data.cartData = state.data.cartData.filter(item => item._id !== itemId);
           
        });
        builder.addCase(removefromCart.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });



        builder.addCase(updateCartItems.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updated = action.payload
           
        });
        builder.addCase(updateCartItems.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
    },
});
export default cartSlice.reducer;
