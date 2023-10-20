// purchaseOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        eqID: null
    },
    reducers: {
        setEqID: (state, action) => {
            state.eqID = action.payload;
        },
    }
});

export const { setEqID } = serviceSlice.actions;
export default serviceSlice.reducer;
