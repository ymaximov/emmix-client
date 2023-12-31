import {Layout} from '../layout/Layout'
import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {SearchCustomerSO} from "../../modals/sales/SearchCustomerSO";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSOID, setSqID} from "../../redux/slices/salesSlice";
import toast from "react-hot-toast";

export const CreateSalesOrder = () => {
    const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)
    const [customers, setCustomers] = useState()
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [inventory, setInventory] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const salesTax = 17

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
            const res = await axios.post(`${url}/api/sales/create-sales-order`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                dispatch(setSOID(res.data.data))
                // toast.success(res.data.message);
                console.log('SO ID', res.data.data)
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

    useEffect(() => {
        getInventoryData()
        getCustomersData()
        // getPOData()

    }, []);
    
    return (
        <>
            <Layout/>
            {showSearchCustomerModal && <SearchCustomerSO customers={customers} showModal={setShowSearchCustomerModal} setSelectedCustomer={setSelectedCustomer}/>}

            <h1 className={'mb-1 mt-1 title ml-5'}>Sales Order</h1>
            <div className="layout">
                <i className="ri-checkbox-fill mb-1" onClick={handleSubmit}/>
                <div className={'container'} onClick={() => setShowSearchCustomerModal(true)}>
                    <div>
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
                    </div>
                </div>
            </div>
        </>
    )
}
