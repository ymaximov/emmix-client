import {createSlice} from "@reduxjs/toolkit";

export const createdPOSlice = createSlice({
    name: 'createdPO',
    initialState: {
       po_id: null
    },
    reducers: {
        setPoID: (state, action) => {
            state.po_id = action.payload
        },
    },
});

export const {setPoID} = createdPOSlice.actions;

export default createdPOSlice.reducer