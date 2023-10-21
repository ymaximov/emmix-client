// purchaseOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        ecID: null,
        scID: null,
        roID: null,
    },
    reducers: {
        setEcID: (state, action) => {
            state.ecID = action.payload;
        },
        setScID: (state, action) => {
            state.scID = action.payload;
        },
        setRoID: (state, action) => {
            state.roID = action.payload;
        },
    },


});

export const { setEcID, setScID, setRoID } = serviceSlice.actions;
export default serviceSlice.reducer;
