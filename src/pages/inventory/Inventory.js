import {Layout} from "../layout/Layout";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import React, {useState} from "react";
import {setCustomer} from "../../redux/slices/customerSlice";
import {AddNewVendorModal} from "../../modals/vendors/AddNewVendorModal";
import './inventory.css'

export const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [showAddNewVendorModal, setShowAddNewVendorModal] = useState(false)
    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
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

    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
    };

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
                {showAddNewVendorModal && <AddNewVendorModal setShowAddNewVendorModal={setShowAddNewVendorModal}/>}
                {/*{inventory && inventory.length > 0 ? (*/}
                    <div>
                        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                            <AgGridReact rowData={inventory} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                {/*) : (*/}
                {/*    <div>...Data is Loading</div>*/}
                {/*)}*/}
            </div>
        </>
    )
}
