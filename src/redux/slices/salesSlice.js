import {createSlice} from "@reduxjs/toolkit";

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sqID: null,
        soID: null,
        selectedItem: [],
        selectedCustomer: [],
        deliveryID: null
    },
    reducers: {
        setSqID: (state, action) => {
            state.sqID = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setSOID: (state, action) => {
            state.soID = action.payload
        },
        setDeliveryID: (state, action) => {
            state.deliveryID = action.payload
        },
    },
});

export const {setSqID, setDeliveryID, setSOID, setSelectedItem, setSelectedCustomer} = salesSlice.actions;

export default salesSlice.reducer