import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Home} from "./pages/Home";
import {Toaster} from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {Login} from './pages/login/Login'
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import {setUser, userSlice} from "./redux/slices/userSlice";
import AdminRoute from "./routes/AdminRoute";
import {Onboarding} from "./pages/Admin/Onboarding";
import {Tenants} from "./pages/Admin/Tenants";
import {TenantProfile} from "./pages/Admin/TenantProfile";
import {ResetPassword} from "./pages/Admin/ResetPassword";
import {CRM} from "./pages/CRM/Crm";
import {CustomerProfile} from "./pages/CRM/CustomerProfile";
import {Vendors} from "./pages/vendors/Vendors";
import {VendorProfile} from "./pages/vendors/VendorProfile";
import {Inventory} from "./pages/inventory/Inventory";
import {InventoryItemProfile} from "./pages/inventory/InventoryItemProfile";
import {Purchasing} from "./pages/purchasing/Purchasing";
import {CreatePurchaseOrder} from "./pages/purchasing/CreatePurchaseOrder";
import {TokenExpirationHandler} from "./pages/login/TokenExpirationHandler";
import {PurchaseOrder} from "./pages/purchasing/PurchaseOrder";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>
  },
    {
        path: '/login',
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: '/admin/onboarding',
        element: <AdminRoute><Onboarding /></AdminRoute>
    },
    {
        path: '/admin/companies',
        element: <AdminRoute><Tenants /></AdminRoute>
    },
    {
        path: '/admin/companyprofile',
        element: <AdminRoute><TenantProfile /></AdminRoute>
    },
    {
        path: '/admin/resetpassword',
        element: <AdminRoute><ResetPassword /></AdminRoute>
    },
    {
        path: '/crm',
        element: <ProtectedRoute><CRM /></ProtectedRoute>
    },
    {
        path: '/crm/customerprofile',
        element: <ProtectedRoute><CustomerProfile /></ProtectedRoute>
    },
    {
        path: '/vendors',
        element: <ProtectedRoute><Vendors /></ProtectedRoute>
    },
    {
        path: '/vendors/vendorprofile',
        element: <ProtectedRoute><VendorProfile /></ProtectedRoute>
    },
    {
        path: '/inventory',
        element: <ProtectedRoute><Inventory /></ProtectedRoute>
    },
    {
        path: '/inventory/itemprofile',
        element: <ProtectedRoute><InventoryItemProfile /></ProtectedRoute>
    },
    {
        path: '/purchasing',
        element: <ProtectedRoute><Purchasing /></ProtectedRoute>
    },
    {
        path: '/purchasing/createpo',
        element: <ProtectedRoute><CreatePurchaseOrder /></ProtectedRoute>
    },
    {
        path: '/purchasing/purchaseorder',
        element: <ProtectedRoute><PurchaseOrder /></ProtectedRoute>
    },
])
function App() {
  const {loading} = useSelector((state) => state.alerts)


  return (
    <div>
        {loading && (
            <div
                 className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this
                    page.</p>
            </div>
        )}
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
