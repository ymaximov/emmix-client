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
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {setTenantProfile} from "../../redux/slices/admin/tenantProfileSlice";
import {AddNewCustomerModal} from "../../modals/CRM/AddNewCustomerModal";

const formatter = (value) => <CountUp end={value} separator="," />;

export const CRM = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [customers, setCustomers] = useState([]);
    const [showAddNewCustomerModal, setShowAddNewCustomerModal] = useState(false)
    const closeCreateCustomerModal = () => {
        setShowAddNewCustomerModal(false);
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
            field: "phone",
        },
        {
            headerName: "Security Code",
            field: "security_code",
        },
        {
            headerName: "Account Status",
            field: "account_status",
        },
    ];
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        // setDataForModal(params.data); // Pass the data from the clicked cell to the modal
        // console.log(params.data, '***Params Data***')
        dispatch(setTenantProfile(params.data))
        navigate('/admin/companyprofile')
        // setIsModalVisible(true); // Show the modal
    };
    return (
        <>
        <Layout />
            <div className='layout'>
                <div className='crm-top mb-4'>
                    <i className="ri-user-add-line" onClick={() => setShowAddNewCustomerModal(true)}></i>
                    {showAddNewCustomerModal && <AddNewCustomerModal  setShowAddNewCustomerModal={setShowAddNewCustomerModal}/>}
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
                            <Statistic title="Active Users" value={112893} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                        </Col>
                    </Row>
                    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                        <AgGridReact rowData={customers} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                    </div>
                </div>


            </div>
        </>
    )
}
