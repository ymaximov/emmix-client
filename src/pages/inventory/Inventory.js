import {Layout} from "../layout/Layout";
import React, {useEffect, useState} from "react";
import './inventory.css'
import {AddNewInventoryItemModal} from "../../modals/inventory/addNewInventoryItemModal";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useDispatch} from "react-redux";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {setVendor} from "../../redux/slices/vendorSlice";
import {useNavigate} from "react-router-dom";
import {setItem} from "../../redux/slices/inventoryItemSlice";
import {SearchModal} from '../../modals/inventory/searchModal'
export const Inventory = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const [inventory, setInventory] = useState()
    const [showAddNewInventoryItemModal, setShowAddNewInventoryItemModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSearchModal, setShowSearchModal] = useState(false)

    const getInventoryData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-inventory-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setInventory(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    const columnDefs = [

        {
            headerName: "Item Name",
            field: "item_name",
        },
        {
            headerName: "Description",
            field: "item_description",
        },
        {
            headerName: "Item Type",
            field: "item_type",
        },
        {
            headerName: "SKU",
            field: "manuf_sku",
        },

        {
            headerName: "In Stock",
            field: "email",
        },
        // {
        //     headerName: "Vendor Type",
        //     field: "vendor_type",
        // },
        {
            headerName: "Status",
            field: "status",
        },
    ];
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        dispatch(setItem(params.data))
        navigate('/inventory/itemprofile')
    };

    useEffect(() => {
        getInventoryData()
    }, []);

    return (
        <>
        <Layout />
            <div className="layout">
                <div className='inv-top mb-4'>
                    <div className='actions'>
                        <i className="ri-user-add-line" onClick={() => setShowAddNewInventoryItemModal(true)}></i>
                        <i className="ri-search-line ml-1" onClick={() => setShowSearchModal(true)}></i>
                    </div>
                    {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} inventory={inventory}/>}
                    {showAddNewInventoryItemModal && <AddNewInventoryItemModal getInventoryData={getInventoryData} setShowAddNewInventoryItemModal={setShowAddNewInventoryItemModal}/>}
                    <div>
                        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                            <AgGridReact rowData={inventory} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
