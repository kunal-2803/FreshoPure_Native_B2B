import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Action
export const getProfile = createAsyncThunk("getProfile", async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/user/getprofile`, {
        method: 'get',
        headers: {
            'token': localStorage.getItem("token")
        }
    });
    const res = await response.json()
    return res;
});

export const setUserProfile = createAsyncThunk("setUserProfile", async (userData, { rejectWithValue }) => {
    console.log("userData", userData);
    const response = await fetch(`${process.env.REACT_APP_URL}/user/setprofile`, {
        method: 'post',
        body: JSON.stringify({ userData }),
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

export const setUserProfileImage = createAsyncThunk("setUserProfileImage", async (userData, { rejectWithValue }) => {
    console.log("userData", userData);
    const response = await fetch(`${process.env.REACT_APP_URL}/user/uploads`, {
        method: 'post',
        body: JSON.stringify({ userData }),
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



const profileSlice = createSlice({
    name: "userProfile",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
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
    },
});
export default profileSlice.reducer;
