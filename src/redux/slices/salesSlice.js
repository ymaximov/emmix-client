import {createSlice} from "@reduxjs/toolkit";

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sqID: null,
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
        }
    },
});

export const {setSqID, setSelectedItem, setSelectedCustomer} = salesSlice.actions;

export default salesSlice.reducer