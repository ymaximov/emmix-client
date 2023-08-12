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
        clearVendor: (state, action) => {
            state.vendor = {}
        },
    },
});

export const {setVendor, clearVendor} = vendorSlice.actions;

export default vendorSlice.reducer