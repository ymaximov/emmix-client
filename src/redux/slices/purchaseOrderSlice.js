// purchaseOrderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const purchaseOrderSlice = createSlice({
    name: 'purchaseOrder',
    initialState: {
        items: [], // This will hold the added items in the purchase order
        selectedItem: {},
        price: '',
        quantity: '',
        warehouse: null,
        due_date: null,
        po_id: null,
        poDetails: {}
    },
    reducers: {
        addItem: (state, action) => {
            const {price, quantity, inv_item_id, selectedItemName, warehouse} = action.payload;
            state.items.push({price, quantity, inv_item_id, selectedItemName, warehouse});
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updatePriceAndQuantity: (state, action) => {
            const { index, quantity, price } = action.payload;
            if (index >= 0 && index < state.length) {
                state[index].quantity = Number(quantity);
                state[index].price = Number(price);
            }
        },
        clearOrder: (state) => {
            state.items = [];
        },
        clearDueDate: (state) => {
            state.due_date = [];
        },
        clearWarehouse: (state) => {
            state.warehouse = [];
        },
        clearPrice: (state) => {
            state.price = [];
        },
        clearQuantity: (state) => {
            state.quantity = [];
        },
        clearSelectedItem: (state) => {
            state.selectedItem = [];
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
        setDueDate: (state, action) => {
            state.due_date = action.payload
        },
        setPoId: (state, action) => {
            state.po_id = action.payload
        },
        setPoDetails: (state, action) => {
            state.poDetails = action.payload
        },
    },
});

export const { setPoId, setPoDetails, addItem, removeItem, updateItem, updatePriceAndQuantity, clearWarehouse, clearQuantity, clearPrice, clearDueDate, clearSelectedItem, setSelectedItem, setDueDate, setPrice, setQuantity, setWarehouse, clearOrder } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
