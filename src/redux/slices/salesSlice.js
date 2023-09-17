import {createSlice} from "@reduxjs/toolkit";

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sqID: null,
        selectedItem: []
    },
    reducers: {
        setSqID: (state, action) => {
            state.sqID = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        }
    },
});

export const {setSqID, setSelectedItem} = salesSlice.actions;

export default salesSlice.reducer