import {createSlice} from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        vendor: {}
    },
    reducers: {
        setVendor: (state, action) => {
            state.vendor = action.payload
        },
    },
});

export const {setVendor} = vendorSlice.actions;

export default vendorSlice.reducer