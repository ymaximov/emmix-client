import {createSlice} from "@reduxjs/toolkit";

export const tenantProfileSlice = createSlice({
    name: 'tenantProfile',
    initialState: {
        tenant: {}
    },
    reducers: {
        setTenantProfile: (state, action) => {
            state.tenant = action.payload
            // return action.payload;
        },
    },
});

export const {setTenantProfile} = tenantProfileSlice.actions;

export default tenantProfileSlice.reducer