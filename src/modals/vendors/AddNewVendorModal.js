import {Button, Col, Form, Input, Row, Select, Tabs} from "antd";
import {AddNewUserModal} from "../../modals/admin/AddNewUserModal";
import {UpdateUserModal} from "../../modals/admin/UpdateUserModal";
import {AgGridReact} from "ag-grid-react";
import {countries} from "countries-list";
import React, {useState} from "react";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useSelector} from "react-redux";

export const AddNewVendorModal = ({setShowAddNewVendorModal, getVendorsData}) => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = JSON.parse(localStorage.getItem('token')).tenant_id
    console.log(tenant, 'tenant')

    const [formData, setFormData] = useState({
        tax_id: '',
        company_name: '',
        email: '',
        first_name: '',
        phone_1: '',
        fax: '',
        industry: '',
        sales_tax: '',
        customer_type: '',
        payment_terms: '',
        country: '',
        remarks: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postal_code: '',
        contact_name: '',
        contact_phone: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
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
    const handleClose = () => {
        // Perform some action that updates the state in the parent component
        setShowAddNewVendorModal(false);
        // You can also close the modal after updating the state, depending on your use case
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {tax_id} = formData
        console.log('form data', formData)
        console.log('1111')
        try {
            formData.tenant_id = tenant
            const res = await axios.post("/api/vendor/add-new-vendor", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                console.log('Form submitted successfully!');
                getVendorsData()
                handleClose()
            } else {
                toast.error(res.data.message)
                console.error('Form submission failed.');
            }
        } catch (error) {
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };
    return (
        <>

            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-1'>Add New Vendor</h1>
                    <form layout="vertical" onSubmit={handleSubmit}>
                        <Tabs>
                            <Tabs.TabPane tab="Customer Information" key={0}>
                                <div>
                                    {/*<h1 className="card-title mt-3">Company Details</h1>*/}
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="tax_id" className="block text-sm font-medium leading-6 text-gray-900">
                                                    VAT/Tax ID
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="tax_id"
                                                        onChange={handleChange}
                                                        id="tax_id"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="VAT/Tax ID"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="company_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Company Name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="company_name"
                                                        id="company_name"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Company Name"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="phone_1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Phone Number
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="phone_1"
                                                        id="phone_1"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="212-619-9200"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="address_1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Address 1
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="address_1"
                                                        id="address_1"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Address 1"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="address_2" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Address 2
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="address_2"
                                                        id="address_2"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="e.g. floor or suite no."
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                    State
                                                </label>
                                                <select
                                                    id="state"
                                                    name="state"
                                                    onChange={handleChange}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue="Un"
                                                >
                                                    {usStates.map(state => (
                                                        <option key={state.value} value={state.value}>
                                                            {state.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Country
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    onChange={handleChange}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue="United States"
                                                >
                                                    {countryOptions.map(country => (
                                                        <option key={country.value} value={country.value}>
                                                            {country.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="customer_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sector
                                                </label>
                                                <select
                                                    id="customer_type"
                                                    name="customer_type"
                                                    onChange={handleChange}
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue="--Please Select an Option--"
                                                >
                                                    <option>--Please Select an Option--</option>
                                                    <option value="commercial">Commercial</option>
                                                    <option value="government">Government</option>
                                                    <option value="education">Education</option>
                                                    <option value="individual">Individual</option>
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>

                                        {/*<Col span={8} xs={240} s={24} lg={8}>*/}
                                        {/*    <div>*/}
                                        {/*        <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">*/}
                                        {/*            Industry*/}
                                        {/*        </label>*/}
                                        {/*        <select*/}
                                        {/*            id="industry"*/}
                                        {/*            name="industry"*/}
                                        {/*            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                                        {/*        >*/}
                                        {/*            <option>--Please Select an Option--</option>*/}
                                        {/*            <option value="it">Information Technology</option>*/}
                                        {/*            <option value="education">Education</option>*/}
                                        {/*            <option value="government">Government</option>*/}
                                        {/*            <option value="retail">Retail</option>*/}
                                        {/*            <option value="other">Other</option>*/}
                                        {/*        </select>*/}
                                        {/*    </div>*/}
                                        {/*</Col>*/}

                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Contact Information' key={1}>
                                {/*<h1 className="card-title mt-3">Company Details</h1>*/}

                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="contact_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Contact Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    onChange={handleChange}
                                                    name="contact_name"
                                                    id="contact_name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="e.g. CEO, Account Manager"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    id="first_name"
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    id="last_name"
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="contact_phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="contact_phone"
                                                    id="contact_phone"
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="212-619-9200"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="you@example.com"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Billing Details' key={2}>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="sales_tax" className="block text-sm font-medium leading-6 text-gray-900">
                                                Sales Tax
                                            </label>
                                            <select
                                                id="sales_tax"
                                                name="sales_tax"
                                                onChange={handleChange}
                                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>--Please Select an Option--</option>
                                                <option value="liable">Liable</option>
                                                <option value="exempt">Exempt</option>

                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="address_2" className="block text-sm font-medium leading-6 text-gray-900">
                                                Payment Terms
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="payment_terms"
                                                    id="payment_terms"
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="e.g. NET30"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Attachments' key={3}>

                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Remarks' key={4}>
                                <Row gutter={20}>

                                    <div className="flex flex-col">
                                        <label htmlFor="remarks" className="mb-2">Remarks</label>
                                        <textarea
                                            id="remarks"
                                            name="remarks"
                                            rows="14"
                                            onChange={handleChange}
                                            cols="100"
                                            className="border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                                        ></textarea>
                                    </div>
                                </Row>
                            </Tabs.TabPane>
                        </Tabs>
                        <div className="d-flex justify-content-end">
                            <button
                                type="submit"
                                className="mt-6 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save & Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
