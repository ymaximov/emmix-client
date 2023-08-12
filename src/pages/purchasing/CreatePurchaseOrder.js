import {Layout} from '../layout/Layout'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {setItem} from "../../redux/slices/inventoryItemSlice";
import React, {useEffect, useState} from "react";
import {Row, Col} from 'antd'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {SearchVendorModal} from '../../modals/purchasing/SearchVendorModal'
import './purchasing.css'
// import {addItemToOrder, removeItemFromOrder, clearOrder} from '../../redux/slices/purchaseOrderSlice'
import {SearchItemModal} from "../../modals/purchasing/SearchItemModal";
import {addItem, removeItem} from "../../redux/slices/purchaseOrderSlice";
import {selectedItemModal} from "../../modals/inventory/selectedItemDetails";
import {selectedItem} from '../../redux/slices/alertsSlice'
import {clearOrder} from "../../redux/slices/purchaseOrderSlice";

export const CreatePurchaseOrder = () => {
    const [showSearchVendorModal, setShowSearchVendorModal] = useState(false)
    const [showSearchItemModal, setShowSearchItemModal] = useState(false)
    const [showSelectedItemModal, setShowSelectedItemModal] = useState(false)
    const [vendors, setVendors] = useState([]);
    const dispatch = useDispatch()
    const purchaseOrder = useSelector(state => state.purchaseOrder)
    const [inventory, setInventory] = useState()


    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const vendor = useSelector((state) => state.vendor).vendor

    const purchaseOrderItems = useSelector((state) => state.purchaseOrder).items
    console.log(vendor, 'VENDOR')
    const currency = '$'
    const items = useSelector(state => state.purchaseOrder.items);


    // Calculate the total price using reduce()
    const salesTax = 17
    const quantity = useSelector((state) => state.purchaseOrder.items)
    const salesTaxRate = vendor.sales_tax == 'liable' ? salesTax : 0
    const subTotal = items.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0);
    const salesTaxAmount = (subTotal * salesTaxRate) / 100;
    const grandTotal = subTotal + salesTaxAmount;
    const formattedSubTotal = subTotal.toFixed(2);
    const formattedSalesTaxAmount = salesTaxAmount.toFixed(2);
    const formattedGrandTotal = grandTotal.toFixed(2);

    const handleAddToOrder = (item) => {
      dispatch(addItem(item))
    };

    const handleRemoveFromOrder = (itemId) => {
        dispatch(removeItem(itemId));
    };
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
    const activeVendors = vendors?.filter(vendor => vendor.status === 'active');
    console.log(activeVendors, 'ACTIVE VENDORTS')


    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Item No.",
            field: "selectedItemId",
        },
        {
            headerName: "Item Name",
            field: "selectedItemName",
        },
        {
            headerName: `Price Per Unit ${currency}`,
            field: "price",
            editable: true
        },
        {
            headerName: "Quantity",
            field: "quantity",
            editable: true
        },
        {
            headerName: "Warehouse ID",
            field: "warehouse",
            editable: true
        },
        {
            headerName: 'Actions',
            cellRendererFramework: (params) => (
                <button onClick={"() => onRemoveItem(params.data.id)"}>Remove</button>
            ),
        },
    ];

    // const handleAddToOrder = (item) => {
    //     dispatch(addItemToOrder(item));
    // };
    //
    // const handleRemoveFromOrder = (itemId) => {
    //     dispatch(removeItemFromOrder(itemId));
    // };
    //
    // const handleClearOrder = () => {
    //     dispatch(clearOrder());
    // };

    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);

    }
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
    const activeInventory = inventory?.filter(vendor => vendor.status === 'active');
    useEffect(() => {
        getVendorsData()
        getInventoryData()
    }, []);


    return (
        <>
            <Layout />
            <div className="layout">
                <h1 className={'heading mb-3'}>Create Purchase Order</h1>
                {showSearchVendorModal && <SearchVendorModal setShowSearchVendorModal={setShowSearchVendorModal} vendors={activeVendors}/>}
                {showSearchItemModal && <SearchItemModal inventory={activeInventory} setShowSelectedItemModal={setShowSelectedItemModal} setShowSearchItemModal={setShowSearchItemModal} handleAddToOrder={handleAddToOrder}/>}
                {showSelectedItemModal && <selectedItemModal />}
                <div className="d-flex justify-content-end">
                    <i className="ri-user-add-line" onClick={() => setShowSearchVendorModal(true)}></i>
                </div>
                <Row gutter={20} className='mt-5 mb-4'>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Vendor Name</div>
                        <div>{vendor?.company_name}</div>
                        <div className='vendor-details-title'>Contact Name</div>
                        <div>{vendor?.first_name} {vendor?.last_name}</div>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Contact Email</div>
                        <div>{vendor?.email}</div>
                        <div className='vendor-details-title'>Contact Phone</div>
                        <div>{vendor?.contact_phone}</div>
                    </Col>


                </Row>
                <div className="d-flex justify-content-end">
                    <i className="ri-add-circle-line" onClick={() => setShowSearchItemModal(true)}></i>

                </div>
                <div className='mt-3'>
                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                        <AgGridReact rowData={purchaseOrderItems} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                    </div>
                </div>
                <div className={'totals mt-2'}>
                    <div>Subtotal: {currency}{formattedSubTotal}</div>
                    <div>Sales Tax/VAT: {currency}{formattedSalesTaxAmount}</div>
                    <div>Total: {currency}{formattedGrandTotal}</div>
                </div>
            </div>
        </>
    )
}
