import { createSlice } from '@reduxjs/toolkit'



export const mobileNumberSlice = createSlice({
  name: 'mobile',
  initialState:'',
  reducers: {
    setMobileNumber:(state,action)=>{
      return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMobileNumber } = mobileNumberSlice.actions
export const selectMobileNumber = (state)=>state.mobile
export default mobileNumberSlice.reducer