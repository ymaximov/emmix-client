import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './redux/store'; // Import the store and persistor
import App from './App'; // Import the App component
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(
    'CompanyName=Emmix Corp.,LicensedApplication=Emmix,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-035738,SupportServicesEnd=12_December_2023_[v2]_MTcwMjMzOTIwMDAwMA==feb333ead131f43efec2dce6dc316b3a'
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* Wrap the App with PersistGate */}
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, you can add the `reportWebVitals` function here
// or simply remove the function call if you don't need performance monitoring.
