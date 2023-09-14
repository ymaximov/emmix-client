import {Layout} from "../layout/Layout";
import React, {useEffect, useState} from "react";
import './purchasing.css'
import {useNavigate} from "react-router-dom";
import {clearVendor, setVendor} from "../../redux/slices/vendorSlice";
import {useDispatch} from "react-redux";
import {
    clearOrder,
    clearSelectedItem,
    clearPrice,
    clearWarehouse,
    clearQuantity,
    clearDueDate,
    setPoId
} from "../../redux/slices/purchaseOrderSlice";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {SearchPO} from '../../modals/purchasing/SearchPO'

export const Purchasing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const [PO, setPO] = useState()
    const [showSearchPO, setShowSearchPO] = useState(false)

    const columnDefs = [

        {
            headerName: "PO No.",
            field: "id",
        },
        {
            headerName: "Buyer",
            field: "user.first_name",
        },
        {
            headerName: "Vendor",
            field: "vendor.company_name",
        },
        {
            headerName: "Ship-To",
            field: "warehouse.warehouse_name",
        },
        {
            headerName: "PO Total",
            field: "total_amount",
        },
        {
            headerName: "Invoiced",
            field: "invoice_status",
        },

    ];
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        dispatch(setPoId(params.data.id))
        navigate('/purchasing/purchaseorder')
    };

    const getPOData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/purchasing/get-all-po-by-tenant/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res, 'RES')
                setPO(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const filteredPO = PO?.filter(item => item.status === 'open');
    // console.log(filteredPO, 'FILTERED')
    useEffect(() => {
        getPOData()
    }, []);
    return (
        <>
        <Layout />
            <div className="layout">
                {showSearchPO && <SearchPO setShowSearchPO={setShowSearchPO} POData={PO} />}
                <div className='actions'>
                    <i className="ri-file-add-line add-po mr-2" onClick={() => {
                        dispatch(clearVendor())
                        dispatch(clearOrder())
                        dispatch(clearWarehouse())
                        dispatch(clearDueDate())
                        dispatch(clearSelectedItem())
                        dispatch(clearPrice())
                        dispatch(clearQuantity())
                        navigate('/purchasing/createpo')}
                    }></i>
                    <i className="ri-search-line" onClick={() => setShowSearchPO(true)}></i>
                    <i className="ri-download-line"
                    onClick={()=> navigate('/purchasing/goodsreceipt')}
                    ></i>
                </div>
                <div>
                    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                        <AgGridReact rowData={PO} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                    </div>
                </div>
            </div>
        </>
    )
}
