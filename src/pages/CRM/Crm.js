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

const formatter = (value) => <CountUp end={value} separator="," />;

export const CRM = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    console.log(tenantId)
    const [customers, setCustomers] = useState([]);
    const [showAddNewCustomerModal, setShowAddNewCustomerModal] = useState(false)
    const closeCreateCustomerModal = () => {
        setShowAddNewCustomerModal(false);
    };

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
                        <i className="ri-search-line ml-1"></i>
                    </div>
                    {showAddNewCustomerModal && <AddNewCustomerModal  getCustomersData={getCustomersData} setShowAddNewCustomerModal={setShowAddNewCustomerModal}/>}
                </div>
                <div>
                    <Row gutter={16} className='mt-5'>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Active"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Idle"
                                    value={9.3}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={16} className='mt-6 mb-10'>
                        <Col span={12}>
                            <Statistic title="Customers" value={customers.length} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                        </Col>
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
