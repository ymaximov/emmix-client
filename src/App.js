import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {createContext, useReducer} from "react";
import {Home} from "./pages/Home";
import {Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";
import {Login} from './pages/login/Login'
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
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
import {PurchaseOrder} from "./pages/purchasing/PurchaseOrder";
import {GoodsReceipt} from "./pages/purchasing/GoodsReceipt";
import {Receiving} from "./pages/purchasing/Receiving";
import {Sales} from "./pages/sales/Sales";
import {CreateSalesOrder} from "./pages/sales/CreateSalesOrder";
import {APInvoice} from "./pages/purchasing/APInvoice";
import {Invoice} from "./pages/purchasing/Invoice";
import {CreateSQ} from "./pages/sales/CreateSQ";
import {SalesQuotation} from "./pages/sales/SalesQuotation";
import {SalesOrder} from "./pages/sales/SalesOrder";
import {CreateDelivery} from "./pages/sales/CreateDelivery";
import {Delivery} from "./pages/sales/Delivery";
import {Service} from "./pages/service/Service";
import {CreateEquipmentCard} from "./pages/service/CreateEquipmentCard";
import {EquipmentCard} from "./pages/service/EquipmentCard";
import {CreateServiceContract} from "./pages/service/CreateServiceContract";
import {ServiceContract} from "./pages/service/ServiceContract";
import {CreateRepairOrder} from "./pages/service/CreateRepairOrder";
import {RepairOrder} from "./pages/service/RepairOrder";
import {Invoices} from "./pages/Admin/Invoices";
import Quickbooks from "./pages/Admin/Quickbooks";
import { initialState, reducer } from './context/reducer';

export const QuickbookContext = createContext();

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
        path: '/quickbooks/invoices',
        element: <ProtectedRoute><Invoices/></ProtectedRoute>
    },
    {
        path: '/quickbooks/login',
        element: <ProtectedRoute><Quickbooks/></ProtectedRoute>
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
    // {
    //     path: '/purchasing/purchaseorder',
    //     element: <ProtectedRoute><PurchaseOrder /></ProtectedRoute>
    // },
    {
        path: '/purchasing/purchaseorder',
        element: <ProtectedRoute><PurchaseOrder /></ProtectedRoute>
    },
    {
        path: '/purchasing/goodsreceipt',
        element: <ProtectedRoute><GoodsReceipt /></ProtectedRoute>
    },
    {
        path: '/purchasing/goodsreceipt/receiving',
        element: <ProtectedRoute><Receiving /></ProtectedRoute>
    },
    {
        path: '/purchasing/apinvoice',
        element: <ProtectedRoute><APInvoice /></ProtectedRoute>
    },
    {
        path: '/purchasing/apinvoice/invoice',
        element: <ProtectedRoute><Invoice /></ProtectedRoute>
    },
    {
        path: '/sales',
        element: <ProtectedRoute><Sales /></ProtectedRoute>
    },
    {
        path: '/sales/createsq',
        element: <ProtectedRoute><CreateSQ /></ProtectedRoute>
    },
    {
        path: '/sales/salesquotation',
        element: <ProtectedRoute><SalesQuotation /></ProtectedRoute>
    },
    {
        path: '/sales/createso',
        element: <ProtectedRoute><CreateSalesOrder /></ProtectedRoute>
    },
    {
        path: '/sales/salesorder',
        element: <ProtectedRoute><SalesOrder /></ProtectedRoute>
    },
    {
        path: '/inventory/createdelivery',
        element: <ProtectedRoute><CreateDelivery /></ProtectedRoute>
    },
    {
        path: '/inventory/delivery',
        element: <ProtectedRoute><Delivery /></ProtectedRoute>
    },
    {
        path: '/service',
        element: <ProtectedRoute><Service /></ProtectedRoute>
    },
    {
        path: '/service/createequipment',
        element: <ProtectedRoute><CreateEquipmentCard /></ProtectedRoute>
    },
    {
        path: '/service/equipmentcard',
        element: <ProtectedRoute><EquipmentCard /></ProtectedRoute>
    },
    {
        path: '/service/createcontract',
        element: <ProtectedRoute><CreateServiceContract /></ProtectedRoute>
    },
    {
        path: '/service/contract',
        element: <ProtectedRoute><ServiceContract /></ProtectedRoute>
    },
    {
        path: '/service/createrepair',
        element: <ProtectedRoute><CreateRepairOrder /></ProtectedRoute>
    },
    {
        path: '/service/repairorder',
        element: <ProtectedRoute><RepairOrder /></ProtectedRoute>
    },
])
function App() {
  const {loading} = useSelector((state) => state.alerts)
    const [state, dispatch] = useReducer(reducer, initialState);

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
        <QuickbookContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            <RouterProvider router={router}/>
        </QuickbookContext.Provider>
    </div>
  );
}

export default App;
