import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'https://freshopure.in'


export const addAddress = createAsyncThunk("addAddress", async (newAddress) => {
   console.log(newAddress)
  const response = await fetch(`${baseUrl}/address/addaddress`, {
    method: 'post',
    body: JSON.stringify({...newAddress}),
    headers: {
      'token':  await AsyncStorage.getItem('token'),
      'Content-Type': 'application/json'
    } 
  });
  try {
    
    if(await response.status === 200){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return error;
  }
})

export const selectedAddress = createAsyncThunk("selectedAddress", async () => {
  const response = await fetch(`${baseUrl}/address/getselectedaddress`, {
    method: 'get',
    headers: {
      'token':  await AsyncStorage.getItem('token'),
    }
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
})

export const allAddress = createAsyncThunk("allAddress", async () => {
  const response = await fetch(`${baseUrl}/address/getalladdresses`, {
    method: 'get',
    headers: {
      'token':  await AsyncStorage.getItem('token'),
    }
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
})

export const selectDiffAddress = createAsyncThunk("selectDiffAddress", async (addressId, { rejectWithValue }) => {
  const responseUpdate = await fetch(`${baseUrl}/address/updateselectedaddress`, {
    method: 'post',
    body: JSON.stringify({ addressId }),
    headers: {
      'token': await AsyncStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  });

  const response = await fetch(`${baseUrl}/address/getselectedaddress`, {
    method: 'get',
    headers: {
      'token':  await AsyncStorage.getItem('token'),
    }
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const deleteaddress = createAsyncThunk("deleteaddress", async (addressId, { rejectWithValue }) => {
  const response = await fetch(`${baseUrl}/address/removeaddress`, {
    method: 'post',
    body: JSON.stringify({ addressId }),
    headers: {
      'token':  await AsyncStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  });
  try {
    const result = await response.json();
    console.log(result,'result')
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
})

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    isLoading: false,
    selected: null,
    AllAddress: null,
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
    builder.addCase(addAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isSuccess = action.payload;
    });


    builder.addCase(selectedAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(selectedAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selected = action.payload;
    });
    builder.addCase(selectedAddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });


    builder.addCase(allAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.AllAddress = action.payload;
    });
    builder.addCase(allAddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });


    builder.addCase(selectDiffAddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(selectDiffAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selected = action.payload;
    });
    builder.addCase(selectDiffAddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });


    builder.addCase(deleteaddress.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteaddress.fulfilled, (state, action) => {
      state.isLoading = false;
      let addressId = action.payload;
      state.AllAddress.hotelAddresses = state.AllAddress.hotelAddresses.filter(address => address._id !== addressId);;
    });
    builder.addCase(deleteaddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  }
})
export const {clearData}=addressSlice.actions;

export default addressSlice.reducer;