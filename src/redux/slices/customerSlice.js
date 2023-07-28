import {createSlice} from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: {}
    },
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload
        },
    },
});

export const {setCustomer} = customerSlice.actions;

export default customerSlice.reducer