import {Layout} from '../layout/Layout'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {setItem} from "../../redux/slices/inventoryItemSlice";
import React, {useEffect, useState} from "react";
import {Row, Col, Tabs} from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {SearchVendorModal} from '../../modals/purchasing/SearchVendorModal'
// import {addItemToOrder, removeItemFromOrder, clearOrder} from '../../redux/slices/purchaseOrderSlice'
import {SearchItemModal} from "../../modals/purchasing/SearchItemModal";
import {useNavigate} from "react-router-dom";
import {AddItemModal} from "../../modals/purchasing/AddItemModal";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './sales.css'

import {
    addItem,
    removeItem,
    setDueDate,
    setSelectedItem,
    setWarehouse,
    updatePriceAndQuantity,
    setPoId, setPoData
} from "../../redux/slices/purchaseOrderSlice";
import {selectedItemModal} from "../../modals/inventory/selectedItemDetails";
import {selectedItem} from '../../redux/slices/alertsSlice'
import {clearOrder} from "../../redux/slices/purchaseOrderSlice";
// import { Formik, Form, Field, ErrorMessage} from "formik";
import { setDefaultLocale } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import toast from "react-hot-toast";
import {SelectedItemModal} from "../../modals/purchasing/SelectedItemModal";
import {url} from "../../connections/toServer";
import {UpdateLineItemModal} from "../../modals/purchasing/UpdateLineItemModal";
import {AddItemToSQModal} from "../../modals/sales/AddItemToSQ";
import {UpdateLineItemSQ} from "../../modals/sales/UpdateLineItemSQ";
import {setSOID} from "../../redux/slices/salesSlice";

