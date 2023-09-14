import {Layout} from '../layout/Layout'
import {useSelector, useDispatch} from "react-redux";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import DatePicker from "react-datepicker";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {ReceivingQuantity} from "../../modals/purchasing/ReceivingQuantity";
import './purchasing.css'
import {
    setSelectedItem,
    setPoDetails,
    addItem,
    setPoId,
    setQuantity,
    setPrice
} from "../../redux/slices/purchaseOrderSlice";
import {AddItemModal} from "../../modals/purchasing/AddItemModal";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import './purchasing.css'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import generatePDF from "./generatePDF";
import {UpdateLineItemModal} from "../../modals/purchasing/UpdateLineItemModal";
import {purple} from "@mui/material/colors";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const Receiving = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const navigate = useNavigate()
    const goodsReceiptData = useSelector((state) => state.purchaseOrder).GR.goodsReceipt
    console.log(goodsReceiptData, 'GR DATA')
    const dispatch = useDispatch()
    const currency = '$'
    const [showRQModal, setShowRQModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [selectedItemID, setSelectedItemID] = useState()




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
            headerName: "Quantity on PO",
            field: "quantity",
        },
        {
            headerName: "Quantity to Receive",
            field: "received_quantity",
        },

    ];
    const handleCellClicked = (event) => {
        setSelectedItem(event.data)
        setSelectedItemID(event.data.id)
        setShowRQModal(true)
        console.log(event.data.id, 'event data ID')

    }


    useEffect(() => {

    }, []);

    return (
        <>
            <Layout />
            <div className="layout">
                {showRQModal && <ReceivingQuantity setShowModal={setShowRQModal} selectedItem={selectedItem} itemID={selectedItemID}/>}
                <h1 className={'mb-3 title'}>Goods Receipt PO</h1>
                <div className={'po-details'}>
                    <h1 className={'mt-1'}>Goods Receipt No. {goodsReceiptData?.id}</h1>
                    <h1 className={'mt-1'}>Status: {goodsReceiptData?.status}</h1>
                </div>
{/*div                <Row gutter={20} className='mt-7 mb-3'>*/}
{/*                    <Col span={8} xs={240} s={24} lg={8}>*/}
{/*                        <div className='vendor-details-title'>Vendor Name</div>*/}
{/*                        <div>{goodsReceiptData?.vendor.company_name}</div>*/}
{/*                        <div className='vendor-details-title'>Contact Name</div>*/}
{/*                        <div>{goodsReceiptData?.vendor.first_name} {goodsReceiptData?.vendor.last_name}</div>*/}
{/*                    </Col>*/}
{/*                    <Col span={8} xs={240} s={24} lg={8}>*/}
{/*                        <div className='vendor-details-title'>Contact Email</div>*/}
{/*                        {goodsReceiptData?.vendor.email}*/}
{/*                        <div className='vendor-details-title'>Contact Phone</div>*/}
{/*                        {goodsReceiptData?.vendor.contact_phone}*/}
{/*                    </Col>*/}

{/*                    <Col span={8} xs={240} s={24} lg={8}>*/}
{/*                        <div>*/}
{/*                            <div>*/}
{/*                                /!*Ship-to Warehouse: {goodsReceiptData?.warehouse.warehouse_name}*!/*/}
{/*                            </div>*/}



{/*                        </div>*/}

{/*                        <div>*/}
{/*                            <div>*/}
{/*                                /!*Due Date: {poData.due_date}*!/*/}
{/*                            </div>*/}

{/*                        </div>*/}
{/*                        <div>*/}

{/*                        </div>*/}

{/*                    </Col>*/}




                {/*</Row>*/}
                <div className='mt-6'>
                    <div className="ag-theme-alpine" style={{ height: '20rem', width: '100%' }}>
                        <AgGridReact rowData={goodsReceiptData?.items} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className={'mt-4'}>
                        <button
                            type="button"
                            className="mt-6 mb-3 ml-2 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // onClick={getPurchaseOrderDataAndItems}
                        >
                           Execute
                        </button>
                    </div>
    <div className={'mt-2'}>
        <h1>Based on PO No. {goodsReceiptData?.po_id}</h1>
        {/*<h1>Buyer: {goodsReceiptData?.user.first_name} {goodsReceiptData?.user.last_name}</h1>*/}

    </div>
                </div>
            </div>
        </>
    )
}
