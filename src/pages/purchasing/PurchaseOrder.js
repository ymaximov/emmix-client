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
import {
    setSelectedItem,
    setPoDetails,
    addItem,
    setPoData,
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
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const PurchaseOrder = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
const navigate = useNavigate()
    const poData = useSelector((state) => state.purchaseOrder.poData)
    console.log(poData, 'PO DATA')
    const POID = useSelector((state) => state.purchaseOrder.po_id)
    console.log(POID)
    const dispatch = useDispatch()
    const currency = '$'
    const [warehouses, setWarehouses] = useState()
    const [selectedWarehouse, setSelectedWarehouse] = useState()
    const [vendors, setVendors] = useState([]);
    const [dueDate, setDueDate] = useState(new Date());
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const salesTaxRate = 17
    const purchaseOrder = useSelector(state => state.purchaseOrder)

    const [inventory, setInventory] = useState()
    const [showSelectedItemModal, setShowSelectedItemModal] = useState(false)
    const [showUpdateLineItemModal, setShowUpdateLineItemModal] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState()
    const [selectedQuantity, setSelectedQuantity] = useState()
    const [itemKey, setItemKey] = useState()
    const [itemName, setItemName] = useState()
    const [invItemNo, setInvItemNo] = useState()
    const totalPrices = poData.purchase_order_items.map((item) => item.total_price);

// Use the reduce function to calculate the sum of total_prices
    const subTotal = totalPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const salesTaxAmount = (subTotal * salesTaxRate) / 100;
    const grandTotal = subTotal + salesTaxAmount;
    const formattedSubTotal = subTotal.toFixed(2);
    const formattedSalesTaxAmount = salesTaxAmount.toFixed(2);
    const formattedGrandTotal = grandTotal.toFixed(2);

    console.log(POID, 'PO ID')
    const handleAddToOrder = (item) => {
    };
    const getPOData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/purchasing/get-po-by-id/${POID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res.data, 'RES')
                // setDueDate(poData?.due_date)
                dispatch(setPoData(res.data.purchaseOrder))

            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
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
    const activeInventory = inventory?.filter(inventory => inventory.status === 'active');
    const inventoryList = activeInventory?.filter(inventory => inventory.purchasing_item === true);
    const handleDueDateChange = (date, dateString) => {
        setDueDate(date);
        // dispatch(setDueDate(dueDate))
    };





    const getWarehouses = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-warehouses/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setWarehouses(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
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
    const handleWarehouseChange = (event) => {
        console.log(event.target.value, 'Event')
        // const value = parseInt(event.target.value);
        setSelectedWarehouse(event.target.value)
    };
    const vendor = poData.vendor

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
            headerName: `Price Per Unit ${currency}`,
            field: "unit_price",
        },
        {
            headerName: `Total Price`,
            field: "total_price",
        },

    ];
    const handleCellClicked = (event) => {
        console.log(event, 'EVENT')
        setItemKey(event.data.id)
        setInvItemNo(event.data.inv_item_id)
        setItemName(event.data.inventory_item.item_name)
        setSelectedQuantity(event.data.quantity)
        setSelectedPrice(event.data.unit_price)
     setShowUpdateLineItemModal(true)

    }
    // const POItems = poData.purchase_order_items
    // console.log(POItems)

    const dataToPost = {
        tenant_id: tenantId,
        warehouse_id: selectedWarehouse,
        due_date: dueDate,
        subtotal: formattedSubTotal,
        sales_tax: formattedSalesTaxAmount,
        total_amount: formattedGrandTotal
    }
    console.log(selectedWarehouse, 'Selected Warehouse')
    const handleSubmit = async () => {

        try {
            const res = await axios.post("/api/purchasing/create-purchase-order", dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                console.log('PO ID', res.data)
                dispatch(setPoId(res.data.data))
                navigate('/purchasing/purchaseorder')
            } else {
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
            }
        } catch (error) {
            toast.error('Please fill out all required fields')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };

    const handleGeneratePDF = async () => {
        if (!poData) {
            return;
        }

        try {
            const pdfBlob = await generatePDF(poData);
            const pdfObjectURL = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new tab
            window.open(pdfObjectURL, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    console.log(dueDate, 'DUE DATE')
    const updatePO = async() => {
        const updatedData = {
            warehouse_id: selectedWarehouse == undefined ? poData.warehouse_id : selectedWarehouse,
            due_date: dueDate == undefined ? poData.due_date : dueDate,
            po_id: POID
        }
        try {
            const res = await axios.put("/api/purchasing/update-po", updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                getPOData()
            } else {
                toast.error(res.response.data.error)
                // console.error('Please fill out all required data');
            }
        } catch (error) {
            toast.error('')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        getPOData()
        getWarehouses()
        getVendorsData()
        getInventoryData()
    }, []);

    return (
        <>
            <Layout />
            <div className="layout">
                {showAddItemModal && <AddItemModal warehouse={poData.warehouse_id} inventory={inventoryList} getPOData={getPOData} tenantID={tenantId} POID={POID} setShowSelectedItemModal={setShowSelectedItemModal} setShowAddItemModal={setShowAddItemModal} handleAddToOrder={handleAddToOrder}/>}
                {showUpdateLineItemModal && <UpdateLineItemModal invItemNo={invItemNo} tenantId={tenantId} warehouse={poData.warehouse_id} getPOData={getPOData} itemName={itemName} setShowUpdateLineItemModal={setShowUpdateLineItemModal} itemKey={itemKey} selectedQuantity={selectedQuantity} selectedPrice={selectedPrice}/>}
                <i className="ri-printer-line" onClick={handleGeneratePDF}></i>
                <i className="ri-mail-send-line"></i>
                <i className="ri-delete-bin-line"></i>
                <div className={'po-details'}>
                <h1 className={'mt-1'}>Purchase Order No. {poData.id}</h1>
                <h1 className={'mt-1'}>Status: {poData.status} | not invoiced</h1>
                </div>
                <Row gutter={20} className='mt-7 mb-3'>
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

                    <Col span={8} xs={240} s={24} lg={8}>
                        <div>
                            <label htmlFor="warehouse_id" className="block text-sm font-medium leading-6 text-gray-900">
                                Ship-to Warehouse: {poData.warehouse.warehouse_name}
                            </label>
                            <select
                                id="warehouse_id"
                                name="warehouse"
                                // value={poData.warehouse_id}
                                onChange={handleWarehouseChange}
                                required // Add the required attribute
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value=''>Update Warehouse (Select an Option)</option>
                                {warehouses?.map((wh) => (
                                    <option key={wh.id} value={wh.id}>
                                        {wh.warehouse_name}
                                    </option>
                                ))}
                            </select>
                            {/* Conditional rendering for error message */}
                            {/*{purchaseOrder.warehouse === '' && (*/}
                            {/*    <div className="text-red-500 text-sm mt-1">Warehouse is required</div>*/}
                            {/*)}*/}
                        </div>

                        <div>
                            <label htmlFor="order_date" className="block text-sm font-medium leading-6 text-gray-900">
                                Due Date: {poData.due_date}
                            </label>
                            <DatePicker
                                id="due_date"
                                // selected={dueDate}
                                selected={dueDate}

                                onChange={handleDueDateChange}
                                dateFormat="yyyy-MM-dd" // Adjust the date format as needed
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                    </Col>



                </Row>
                <div className="d-flex justify-content-end mt-7">
                    <i className="ri-add-circle-line" onClick={() => setShowAddItemModal(true)}></i>

                </div>
                <div className=''>
                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                        <AgGridReact rowData={poData.purchase_order_items} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className={'mt-4'}>
                        <button
                            type="button"
                            className="mt-6 mb-3 ml-2 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={updatePO}
                        >
                            Update PO
                        </button>
                    </div>
                    <div className="totals mt-2">
                        <div>Subtotal: {currency}{formattedSubTotal}</div>
                        <div>Sales Tax/VAT: {currency}{formattedSalesTaxAmount}</div>
                        <div>Total: {currency}{formattedGrandTotal}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
