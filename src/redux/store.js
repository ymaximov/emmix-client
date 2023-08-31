import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import alertsSlice from "./slices/alertsSlice";
import userSlice from "./slices/userSlice";
import tenantProfileSlice from "./slices/admin/tenantProfileSlice";
import customerSlice from "./slices/customerSlice";
import vendorSlice from "./slices/vendorSlice";
import filteredResultsSlice from "./slices/filteredResultsSlice";
import inventoryItemSlice from "./slices/inventoryItemSlice";
import purchaseOrderSlice from "./slices/purchaseOrderSlice";
import createdPoSlice from "./slices/createdPoSlice";

const persistConfig = {
    key: 'root', // The key under which the state will be saved
    storage,
};

// Wrap each slice's reducer with the `persistReducer` function
const persistedAlertsReducer = persistReducer(persistConfig, alertsSlice);
const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedTenantReducer = persistReducer(persistConfig, tenantProfileSlice);
const persistedCustomerReducer = persistReducer(persistConfig, customerSlice);
const persistedVendorReducer = persistReducer(persistConfig, vendorSlice);
const persistedFilteredResultsReducer = persistReducer(persistConfig, filteredResultsSlice);
const persistedInventoryItemReducer = persistReducer(persistConfig, inventoryItemSlice);
const persistedPurchaseOrderReducer = persistReducer(persistConfig, purchaseOrderSlice);
const persistedCreatedPoSlice = persistReducer(persistConfig, createdPoSlice);

const rootReducer = {
    alerts: persistedAlertsReducer,
    user: persistedUserReducer,
    tenant: persistedTenantReducer,
    customer: persistedCustomerReducer,
    vendor: persistedVendorReducer,
    filteredResults: persistedFilteredResultsReducer,
    item: persistedInventoryItemReducer,
    purchaseOrder: persistedPurchaseOrderReducer,
    createdPo: persistedCreatedPoSlice,
};

const store = configureStore({
    reducer: rootReducer,
    // Add any other store configurations here if needed
});

// Create the persistor using the store
export const persistor = persistStore(store);

export default store;
