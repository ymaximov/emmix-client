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
import {url} from '../../connections/toServer'
import {ReceivingWarning} from "../../modals/purchasing/ReceivingWarning";
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {UpdateLineItemModal} from "../../modals/purchasing/UpdateLineItemModal";
import {purple} from "@mui/material/colors";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const Delivery = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const navigate = useNavigate()
    const delivery = useSelector((state) => state.sales).deliveryData
    console.log(delivery, 'Delivery')



    const dispatch = useDispatch()
    const currency = '$'
    const [showRQModal, setShowRQModal] = useState(false)
    const [showReceivingWarning, setShowReceivingWarning] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [selectedItemID, setSelectedItemID] = useState()




    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Item Name",
            field: "inventoryItem.item_name",
        },
        {
            headerName: `SKU`,
            field: "inventoryItem.manuf_sku",
        },
        {
            headerName: "Quantity on SO",
            field: "so_quantity",
        },
        {
            headerName: "Remaining Quantity",
            field: "remaining_quantity",
        },
        {
            headerName: "In Stock",
            field: "stockData.in_stock",
        },
        {
            headerName: "Quantity to Deliver",
            field: "delivered_quantity",
        },

    ];
    const handleCellClicked = (event) => {

            setSelectedItem(event.data);
            setSelectedItemID(event.data.id);
            setShowRQModal(true);
            console.log(event.data.id, 'event data ID');

    };

    const handleSubmit = async () => {
        let hasDiscrepancy = false; // Flag to track discrepancies



        if (hasDiscrepancy) {
            // Show a warning if there's a discrepancy
            setShowReceivingWarning(true);
        } else {
            // If there are no discrepancies, proceed with the API request
            const dataToPost = {
                // warehouseId: goodsReceiptData.warehouse_id,
                // goodsReceiptId: goodsReceiptData.id,
            };

            try {
                const res = await axios.put(`${url}/api/inventory/update-inventory-gr`, dataToPost, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 200) {
                    // Form data submitted successfully, handle success case here
                    toast.success('Inventory Has Been Received');
                    navigate('/purchasing');
                } else {
                    toast.error(res.response.data.error);
                    console.error('An error occurred:', res.response.data.error);
                }
            } catch (error) {
                toast.error('An error occurred while submitting the form');
                console.error('An error occurred:', error);
            }
        }
    };






    useEffect(() => {

    }, []);

    return (
        <>
            <Layout />
            <h1 className={'mb-1 ml-2 title'}>Delivery {delivery?.delivery.id}</h1>
            <div className="layout">
                 <i className="ri-checkbox-fill mb-1" onClick={handleSubmit}></i>
                {showRQModal && <ReceivingQuantity setShowModal={setShowRQModal} selectedItem={selectedItem} itemID={selectedItemID}/>}


                <div className={'po-details'}>
                    <h1 className={'mt-1'}>Status: {delivery?.delivery.status}</h1>
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
                        <AgGridReact rowData={delivery?.deliveryItems} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    {/*<div className={'mt-4'}>*/}
                    {/*    {goodsReceiptData.status === 'open' && (*/}
                    {/*        <button*/}
                    {/*            type="button"*/}
                    {/*            className="mt-6 mb-3 ml-2 rounded-md bg-blue-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                    {/*            onClick={handleSubmit}*/}
                    {/*        >*/}
                    {/*            Execute*/}
                    {/*        </button>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <div className={'mt-2'}>
                        <h1>Based on SO No. {delivery?.delivery.so_id}</h1>
                        {/*<h1>Buyer: {goodsReceiptData?.user.first_name} {goodsReceiptData?.user.last_name}</h1>*/}

                    </div>
                </div>
            </div>
        </>
    )
}