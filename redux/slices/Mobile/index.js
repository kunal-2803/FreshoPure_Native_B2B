import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://15.206.181.239'

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
    
    if(await response.status === 200){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return error;
  }
});

export const resendOtp = createAsyncThunk('resendOtp', async ({mobile}) => {

  const response = await fetch(`http://15.206.181.239/user/retry`, {
    method: 'post',
    body: JSON.stringify({mobile}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

});


export const logout = createAsyncThunk('logout', async () => {

  try {
    // Your logout logic goes here, e.g., clearing tokens or user data
    await AsyncStorage.removeItem('token');

    // You can return any data if needed
    return { success: true };
  } catch (error) {
    // Handle errors, and return an error object if needed
    throw new Error('Logout failed');
  }
});



export const loadUser = createAsyncThunk('loadUser', async () => {

  const token = await AsyncStorage.getItem('token');
  if(!token){
    
    return {success:false}; 
  }

  // console.log(token,'token')

  const response = await fetch(`${baseUrl}/user/getprofile`, {
    method: 'get',
    headers: {
        'token': token,
    }
    });

    try {

      const res = await response.json()


      if(response?.status=== 200){
        return {success:true,user:res};

      }else {
        return {success:false}
      }

    } catch (error) {
      return error;
    }
});



export const otpVerify = createAsyncThunk('otpVerify', async ({mobile,otpRec}, { rejectWithValue }) => {
  
  const response = await fetch(`http://15.206.181.239/user/verify`, {
    method: 'post',
    body: JSON.stringify({mobile,otpRec}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  try {

    if(await response.status === 200){

    const res = await response.json();


    if(res.token !== 'undefined'){
                await AsyncStorage.setItem('token', res.token );

    }
    return true;
  }else{
    return false;
  }
   
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
    isAuthenticated:false,
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
      state.isSuccess =action?.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.isSuccess =action?.payload;
    });


    builder.addCase(otpVerify.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess =action?.payload;
      state.isAuthenticated=action.payload;

    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.isSuccess = action?.payload;
    });




    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated=false;
      state.data = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isError = true;
    });


    builder.addCase(loadUser.pending, (state,action) => {
      state.isLoading = true;
      state.isAuthenticated=false;
    });
    builder.addCase(loadUser.fulfilled, (state,action) => {
     console.log(action.payload?.user,'action')
      state.isLoading = false;
      state.isAuthenticated=action.payload?.success;
      state.data = action.payload?.user
    });
    builder.addCase(loadUser.rejected, (state,action) => {
      state.isError = true;
      state.isAuthenticated=false;

    });

  },
})
export const {clearData}=mobileNumberSlice.actions;


export default mobileNumberSlice.reducer