export const SalesQuotation = () => {
    const [showUpdateLineItemModal, setShowUpdateLineItemModal] = useState(false)
    const [showSearchVendorModal, setShowSearchVendorModal] = useState(false)
    const [showSearchItemModal, setShowSearchItemModal] = useState(false)
    const [showSelectedItemModal, setShowSelectedItemModal] = useState(false)
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [showUpdateItemModal, setShowUpdateItemModal] = useState(false)
    const [lineItemID, setLineItemID] = useState()
    const [selectedQuantity, setSelectedQuantity] = useState()
    const [selectedPrice, setSelectedPrice] = useState()
    const [warehouses, setWarehouses] = useState()
    const [inventory, setInventory] = useState()
    const [SQData, setSQData] = useState()
    const dispatch = useDispatch()
    const invoiceStatus = SQData?.invoiced == 'true' ? 'invoiced' : 'not invoiced'

    const navigate = useNavigate()
    const POID = useSelector((state) => state.purchaseOrder.po_id)
    console.log(POID, 'PO ID')
    const handleDueDateChange = (date, dateString) => {
        setDueDate(date);
        // dispatch(setDueDate(dueDate))
    };



    const token = JSON.parse(localStorage.getItem('token')).access_token
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const email = JSON.parse(localStorage.getItem('token')).email
    const firstName = JSON.parse(localStorage.getItem('token')).first_name
    const lastName = JSON.parse(localStorage.getItem('token')).last_name
    const phone = JSON.parse(localStorage.getItem('token')).phone
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const buyer = JSON.parse(localStorage.getItem('token'))
    const vendor = useSelector((state) => state.vendor).vendor
    const [poData, setPoData] = useState(null)
    const [items, setItems] = useState([])
    const SQID = useSelector((state) => state.sales).sqID
    const [item, setItem] = useState()
    const handleWarehouseChange = (event) => {
        const value = parseInt(event.target.value);
        dispatch(setWarehouse(value))
    };

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
                console.log(res.data, 'RES QL DATA')
                setSQData(res.data.salesQuotation)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    console.log(warehouses, 'WAREHOUSES')

    const purchaseOrderItems = useSelector((state) => state.purchaseOrder).items
    console.log(vendor, 'VENDOR')
    const currency = '$'


    // Calculate the total price using reduce()
    const salesTax = 17




    const [reference, setReference] = useState('');

    const handleChange = (e) => {
        setReference(e.target.value);
    };

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
            headerName: "Quantity",
            field: "quantity",
        },
        {
            headerName: `Price Per Unit ${currency}`,
            field: "unit_price",
        },
        {
            headerName: `Warehouse`,
            field: "warehouse.warehouse_name",
        },
    ];




        const handleCellClicked = (event) => {
            console.log(event, 'EVENT');
            setSelectedQuantity(event.data.quantity)
            setSelectedPrice(event.data.unit_price)
            setLineItemID(event.data.id)
            setItem(event.data)
            setShowUpdateItemModal(true)
        }






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
    const activeInventory = inventory?.filter(inventory => inventory.status === 'active');
    const inventoryList = activeInventory?.filter(inventory => inventory.purchasing_item === true);



    const handleSubmit = async () => {

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/purchasing/create-purchase-order`, "dataToPost",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                console.log('PO Data', res.data)
                // dispatch(setPoId(res.data.data))
                setPoData(res.data.data)
                dispatch(setPoId(res.data.data.createdPurchaseOrder.id))
                // navigate('/purchasing/purchaseorder')
            } else {
                dispatch(hideLoading())
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Please fill out all required fields')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };



    const voidPO = async (values) => {
        try {
            dispatch(showLoading())
            const URL = `${url}/api/purchasing/void-po`;

            // Create the request body
            const requestBody = {
                tenant_id: tenantId,
                // warehouse_id: PO.warehouse.id,
                // purchaseOrderId: PO.id,
                // items: PO.purchase_order_items
            };
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.put(URL, requestBody, {headers});

            if (res.status === 200) {

                dispatch(hideLoading())
                toast.success(res.data.message);

            } else {
                toast.error(res.response.data.error)
                // console.error('Please fill out all required data');
                dispatch(hideLoading())
            }
        } catch (err) {
            console.error(err);
            dispatch(hideLoading())
        }
    };

    const convertToSO = async () => {
        const dataToPost = {
            tenant_id: tenantId,
            sq_id: SQID

        }

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/sales/convert-sq-to-so`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                dispatch(setSOID(res.data.salesOrderId))
                console.log(res.data.salesOrderId, 'SOID')
                navigate('/sales/salesorder')

            } else {
                dispatch(hideLoading())
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Please fill out all required fields')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };
    console.log(items, 'ITYEMS')
    // const handleGeneratePDF = async () => {
    //     if (!SQData) {
    //         return;
    //     }
    //
    //     try {
    //         const pdfBlob = await generatePDF(SQData);
    //         const pdfObjectURL = URL.createObjectURL(pdfBlob);
    //
    //         // Open the PDF in a new tab
    //         window.open(pdfObjectURL, '_blank');
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //     }
    // };


    useEffect(() => {
        getInventoryData()

        getSQData()

    }, []);


    return (
        <>
            <Layout />
            {/*{showAddItemModal && <AddItemModal getPOData={"getPOData"} warehouse={''} inventory={inventoryList} tenantID={tenantId} } setShowSelectedItemModal={setShowSelectedItemModal} setShowAddItemModal={setShowAddItemModal}/>}*/}
            {/*{showUpdateLineItemModal && <UpdateLineItemModal invItemNo={invItemNo} tenantId={tenantId} warehouse={''}  itemName={itemName} setShowUpdateLineItemModal={setShowUpdateLineItemModal} itemKey={itemKey} selectedQuantity={selectedQuantity} selectedPrice={selectedPrice}/>}*/}
            <div className={'flex crown'}>
            <h1 className={'mb-1 mt-1 title ml-5'}>Sales Quotation {SQData?.id}</h1>
                <h3 className={'mb-1 mt-1 mr-2 title ml-5'}>Status: {SQData?.status} | {invoiceStatus}</h3>
            </div>
            <div className="layout">
                <i className="ri-checkbox-fill mb-1"></i>
                <div className={'flex mt-2'}>
                    <button
                        type="submit"
                        // onClick={handleGeneratePDF}
                        className="mb-2 bg-slate-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Print
                    </button>
                    <button
                        type="submit"
                        className="mb-2 ml-1 bg-slate-400 px-2.5 py-1.5 text-sm hover:bg-black  font-semibold text-white shadow-sm hover:bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Email
                    </button>
                    <button
                        type="button"
                        className="mb-2 ml-1 bg-slate-400 px-2.5 py-1.5 text-sm hover:bg-black  font-semibold text-white shadow-sm hover:bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={convertToSO}
                    >
                        To SO
                    </button>
                    <button
                        type="button"
                        className="mb-2 ml-1 bg-slate-400 px-2.5 py-1.5 text-sm hover:bg-black  font-semibold text-white shadow-sm hover:bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        To Invoice
                    </button>
                    <button
                        type="submit"
                        onClick={voidPO}
                        className="mb-2 ml-1 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Void
                    </button>
                </div>



                {showSearchItemModal && <SearchItemModal inventory={inventoryList} setShowSelectedItemModal={setShowSelectedItemModal} setShowSearchItemModal={setShowSearchItemModal}/>}
                {showAddItemModal && <AddItemToSQModal showModal={setShowAddItemModal} inventory={inventory} getSQData={getSQData} sqData={SQData}/>}
                {showSelectedItemModal && <SelectedItemModal setShowSelectedItemModal={setShowSelectedItemModal}/>}
                {showUpdateItemModal && <UpdateLineItemSQ getSQData={getSQData} itemID={lineItemID} item={item} showModal={setShowUpdateItemModal} quantity={selectedQuantity} price={selectedPrice}/>}
                <div className={'container'}>
                    <div>
                        {/*{poData == null && <i className="ri-user-search-line"   onClick={() => setShowSearchVendorModal(true)}></i>}*/}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="mt-1 mb-2 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}

                        {/*>*/}
                        {/*    + Vendor*/}
                        {/*</button>*/}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="text-right">Customer No.</div>
                            <div className="bg-gray-100">{SQData?.customer?.id}</div>
                            <div className="text-right">Customer Name</div>
                            <div className="bg-gray-100">{SQData?.customer?.company_name}</div>
                            <div className="text-right">Customer Contact</div>
                            <div className="bg-gray-100">{SQData?.customer?.first_name} {SQData?.customer?.last_name}</div>
                            <div className="text-right">Payment Terms</div>
                            <div className="bg-gray-100">{SQData?.customer?.payment_terms}</div>

                        </div>

                    </div>
                    <div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-right">Address 1</div>
                                    <div className="bg-gray-100">{SQData?.customer?.address_1}</div>
                                    <div className="text-right">Address 2</div>
                                    <div className="bg-gray-100">{SQData?.customer?.address_2}</div>
                                    <div className="text-right">City, State</div>
                                    <div className="bg-gray-100">{SQData?.customer?.city} {SQData?.customer?.state}</div>
                                    <div className="text-right">Zip Code</div>
                                    <div className="bg-gray-100">{SQData?.customer?.postal_code}</div>
                                </div>
                    </div>
                </div>

                {poData !== null && <hr className={'mt-3'}/>}
                <div className={'tabs'}>
                    <Tabs>
                        <Tabs.TabPane tab="Totals" key={0}>
                            <div className="grid grid2 grid-cols-2 gap-2">

                                    <div className="text-right2">Subtotal</div>
                                    <div className="bg-gray-100">${SQData?.subtotal}</div>
                                    <div className="text-right2">Sales Tax {SQData?.tax_rate}%</div>
                                    <div className="bg-gray-100">${SQData?.sales_tax}</div>
                                    <div className="text-right2">Total</div>
                                    <div className="bg-gray-100">${SQData?.total_amount}</div>


                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Dates" key={1}>
                            <div className="grid grid-cols-2 gap-2">
                                gdgs
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Logistics" key={2}>
                        <div className="grid grid-cols-2 gap-2">
                            dgsg
                        </div>
                    </Tabs.TabPane>
                        <Tabs.TabPane tab="Sales Details" key={3}>
                            <div className="grid grid-cols-2 gap-2">
                                dgsg
                            </div>
                        </Tabs.TabPane>

                    </Tabs>
                </div>
                <hr className={'mt-3'}/>
                <div className={'mt-3'}>
                    {SQData?.status == 'open' ? <i className="ri-add-line" onClick={() => setShowAddItemModal(true)}></i> : null}
                    <div className=''>
                        <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                            <AgGridReact rowData={SQData?.sales_quotation_items} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
