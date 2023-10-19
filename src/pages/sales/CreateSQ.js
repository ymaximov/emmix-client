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
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import toast from "react-hot-toast";
import {SelectedItemModal} from "../../modals/purchasing/SelectedItemModal";
import {url} from "../../connections/toServer";
import {SearchCustomerSQ} from "../../modals/sales/SearchCustomerSQ";
import {setSqID} from "../../redux/slices/salesSlice";

export const CreateSQ = () => {
    const [showSearchVendorModal, setShowSearchVendorModal] = useState(false)
    const [showSearchItemModal, setShowSearchItemModal] = useState(false)
    const [showSelectedItemModal, setShowSelectedItemModal] = useState(false)
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [customers, setCustomers] = useState()
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [vendors, setVendors] = useState([]);
    const dispatch = useDispatch()
    const purchaseOrder = useSelector(state => state.purchaseOrder)
    const [inventory, setInventory] = useState()
    const [dueDate, setDueDate] = useState(new Date());
    const navigate = useNavigate()
    const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)
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



    const purchaseOrderItems = useSelector((state) => state.purchaseOrder).items
    console.log(vendor, 'VENDOR')
    const currency = '$'



    // Calculate the total price using reduce()
    const salesTax = 17

    const [reference, setReference] = useState('');







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
    const inventoryList = activeInventory?.filter(inventory => inventory.sales_item === true);

    const handleSubmit = async () => {
        const dataToPost = {
            tenant_id: tenantId,
            customer_id: selectedCustomer?.id,
            user_id: userID,
            tax_rate: salesTax,
            sales_tax: 0,
            subtotal: 0,
            total_amount: 0

        }

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/sales/create-sales-quotation`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                dispatch(setSqID(res.data.data))
                // toast.success(res.data.message);
                console.log('SQ ID', res.data.data)
                navigate('/sales/salesquotation')

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



    const getCustomersData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/crm/get-all-customers-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setCustomers(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    useEffect(() => {
        getInventoryData()
        getCustomersData()
        // getPOData()

    }, []);


    return (
        <>
            <Layout />
            {showSearchCustomerModal && <SearchCustomerSQ customers={customers} showModal={setShowSearchCustomerModal} setSelectedCustomer={setSelectedCustomer}/>}
            <h1 className={'mb-1 mt-1 title ml-5'}>Sales Quotation</h1>
            <div className="layout">
                <i className="ri-checkbox-fill mb-1" onClick={handleSubmit}></i>

                <div className={'container'}>
                    <div>
                        <i className="ri-user-search-line"   onClick={() => setShowSearchCustomerModal(true)}></i>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="mt-1 mb-2 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}

                        {/*>*/}
                        {/*    + Vendor*/}
                        {/*</button>*/}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-right">Customer No.</div>
                            <div className="bg-gray-100">{selectedCustomer?.id}</div>
                            <div className="text-right">Customer Name</div>
                            <div className="bg-gray-100">{selectedCustomer?.company_name}</div>
                            <div className="text-right">Customer Contact</div>
                            <div className="bg-gray-100">{selectedCustomer?.first_name} {selectedCustomer?.last_name}</div>
                            <div className="text-right">Payment Terms</div>
                            <div className="bg-gray-100">{selectedCustomer?.payment_terms}</div>


                        </div>

                    </div>
                    <div>
                        <Tabs>
                            <Tabs.TabPane tab="Ship To" key={0}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-right">Address</div>
                                    <div className="bg-gray-100">{selectedCustomer?.address_1}</div>
                                    <div className="text-right">Address 2</div>
                                    <div className="bg-gray-100">{selectedCustomer?.address_2}</div>
                                    <div className="text-right">City, State</div>
                                    <div className="bg-gray-100">{selectedCustomer?.city} {selectedCustomer?.state}</div>
                                    <div className="text-right">Zip Code</div>
                                    <div className="bg-gray-100">{selectedCustomer?.postal_code}</div>
                                </div>

                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Dates" key={1}>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>



            </div>
        </>
    )
}
