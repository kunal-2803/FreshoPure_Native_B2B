import React from 'react';
import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Action
export const fetchItems = createAsyncThunk("fetchItems", async()=>{
    const response = await fetch(`http://15.206.181.239/items/getalltemsforhotel`,{
        method: 'get',
        headers: {
          'token': await AsyncStorage.getItem('token'),
        }
    });
    return response.json();
});

const itemSlice = createSlice({
    name: "items",
    initialState: {
        isLoading:false,
        data: null,
        isError:false
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchItems.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchItems.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchItems.rejected,(state,action)=>{
            console.log("Error",action.payload);
            state.isError = true;
        });
    },
});
export default itemSlice.reducer;
