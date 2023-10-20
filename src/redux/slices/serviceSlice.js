// purchaseOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        ecID: null
    },
    reducers: {
        setEcID: (state, action) => {
            state.ecID = action.payload;
        },
    }
});

export const { setEcID } = serviceSlice.actions;
export default serviceSlice.reducer;
