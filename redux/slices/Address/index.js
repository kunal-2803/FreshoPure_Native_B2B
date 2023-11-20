import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const baseUrl = 'http://15.206.181.239'

export const addAddress = createAsyncThunk("addAddress", async (newAddress) => {

  console.log(newAddress,"New address");
  const response = await fetch(`${baseUrl}/address/addaddress`, {
    method: 'post',
    body: JSON.stringify({...newAddress}),
    headers: {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
      'Content-Type': 'application/json'
    } 
  });
  try {
    console.log(await response.status)
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
})

export const selectedAddress = createAsyncThunk("selectedAddress", async () => {
  console.log('hit')
  const response = await fetch(`${baseUrl}/address/getselectedaddress`, {
    method: 'get',
    headers: {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
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
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
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
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
      'Content-Type': 'application/json'
    }
  });

  const response = await fetch(`${baseUrl}/address/getselectedaddress`, {
    method: 'get',
    headers: {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
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
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
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
      state.isSuccess = true;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
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