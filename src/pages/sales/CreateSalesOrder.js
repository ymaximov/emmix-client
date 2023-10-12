import {Layout} from '../layout/Layout'
import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {SearchCustomerSO} from "../../modals/sales/SearchCustomerSO";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

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
                <i className="ri-checkbox-fill mb-1"/>
                <div className={'container'}>
                    <div>
                        <i className="ri-user-search-line"  onClick={() => setShowSearchCustomerModal(true)} ></i>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="mt-1 mb-2 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}

                        {/*>*/}
                        {/*    + Vendor*/}
                        {/*</button>*/}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-right">Customer No.</div>
                            <div className="bg-slate-50">{selectedCustomer?.id}</div>
                            <div className="text-right">Customer Name</div>
                            <div className="bg-slate-50">{selectedCustomer?.company_name}</div>
                            <div className="text-right">Customer Contact</div>
                            <div className="bg-slate-50">{selectedCustomer?.first_name} {selectedCustomer?.last_name}</div>
                            <div className="text-right">Payment Terms</div>
                            <div className="bg-slate-50">{selectedCustomer?.payment_terms}</div>


                        </div>

                    </div>
                    <div>
                        <Tabs>
                            <Tabs.TabPane tab="Ship To" key={0}>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-right">Address</div>
                                    <div className="bg-slate-50">{selectedCustomer?.address_1}</div>
                                    <div className="text-right">Address 2</div>
                                    <div className="bg-slate-50">{selectedCustomer?.address_2}</div>
                                    <div className="text-right">City, State</div>
                                    <div className="bg-slate-50">{selectedCustomer?.city} {selectedCustomer?.state}</div>
                                    <div className="text-right">Zip Code</div>
                                    <div className="bg-slate-50">{selectedCustomer?.postal_code}</div>
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
