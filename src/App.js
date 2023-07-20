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
        element: <ProtectedRoute><AdminRoute><Onboarding /></AdminRoute></ProtectedRoute>
    },
    {
        path: '/admin/companies',
        element: <ProtectedRoute><AdminRoute><Tenants /></AdminRoute></ProtectedRoute>
    },

])
function App() {
  const {loading} = useSelector((state) => state.alerts)


  return (
    <div>
        {loading && (
            <div className="spinner-parent">
                <div className="spinner-border" role="status">
                    {/* <span class="sr-only">Loading...</span> */}
                </div>
            </div>
        )}
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
