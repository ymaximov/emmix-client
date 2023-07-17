import { configureStore } from '@reduxjs/toolkit'
import alertsSlice from "./slices/alertsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        alerts: alertsSlice,
        user: userSlice
    }
})

export default store