import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCustomer} from "../../redux/slices/customerSlice";
import {useNavigate} from "react-router-dom";

export const FilteredResultsModal = ({setShowFilteredResultsModal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const filteredResults = useSelector((state) => state.filteredResults).filteredResults
    const status = useSelector((state) => state.filteredResults).filterName
    console.log(filteredResults, status, 'companies')
    const handleClose = () => {
        setShowFilteredResultsModal(false)
    }
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
        dispatch(setCustomer(params.data))
        navigate('/crm/customerprofile')

    }
    return (
        <div className="modal">
            <div className="form-content">
                <i className="ri-close-circle-line" onClick={handleClose}></i>
                <h1 className='layout-title mt-3 mb-9'>{status} Companies</h1>
            <div className='mt-3'>
                <div className="ag-theme-alpine" style={{ height: '30rem', width: '100%' }}>
                    <AgGridReact rowData={filteredResults} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                </div>
            </div>
            </div>
        </div>
    )
}
