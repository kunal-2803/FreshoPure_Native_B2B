import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginApi = createAsyncThunk('loginApi', async (mobileNo) => {
  const response = await fetch(`http://15.206.181.239/user/login`, {
    method: 'post',
    body: JSON.stringify({ mobile: mobileNo }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json();
});


export const otpVerify = createAsyncThunk('otpVerify', async (data, { rejectWithValue }) => {
  const otpRec = data.otp;
  const mobNo = data.mobNo;
  const response = await fetch(`http://15.206.181.239/user/verify`, {
    method: 'post',
    body: JSON.stringify({ otpRec, mobile: mobNo }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  try {
    const res = await response.json();
    return res;
  } catch (error) {
    rejectWithValue(error)
  }
});



export const mobileNumberSlice = createSlice({
  name: 'mobile',
  initialState: {
    isLoading: false,
    data: null,
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mobile = action.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });


    builder.addCase(otpVerify.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(otpVerify.fulfilled, async (state, action) => {
      state.isLoading = false;
      console.log(action.payload.token,"ret token")
      state.data = action.payload;
      try {
        await AsyncStorage.setItem('token', action.payload.token);
      } catch (error) {
        console.log(error);
      }
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });



  },
})


export default mobileNumberSlice.reducer