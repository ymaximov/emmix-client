import {createSlice} from "@reduxjs/toolkit";

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sqID: null,
        soID: null,
        selectedItem: [],
        selectedCustomer: []
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
    },
});

export const {setSqID, setSOID, setSelectedItem, setSelectedCustomer} = salesSlice.actions;

export default salesSlice.reducer