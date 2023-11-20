import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginApi = createAsyncThunk('loginApi', async (mobile) => {
  console.log(mobile,'mobile')
  const response = await fetch(`http://15.206.181.239/user/login`, {
    method: 'post',
    body: JSON.stringify(mobile),
    headers: {
      'Content-Type': 'application/json'
    }
  })
 
  try {
    
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
});


export const otpVerify = createAsyncThunk('otpVerify', async ({mobile,otpRec}, { rejectWithValue }) => {
  console.log(mobile,otpRec)
  const response = await fetch(`http://15.206.181.239/user/verify`, {
    method: 'post',
    body: JSON.stringify({mobile,otpRec}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  try {

    const res = await response.json();
    console.log(res,'res')
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
    isError: false,
    isSuccess:false,

  },
  reducers:{
    clearData:(state)=>{
      state.isSuccess=false;
      state.isError=false;
    }
   },
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.data = action.payload;
      state.isSuccess=true;
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
      console.log(action?.payload?.token,"ret token")
      // state.data = action.payload;
      state.isSuccess =true;
      try {
        await AsyncStorage.setItem('token', action?.payload?.token);
      } catch (error) {
        console.log(error);
      }
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      console.log("Error oto", action.payload);
      state.isError = true;
    });

  },
})
export const {clearData}=mobileNumberSlice.actions;


export default mobileNumberSlice.reducer