import { configureStore } from '@reduxjs/toolkit'
import alertsSlice from "./slices/alertsSlice";
import userSlice from "./slices/userSlice";
import tenantProfileSlice from "./slices/admin/tenantProfileSlice";

const store = configureStore({
    reducer: {
        alerts: alertsSlice,
        user: userSlice,
        tenant: tenantProfileSlice
    }
})

export default store