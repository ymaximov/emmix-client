import {Layout} from '../layout/Layout'
import {Button, Col, Form, Input, Row, Select, Tabs} from "antd";
import {AddNewUserModal} from "../../modals/admin/AddNewUserModal";
import {UpdateUserModal} from "../../modals/admin/UpdateUserModal";
import {AgGridReact} from "ag-grid-react";
import {countries} from "countries-list";
import React from "react";
import {url} from '../../connections/toServer'

export const AddNewCustomer = () => {
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
    return (
        <>
        <Layout />
            <div className="layout">
                <Tabs>

                    <Tabs.TabPane tab="Company Information" key={0}>
                        <div>
                            <Form layout="vertical">
                                {/*<h1 className="card-title mt-3">Company Details</h1>*/}

                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            name="account_status" // Use the name prop to link the form field with form data
                                            label="Account Status"
                                            rules={[{ required: true, message: 'Please select an account type' }]}
                                        >
                                            <select className="bp-type custom-select">
                                                <option>--Please Select an Option--</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="deleted">Deleted</option>
                                            </select>
                                        </Form.Item>
                                    </Col>
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
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='User Accounts' key={1}>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Billing Information' key={2}></Tabs.TabPane>
                    <Tabs.TabPane tab='Details' key={3}>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>
    )
}
