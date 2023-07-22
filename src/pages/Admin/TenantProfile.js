import {Button, Col, Form, Input, Row, Select, Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {countries} from "countries-list";
import {Layout} from '../layout/Layout'
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {setTenantProfile} from "../../redux/slices/admin/tenantProfileSlice";
import {showLoading, hideLoading} from "../../redux/slices/alertsSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {hi} from "date-fns/locale";
import {AddNewUserModal} from "../../modals/admin/AddNewUserModal";


export const TenantProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const tenant = useSelector((state) => state.tenant);
    const id = tenant.tenant.id;
    console.log(id)
    const token = JSON.parse(localStorage.getItem('token')).access_token
    console.log(tenant, 'TENANTDATA')
    const [users, setUsers] = useState([])

    const {isLoading: updateTenantLoading, err: updateTenantErr, onSubmit: updateTenantSubmit} = usePost({
        api: `/api/admin/update-tenant-profile/${id}`,
        method: 'put'
    })

    // const getAllUsers = async() => {
    //     try {
    //         dispatch(showLoading())
    //         const res = await axios.get(`/api/admin/update-tenant-profile/${id}`);
    //         const data = res.data;
    //         console.log(data)
    //         setUsers(res.data)
    //         dispatch(hideLoading())
    //     } catch (error) {
    //         dispatch(hideLoading)
    //         console.error('Error fetching data:', error);
    //     }
    // }
    // const { data: userAccountData, isLoading: userAccountLoading, err: userAccountErr } = useGet({
    //     api: `api/admin/get-user-accounts-by-tenant-id/${id}`,
    // });
    // userAccountLoading ? dispatch(showLoading()) : dispatch(hideLoading())
    // if (userAccountErr) return <h1>{userAccountErr}</h1>;
    // console.log(userAccountData, 'data')

    const getUsersData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/admin/get-user-accounts-by-tenant-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            if (res.status === 200) {
                console.log(res)
                setUsers(res.data.data)
            }
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const columnDefs = [

        {
            headerName: "First Name",
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Email Address",
            field: "email",
        },
        {
            headerName: "Phone Number",
            field: "phone",
        },
        {
            headerName: "Account Status",
            field: "account_status",
        },
        {
            headerName: "Role",
            field: "role",
        },
        // {
        //     headerName: "Creation Date",
        //     field: "createdAt",
        // },
    ];

    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        // setDataForModal(params.data); // Pass the data from the clicked cell to the modal
        // console.log(params.data, '***Params Data***')
        dispatch(setTenantProfile(params.data))
        navigate('/admin/companyprofile')
        // setIsModalVisible(true); // Show the modal
    };


    const usStates = [
        { label: 'Not Applicable', value: 'NONE' },
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' }
    ];
    const countryOptions = Object.keys(countries).map(countryCode => {
        const countryName = countries[countryCode].name;
        return { label: countryName, value: countryCode };
    });
    const { Option } = Select;
        useEffect(() => {
            getUsersData()
        }, []);
    return (
        <>
            <Layout />
            <div className='layout'>
                <div className='tenant-profile-content'>
            <Tabs>

                <Tabs.TabPane tab="Company Information" key={0}>
                    <div>
                        <Form layout="vertical" initialValues={tenant.tenant} onFinish={updateTenantSubmit}>
                            {/*<h1 className="card-title mt-3">Company Details</h1>*/}
                            <h1 className='mt-3 mb-1 font-bold'>Tenant ID: {tenant.tenant.id}</h1>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Company Name"
                                        name="company_name"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Company Name"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Email Address"
                                        name="email"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Email Address"></Input>
                                    </Form.Item>
                                </Col>
                                {/*<Col span={8} xs={240} s={24} lg={8}>*/}
                                {/*    <Form.Item*/}
                                {/*        required*/}
                                {/*        label="VAT/Tax ID"*/}
                                {/*        name="taxId"*/}
                                {/*        rules={[{ require: true }]}*/}
                                {/*    >*/}
                                {/*        <Input placeholder="VAT/Tax ID"></Input>*/}
                                {/*    </Form.Item>*/}
                                {/*</Col>*/}
                            </Row>
                            <Row gutter={20}>

                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Main Contact First Name"
                                        name="first_name"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Main Contact First Name"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Main Contact Last Name"
                                        name="last_name"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Main Contact Last Name"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Phone Number"
                                        name="phone"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Phone Number"></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Address 1"
                                        name="address_1"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Address 1"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        label="Address 2"
                                        name="address_2"
                                        rules={[{ require: false }]}
                                    >
                                        <Input placeholder="Address 2"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="City"
                                        name="city"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="City"></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item label="Select State" name="state" rules={[{ require: false }]}>
                                        <Select>
                                            {usStates.map(state => (
                                                <Option key={state.value} value={state.value}>
                                                    {state.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item  label="Select Country" name="country" rules={[{ require: true }]} required>
                                        <Select>
                                            {countryOptions.map(country => (
                                                <Option key={country.value} value={country.value}>
                                                    {country.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Postal Code"
                                        name="postal_code"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Postal Code"></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <Form.Item
                                        required
                                        label="Security Code"
                                        name="security_code"
                                        rules={[{ require: true }]}
                                    >
                                        <Input placeholder="Security Code"></Input>
                                    </Form.Item>
                                </Col>


                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button className="primary-button" htmlType="submit">
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab='User Accounts' key={1}>
                    <AddNewUserModal />
                    {users && users.length > 0 ? (
                        <div>
                            <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                                <AgGridReact rowData={users} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                            </div>
                        </div>
                    ) : (<div>No data to show...</div>)

                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Billing Information' key={2}></Tabs.TabPane>
                <Tabs.TabPane tab='Details' key={3}>
                    <div className='layout'>
                        <h1 className='font-bold'>Tenant ID {tenant.tenant.id} {tenant.tenant.account_status}</h1>
                        <div>Company Created On: {tenant.tenant.createdAt}</div>
                        <div>Company Details Last Updated On: {tenant.tenant.updatedAt}</div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
                </div>
            </div>
        </>
    )
}
