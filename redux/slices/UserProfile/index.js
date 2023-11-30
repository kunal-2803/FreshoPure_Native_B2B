import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const baseUrl = 'https://freshopure.in'
import AsyncStorage from '@react-native-async-storage/async-storage';


//Action
export const getProfile = createAsyncThunk("getProfile", async () => {
    const response = await fetch(`${baseUrl}/user/getprofile`, {
        method: 'get',
        headers: {
            'token':await AsyncStorage.getItem('token')
        }
    });
    const res = await response.json()
    return res;
});

export const setUserProfile = createAsyncThunk("setUserProfile", async ({userData}, { rejectWithValue }) => {
    console.log("userData", userData);
    const response = await fetch(`${baseUrl}/user/setprofile`, {
        method: 'post',
        body: JSON.stringify( userData ),
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        console.log(result,"update Ka reponse")
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const setUserProfileImage = createAsyncThunk("setUserProfileImage", async (userData, { rejectWithValue }) => {
    const selectedImage =userData._parts[0][1].uri
    const formData = new FormData();
formData.append('file', {
    uri: selectedImage,
    type: 'image/jpeg', 
    name: 'image.jpg',
  });

if(userData.update){
formData.append('update',true );
}
console.log(formData,"formData Response")
    const response = await fetch(`${baseUrl}/user/upload`, {
        method: 'post',
        body: formData,
        headers: {
            'token': await AsyncStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        }
    });
    try {
        const result = await response.json();
        console.log(result,"update IMage Ka data")
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})



const profileSlice = createSlice({
    name: "userProfile",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        isSuccess:false
    },
    reducers:{
        clearData:(state)=>{
          state.isSuccess=false;
          state.isError=false;
        }
       },
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });

        builder.addCase(setUserProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
        });
        builder.addCase(setUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            
        });
        builder.addCase(setUserProfile.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading=false;
            state.isError = true;
            state.isSuccess = false;
        });
    },
});

export const {clearData}=profileSlice.actions;

export default profileSlice.reducer;
