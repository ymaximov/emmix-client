import {Layout} from '../layout/Layout'
import React, {useEffect, useState} from "react";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {setPoData} from "../../redux/slices/purchaseOrderSlice";
import {useDispatch, useSelector} from "react-redux";
import './sales.css'
import {Row, Col} from 'antd'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {AddItemToSQModal} from "../../modals/sales/AddItemToSQ";
import {UpdateLineItemSQ} from "../../modals/sales/UpdateLineItemSQ";

export const OldViewSQ = () => {
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const SQID = useSelector((state) => state.sales).sqID
    const [SQData, setSQData] = useState()
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [showUpdateItemModal, setShowUpdateItemModal] = useState(false)
    const [inventory, setInventory] = useState()
    console.log(SQData, 'SALES QUIOTE DATA')
    console.log(SQID, 'SQ ID')
    const salesTax = SQData?.sales_tax
    const subtotal = SQData?.subtotal
    const grandTotal = SQData?.total_amount
    const formattedSubTotal = subtotal?.toFixed(2);
    const formattedSalesTaxAmount = salesTax?.toFixed(2);
    const formattedGrandTotal = grandTotal?.toFixed(2);
    const currency = '$'
    const [selectedQuantity, setSelectedQuantity] = useState()
    const [selectedPrice, setSelectedPrice] = useState()
    const [lineItemID, setLineItemID] = useState()

    const handleCellClicked = (event) => {
        console.log(event, 'EVENT');
        setSelectedQuantity(event.data.quantity)
        setSelectedPrice(event.data.unit_price)
        setLineItemID(event.data.id)
        setShowUpdateItemModal(true)

    }

    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Item No.",
            field: "inv_item_id",
        },
        {
            headerName: "Item Name",
            field: "inventory_item.item_name",
        },
        {
            headerName: `SKU`,
            field: "inventory_item.manuf_sku",
        },
        {
            headerName: "Quantity",
            field: "quantity",
        },
        {
            headerName: `Price Per Unit`,
            field: "unit_price",
        },
        {
            headerName: `Total Price`,
            field: "total_price",
        },

    ];
    const getSQData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/sales/get-sq-by-id/${SQID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res.data, 'RES')
                setSQData(res.data.salesQuotation)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    const getInventoryData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/inventory/get-inventory-by-tenant-id/${tenantId}`, {
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

    useEffect(() => {
   getSQData()
        getInventoryData()

    }, []);
    return (
        <>
        <Layout />
            <div className="layout">
                {showAddItemModal && <AddItemToSQModal showModal={setShowAddItemModal} inventory={inventory} getSQData={getSQData} sqData={SQData}/>}
                {showUpdateItemModal && <UpdateLineItemSQ getSQData={getSQData} itemID={lineItemID} showModal={setShowUpdateItemModal} quantity={selectedQuantity} price={selectedPrice}/>}
                <i className="ri-printer-line" onClick={''}></i>
                <i className="ri-mail-send-line"></i>
                <i className="ri-delete-bin-line" onClick={''}></i>
                <div className={'font-bold'}>Step 2/2: Add items to sales quotation</div>
                <div className={'po-details'}>
                    <h1 className={'mt-1'}>Sales Quotation No. {SQData?.id}</h1>
                    {/*{POISVoid && <div className={'voided'}>Purchase Order Is Void</div>}*/}
                    <h1 className={'mt-1'}>Status: {SQData?.status} | not invoiced</h1>
                </div>
                <Row gutter={20} className='mt-4 mb-1'>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Customer Name</div>
                        <div>{SQData?.customer.company_name}</div>
                        <div className='vendor-details-title'>Contact Name</div>
                        <div>{SQData?.customer.first_name} {SQData?.customer.last_name}</div>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Contact Email</div>
                        <div>{SQData?.customer.email}</div>
                        <div className='vendor-details-title'>Contact Phone</div>
                        <div>{SQData?.customer.contact_phone}</div>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Posting Date</div>
                        <div>{SQData?.posting_date}</div>
                        <div className='vendor-details-title'>Due Date</div>
                        <div>{SQData?.due_date}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title mt-3'>Customer Reference</div>
                        <div>{SQData?.reference}</div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end mt-1">
                    <i className="ri-add-circle-line" onClick={() => setShowAddItemModal(true)}></i>


                </div>
                <div className='mt-1'>
                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                        <AgGridReact rowData={SQData?.sales_quotation_items} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                    </div>
                </div>
                <div className="totals mt-2">
                    <div>Subtotal: {currency}{formattedSubTotal}</div>
                    <div>Sales Tax/VAT: {currency}{formattedSalesTaxAmount}</div>
                    <div>Total: {currency}{formattedGrandTotal}</div>
                </div>
            </div>
        </>
    )
}
