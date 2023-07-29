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

export const AddNewCustomerModal = ({setShowAddNewCustomerModal, getCustomersData}) => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = useSelector((state) => state.user).user.tenant_id

    const [formData, setFormData] = useState({
        tax_id: '',
        company_name: '',
        email: '',
        first_name: '',
        phone_1: '',
        fax: '',
        industry: '',
        customer_type: '',
        payment_terms: '',
        late_interest: '',
        cc_number: '',
        cc_expiration: '',
        cc_security_code: '',
        bank_country: '',
        bank_name: '',
        bank_code: '',
        bic_swift: '',
        bank_account_name: '',
        bank_account_no: '',
        country: '',
        cc_id: '',
        bank_branch: '',
        bank_signature_date: '',
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
        setShowAddNewCustomerModal(false);
        // You can also close the modal after updating the state, depending on your use case
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {tax_id} = formData
        console.log('form data', formData)
        console.log('1111')
        try {
            formData.tenant_id = tenant
            const res = await axios.post("/api/crm/add-new-customer", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                console.log('Form submitted successfully!');
                getCustomersData()
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
                    <h1>Add New Customer</h1>
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
                            </Row>
                            <Row gutter={20}>
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
                            </Row>
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
                <Tabs.TabPane tab='Billing Information' key={2}>
                    <h1 className='mb-2 mt-2'>Credit Card Details</h1>
                    <hr className='mb-2'/>
                    <Row gutter={20}>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <fieldset>
                                    <legend className="block text-sm font-medium leading-6 text-gray-900">Credit Card Details</legend>
                                    <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
                                        <div>
                                            <label htmlFor="cc_number" className="sr-only">
                                                Card number
                                            </label>
                                            <input
                                                type="text"
                                                name="cc_number"
                                                id="cc_number"
                                                onChange={handleChange}
                                                className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Card number"
                                            />
                                        </div>
                                        <div className="flex -space-x-px">
                                            <div className="w-1/2 min-w-0 flex-1">
                                                <label htmlFor="cc_expiration" className="sr-only">
                                                    Expiration date
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cc_expiration"
                                                    onChange={handleChange}
                                                    id="cc_expiration"
                                                    className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="MM / YY"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <label htmlFor="cc_security_code" className="sr-only">
                                                    CVC
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cc_security_code"
                                                    id="cc_security_code"
                                                    onChange={handleChange}
                                                    className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="CVC"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                {/*<fieldset className="mt-6 bg-white">*/}
                                {/*    <legend className="block text-sm font-medium leading-6 text-gray-900">Billing address</legend>*/}
                                {/*    <div className="mt-2 -space-y-px rounded-md shadow-sm mb-3">*/}
                                {/*        <div>*/}
                                {/*            <label htmlFor="cc_country" className="sr-only">*/}
                                {/*                Country*/}
                                {/*            </label>*/}
                                {/*            <select*/}
                                {/*                id="cc_country"*/}
                                {/*                name="cc_country"*/}
                                {/*                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                                {/*                defaultValue="United States"*/}
                                {/*            >*/}
                                {/*                {countryOptions.map(country => (*/}
                                {/*                    <option key={country.value} value={country.value}>*/}
                                {/*                        {country.label}*/}
                                {/*                    </option>*/}
                                {/*                ))}*/}
                                {/*            </select>*/}
                                {/*        </div>*/}
                                {/*        <div>*/}
                                {/*            <label htmlFor="postal-code" className="sr-only">*/}
                                {/*                ZIP / Postal code*/}
                                {/*            </label>*/}
                                {/*            <input*/}
                                {/*                type="text"*/}
                                {/*                name="postal-code"*/}
                                {/*                id="postal-code"*/}
                                {/*                autoComplete="postal-code"*/}
                                {/*                className="relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                                {/*                placeholder="ZIP / Postal code"*/}
                                {/*            />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</fieldset>*/}
                            </div>
                        </Col>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <label htmlFor="cc_id" className="block text-sm font-medium leading-6 text-gray-900">
                                    ID Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="cc_id"
                                        id="cc_id"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="ID Number"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <h1 className='mb-2 mt-2'>Bank Account Details</h1>
                    <hr className='mt-2 mb-2' />
                    <Row gutter={20}>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <label htmlFor="bank_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bank Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="bank_name"
                                        id="bank_name"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Bank Name"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <label htmlFor="bank_code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bank Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="bank_code"
                                        id="bank_code"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="01234"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <label htmlFor="bank_branch" className="block text-sm font-medium leading-6 text-gray-900">
                                    Routing Number/Branch Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="bank_branch"
                                        onChange={handleChange}
                                        id="bank_branch"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Routing Number/Branch Number"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                        <Row gutter={20}>
                            <Col span={8} xs={240} s={24} lg={8}>
                            <div>
                                <label htmlFor="bank_account_no" className="block text-sm font-medium leading-6 text-gray-900">
                                    Bank Account Number                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="bank_account_no"
                                        id="bank_account_no"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="000-000-000"
                                    />
                                </div>
                            </div>
                            </Col>
                            <Col span={8} xs={240} s={24} lg={8}>
                                <div>
                                    <label htmlFor="bic_swift" className="block text-sm font-medium leading-6 text-gray-900">
                                        BIC/SWIFT Code                                </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="bic_swift"
                                            id="bic_swift"
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="BIC/SWIFT Code  "
                                        />
                                    </div>
                                </div>
                            </Col>
                            {/*<Col span={8} xs={240} s={24} lg={8}>*/}
                            {/*    <div>*/}
                            {/*        <label htmlFor="bic_swift" className="block text-sm font-medium leading-6 text-gray-900">*/}
                            {/*            BIC/SWIFT Code                                </label>*/}
                            {/*        <div className="mt-2">*/}
                            {/*            <input*/}
                            {/*                type="text"*/}
                            {/*                name="bic_swift"*/}
                            {/*                onChange={handleChange}*/}
                            {/*                id="bic_swift"*/}
                            {/*                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                            {/*                placeholder="BIC/SWIFT Code  "*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                        </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="late_interest" className="block text-sm font-medium leading-6 text-gray-900">
                                            Late Interest                               </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="late_interest"
                                                onChange={handleChange}
                                                id="late_interest"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="e.g. 5%"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="payment_terms" className="block text-sm font-medium leading-6 text-gray-900">
                                            Payment Terms                              </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="payment_terms"
                                                onChange={handleChange}
                                                id="payment_terms"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="e.g. NET 30"
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                            <Col span={8} xs={240} s={24} lg={8}>
                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                <label htmlFor="bic_swift" className="block text-sm font-medium leading-6 text-gray-900">
                                    Signature Date                               </label>
                                <input
                                    type="date"
                                    id="date"
                                    onChange={handleChange}
                                    name="bank_signature_date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </Col>
                            </Row>



                </Tabs.TabPane>
                <Tabs.TabPane tab='Remarks' key={3}>
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
