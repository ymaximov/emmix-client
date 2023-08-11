import {createSlice} from "@reduxjs/toolkit";

export const inventoryItemSlice = createSlice({
    name: 'vendor',
    initialState: {
        item: {}
    },
    reducers: {
        setItem: (state, action) => {
            state.item = action.payload
        },
    },
});

export const {setItem} = inventoryItemSlice.actions;

export default inventoryItemSlice.reducer
