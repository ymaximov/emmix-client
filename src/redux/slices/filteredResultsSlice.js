import {createSlice} from "@reduxjs/toolkit";

export const filteredResultsSlice = createSlice({
    name: 'filteredResults',
    initialState: {
        filteredResults: {},
        filterName: '',
    },
    reducers: {
        setFilteredResults: (state, action) => {
            state.filteredResults = action.payload
        },
        setFilterName: (state, action) => {
            state.filterName = action.payload
        },
    },
});

export const {setFilteredResults, setFilterName} = filteredResultsSlice.actions;

export default filteredResultsSlice.reducer