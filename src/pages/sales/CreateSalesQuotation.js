import {Layout} from '../../pages/layout/Layout'
import React, {useEffect, useState} from "react";
import {Row, Col} from 'antd'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SearchCustomer} from "../../modals/sales/SearchCustomer";

export const CreateSalesQuotation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const [customers, setCustomers] = useState()
    const [selectedCustomer, setSelectedCustomer] = useState()
    console.log(selectedCustomer, 'selectec customer')
    const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)

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
        getCustomersData()
    }, []);
    return (
        <>
            <Layout />
            <div className="layout">
                {showSearchCustomerModal && <SearchCustomer setSelectedCustomer={setSelectedCustomer} customers={customers} showModal={setShowSearchCustomerModal}/>}
                <h1 className={'mb-3 title'}>Create Sales Quotation</h1>
                <div className={'font-bold mb-2'}>Step 1/2: Define sales quotation details</div>
                <button
                    onClick={() => setShowSearchCustomerModal(true)}
                    type="button"
                    className="mt-2 mb-1 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    + Customer
                </button>
                <Row gutter={20} className='mt-5 mb-4'>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Customer Name</div>
                        <div>{selectedCustomer?.company_name}</div>
                        <div className='vendor-details-title'>Contact Name</div>
                        <div>{selectedCustomer?.first_name} {selectedCustomer?.last_name}</div>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Contact Email</div>
                        <div>{selectedCustomer?.email}</div>
                        <div className='vendor-details-title'>Contact Phone</div>
                        <div>{selectedCustomer?.contact_phone}</div>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <div className='vendor-details-title'>Payment Terms</div>
                        <div>{selectedCustomer?.payment_terms}</div>
                        <div className='vendor-details-title'>Tax/VAT ID</div>
                        <div>{selectedCustomer?.tax_id}</div>
                    </Col>
                </Row>
                <hr className={'mt-6 mb-6'}/>
            </div>
        </>
    )
}
