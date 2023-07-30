import {Layout} from "../layout/Layout";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import React, {useEffect, useState} from "react";
import {setCustomer} from "../../redux/slices/customerSlice";
import {AddNewVendorModal} from "../../modals/vendors/AddNewVendorModal";
import './vendors.css'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useDispatch} from "react-redux";

export const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [showAddNewVendorModal, setShowAddNewVendorModal] = useState(false)
    const columnDefs = [

        {
            headerName: "Company Name",
            field: "company_name",
        },
        {
            headerName: "First Name",
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Email",
            field: "email",
        },
        {
            headerName: "Phone Number",
            field: "phone_1",
        },
        {
            headerName: "Customer Type",
            field: "customer_type",
        },
        {
            headerName: "Status",
            field: "status",
        },
    ];
    const dispatch = useDispatch()

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id

    const getVendorsData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/vendor/get-all-vendors-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setVendors(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
    };

    useEffect(() => {
        getVendorsData()
    }, []);

    return (
        <>
            <Layout />
            <div className="layout">
            <div className='crm-top mb-4'>
                <div className='actions'>
                    <i className="ri-user-add-line" onClick={() => setShowAddNewVendorModal(true)}></i>
                    <i className="ri-search-line ml-1" onClick={() => {}}></i>
                </div>
            </div>
                {showAddNewVendorModal && <AddNewVendorModal setShowAddNewVendorModal={setShowAddNewVendorModal} getVendorsData={getVendorsData}/>}
                {/*{inventory && inventory.length > 0 ? (*/}
                    <div>
                        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                            <AgGridReact rowData={vendors} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                {/*) : (*/}
                {/*    <div>...Data is Loading</div>*/}
                {/*)}*/}
            </div>
        </>
    )
}
