// purchaseOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const purchaseOrderSlice = createSlice({
    name: 'purchaseOrder',
    initialState: {
        items: [], // This will hold the added items in the purchase order
        selectedItem: {},
        price: '',
        quantity: '',
        warehouse: null
    },
    reducers: {
        addItem: (state, action) => {
            const { price, quantity, selectedItemId, selectedItemName, warehouse } = action.payload;
            state.items.push({ price, quantity, selectedItemId, selectedItemName, warehouse });
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearOrder: (state) => {
            state.items = [];
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setWarehouse: (state, action) => {
            state.warehouse = action.payload
        },
    },
});

export const { addItem, removeItem, clearOrder, setSelectedItem, setPrice, setQuantity, setWarehouse } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
