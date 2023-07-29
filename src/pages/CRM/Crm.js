import './crm.css'
import {Layout} from "../layout/Layout";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Button } from 'antd';
import CountUp from 'react-countup';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {setTenantProfile} from "../../redux/slices/admin/tenantProfileSlice";
import {AddNewCustomerModal} from "../../modals/CRM/AddNewCustomerModal";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import {setCustomer} from '../../redux/slices/customerSlice'
import axios from "axios";
import {SearchModal} from "../../modals/CRM/SearchModal";
import ActiveInactiveChart from "../../components/crm/ActiveInactiveChart";

const formatter = (value) => <CountUp end={value} separator="," />;

export const CRM = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    console.log(tenantId)
    const [customers, setCustomers] = useState([]);
    const [showAddNewCustomerModal, setShowAddNewCustomerModal] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    // const closeCreateCustomerModal = () => {
    //     setShowAddNewCustomerModal(false);
    // };

    const getCustomersData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/crm/get-all-customers-by-tenant-id/${tenantId}`, {
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

    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Company Name",
            field: "company_name",
        },
        {
            headerName: "First Name",
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Email",
            field: "email",
        },
        {
            headerName: "Phone Number",
            field: "phone_1",
        },
        {
            headerName: "Customer Type",
            field: "customer_type",
        },
        {
            headerName: "Status",
            field: "status",
        },
    ];
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        dispatch(setCustomer(params.data))
        navigate('/crm/customerprofile')
    };

    const filterCustomersByStatusInactive = (customers) => {
        return customers.filter((customer) => customer.status === "inactive");
    };

    const inactiveCustomers = filterCustomersByStatusInactive(customers);
    console.log(inactiveCustomers);

    const filterCustomersByStatusActive = (customers) => {
        return customers.filter((customer) => customer.status === "active");
    };

    const activeCustomers = filterCustomersByStatusActive(customers);
    console.log(activeCustomers);

    useEffect(() => {
        getCustomersData()
    }, []);
    return (
        <>
        <Layout />
            <div className='layout'>
                <div className='crm-top mb-4'>
                    <div className='actions'>
                        <i className="ri-user-add-line" onClick={() => setShowAddNewCustomerModal(true)}></i>
                        <i className="ri-search-line ml-1" onClick={() => setShowSearchModal(true)}></i>
                    </div>
                    {showAddNewCustomerModal && <AddNewCustomerModal  getCustomersData={getCustomersData} setShowAddNewCustomerModal={setShowAddNewCustomerModal}/>}
                    {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} customers={customers}/>}
                </div>
                <div>

                    <Row gutter={16} className='mt-6 mb-10'>
                        {customers && customers.length > 0 ? <div>
                            <ActiveInactiveChart active={activeCustomers} inactive={inactiveCustomers} />
                        </div>: (
                            <div>...Data is Loading</div>
                        )}
                    </Row>
                    {customers && customers.length > 0 ? (
                        <div>
                            <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                                <AgGridReact rowData={customers} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                            </div>
                        </div>
                    ) : (
                        <div>...Data is Loading</div>
                    )}
                </div>


            </div>
        </>
    )
}
