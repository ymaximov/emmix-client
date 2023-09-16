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
import CustomerTypeChart from "../../components/crm/CustomerTypeChart";
import {FilteredResultsModal} from "../../modals/CRM/FilteredResultsModal";
import {url} from '../../connections/toServer'

const formatter = (value) => <CountUp end={value} separator="," />;

export const CRM = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    console.log(tenantId, "Tenant ID")
    const [customers, setCustomers] = useState([]);
    const [showAddNewCustomerModal, setShowAddNewCustomerModal] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [showFilteredResultsModal, setShowFilteredResultsModal] = useState(false)
    // const closeCreateCustomerModal = () => {
    //     setShowAddNewCustomerModal(false);
    // };

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

    const gridOptions = {
        columnDefs: [
            {
                headerName: "Company Name",
                field: "company_name",
                sortable : true,
                filter: true
            },
            {
                headerName: "First Name",
                field: "first_name",
                sortable : true,
                filter: true
            },
            {
                headerName: "Last Name",
                field: "last_name",
                sortable : true,
                filter: true
            },
            {
                headerName: "Email",
                field: "email",
                sortable : true,
                filter: true
            },
            {
                headerName: "Phone Number",
                field: "phone_1",
                sortable : true,
                filter: true
            },
            {
                headerName: "Customer Type",
                field: "customer_type",
                sortable : true,
                filter: true
            },
            {
                headerName: "Status",
                field: "status",
                sortable : true,
                filter: true
            },
            // Add more columns as needed
        ],
        defaultColDef: {
            sortable: true,
            filter: true,
        },
        // Add other grid options as needed
    };



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

    const commercialCustomers = customers.filter(
        (customer) => customer.customer_type === 'commercial'
    );
    const governmentCustomers = customers.filter(
        (customer) => customer.customer_type === 'government'
    );
    const educationCustomers = customers.filter(
        (customer) => customer.customer_type === 'education'
    );

    const individualCustomers = customers.filter(
        (customer) => customer.customer_type === 'individual'
    );



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
                    {showFilteredResultsModal && <FilteredResultsModal setShowFilteredResultsModal={setShowFilteredResultsModal}/>}
                </div>
                <div>
                    <div className='crm-statistics mb-8'>
                        {customers && customers.length > 0 ? <div>
                            <ActiveInactiveChart active={activeCustomers} inactive={inactiveCustomers} setShowFilteredResultsModal={setShowFilteredResultsModal}/>
                        </div>: (
                            <div>...Data is Loading</div>
                        )}
                        {customers && customers.length > 0 ? <div>
                            <CustomerTypeChart commercial={commercialCustomers} government={governmentCustomers} education={educationCustomers} individual={individualCustomers} setShowFilteredResultsModal={setShowFilteredResultsModal}/>

                        </div>: (
                            <div>...Data is Loading</div>
                        )}

                    </div>
                    {customers && customers.length > 0 ? (
                        <div>
                            <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                                <AgGridReact rowData={customers} gridOptions={gridOptions} onCellClicked={handleCellClicked} />
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
