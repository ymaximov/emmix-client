import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: 'loading',
        reloadUser: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('token', JSON.stringify(action.payload))
        },
    },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer