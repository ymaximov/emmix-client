import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import alertsSlice from "./slices/alertsSlice";
import userSlice from "./slices/userSlice";
import tenantProfileSlice from "./slices/admin/tenantProfileSlice";
import customerSlice from "./slices/customerSlice";
import filteredResultsSlice from "./slices/filteredResultsSlice";

const persistConfig = {
    key: 'root', // The key under which the state will be saved
    storage,
};

// Wrap each slice's reducer with the `persistReducer` function
const persistedAlertsReducer = persistReducer(persistConfig, alertsSlice);
const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedTenantReducer = persistReducer(persistConfig, tenantProfileSlice);
const persistedCustomerReducer = persistReducer(persistConfig, customerSlice);
const persistedFilteredResultsReducer = persistReducer(persistConfig, filteredResultsSlice);

const rootReducer = {
    alerts: persistedAlertsReducer,
    user: persistedUserReducer,
    tenant: persistedTenantReducer,
    customer: persistedCustomerReducer,
    filteredResults: persistedFilteredResultsReducer
};

const store = configureStore({
    reducer: rootReducer,
    // Add any other store configurations here if needed
});

// Create the persistor using the store
export const persistor = persistStore(store);

export default store;
