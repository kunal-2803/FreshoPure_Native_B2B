import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const baseUrl = 'http://15.206.181.239'
//Action
export const orderHistory = createAsyncThunk("orderHistory", async () => {
    const response = await fetch(`${baseUrl}/order/orderhistory`, {
        method: 'get',
        headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s'
        }
    });
    const res = await response.json()
    function compareDates(a, b) {
        const dateA = new Date(a.date.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1"));
        const dateB = new Date(b.date.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1"));
      
        return dateB - dateA;
      }
      
    res.orderHistory.sort(compareDates)
    return res;
});

export const orderHistoryItems = createAsyncThunk("orderHistoryItems", async (order_id) => {
    const response = await fetch(`${baseUrl}/order/orderhistoryitems`, {
        method: 'post',
        body: JSON.stringify({ order_id }),
        headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGU4Nzk5ZjEyMjk4MTM1ZjczZWMxYTEiLCJpYXQiOjE2OTI5NTcxNDB9.arn2cHDt7P79Uqrw51TXIegTe8mK5QXINhAWZn4k--s',
            'Content-Type': 'application/json'
        }
    });
    const res = await response.json()
    return res;
});

export const placeOrder = createAsyncThunk("placeOrder", async (data) => {
    const addressId=data.address;
    const price=data.price;
    let response = await fetch(`${baseUrl}/order/placeorder`, {
        method: 'post',
        body: JSON.stringify({ addressId, price }),
        headers: {
            'token': localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
})


const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        orderhistorty: null,
        orderItems: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(orderHistory.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(orderHistory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderhistorty = action.payload;
        });
        builder.addCase(orderHistory.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });


        builder.addCase(orderHistoryItems.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(orderHistoryItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderItems = action.payload;
        });
        builder.addCase(orderHistoryItems.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });

    },
});
export default orderSlice.reducer;
