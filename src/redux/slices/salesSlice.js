import {createSlice} from "@reduxjs/toolkit";

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sqID: null
    },
    reducers: {
        setSqID: (state, action) => {
            state.sqID = action.payload
        }
    },
});

export const {setSqID} = salesSlice.actions;

export default salesSlice.reducer