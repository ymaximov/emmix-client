import {createSlice} from "@reduxjs/toolkit";

export const filteredResultsSlice = createSlice({
    name: 'filteredResults',
    initialState: {
        filteredResults: {},
        filterName: '',
        resultsTotal: '',
    },
    reducers: {
        setFilteredResults: (state, action) => {
            state.filteredResults = action.payload
        },
        setFilterName: (state, action) => {
            state.filterName = action.payload
        },
        setResultsTotal: (state, action) => {
            state.resultsTotal = action.payload
        },
    },
});

export const {setFilteredResults, setFilterName, setResultsTotal} = filteredResultsSlice.actions;

export default filteredResultsSlice.reducer