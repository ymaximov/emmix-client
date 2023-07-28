// reduxPersistConfig.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root', // The key under which the state will be saved
    storage,
};

export default persistConfig;
