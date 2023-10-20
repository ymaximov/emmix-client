import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {setCustomer} from "../../redux/slices/customerSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {countries} from "countries-list";
import '../../pages/CRM/crm.css'

export const SearchCustomerSC = ({showModal, customers, setSelectedCustomer}) => {
    console.log(customers, 'customers')
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id

    const filterCustomers = (values) => {
        const filteredCustomers = customers.filter((customer) => {
            // Helper function to check if a field value matches the customer property
            const fieldValueMatches = (fieldValue, customerProperty) => {
                const stringFieldValue = String(fieldValue);
                const stringCustomerProperty = String(customerProperty);

                if (!stringFieldValue) {
                    return true; // Empty field value means it's a match for this field
                }
                return stringCustomerProperty.toLowerCase().includes(stringFieldValue.toLowerCase());
            };

            console.log("state:", values.state, "customer id:", customer.state); // Debug log
            return (
                fieldValueMatches(values.id, customer.id) &&
                fieldValueMatches(values.tax_id, customer.tax_id) &&
                fieldValueMatches(values.customer_type, customer.customer_type) &&
                fieldValueMatches(values.company_name, customer.company_name) &&
                fieldValueMatches(values.first_name, customer.first_name) &&
                fieldValueMatches(values.last_name, customer.last_name) &&
                fieldValueMatches(values.email, customer.email) &&
                fieldValueMatches(values.phone_1, customer.phone_1) &&
                fieldValueMatches(values.status, customer.status) &&
                fieldValueMatches(values.city, customer.city) &&
                fieldValueMatches(values.state, customer.state) &&
                fieldValueMatches(values.contact_phone, customer.contact_phone)
            );
        });

        setSearchResults(filteredCustomers);
    };



    const handleClose = () => {
        showModal(false)
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
        setSelectedCustomer(params.data)
        showModal(false)
    }

    const clearForm = (formik) => {
        formik.resetForm();
    };
    return (
        <>
            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-3 mb-2'>Search for a customer</h1>
                    <Formik
                        initialValues={{
                            id: '',
                            city: '',
                            state: '',
                            tax_id: '',
                            customer_type: '',
                            company_name: '',
                            first_name: '',
                            last_name: '',
                            email: '',
                            phone_1: '',
                            contact_phone: '',
                            status: ''
                        }}
                        onSubmit={(values) => {
                            filterCustomers(values);
                        }}
                    >
                        {({ handleSubmit, ...formik }) => (
                            <Form>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="id" className='block text-sm font-medium leading-6 text-gray-900'>Company ID No.</label>
                                            <Field type="text" placeholder='Company ID No.' name="id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="id" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Vat/Tax ID</label>
                                            <Field type="text" placeholder='Tax/Vat ID' name="tax_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="customer_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                Sector
                                            </label>
                                            <Field
                                                as="select"
                                                id="customer_type"
                                                name="customer_type"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">--Please Select an Option--</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="government">Government</option>
                                                <option value="education">Education</option>
                                                <option value="individual">Individual</option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="customer_type" component="div" className="text-red-600" />
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="company_name" className='block text-sm font-medium leading-6 text-gray-900'>Company Name</label>
                                            <Field type="text" placeholder='Company Name' name="company_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="company_name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="first_name" className='block text-sm font-medium leading-6 text-gray-900'>First Name</label>
                                            <Field type="text" placeholder='First Name' name="first_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="first_name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="last_name" className='block text-sm font-medium leading-6 text-gray-900'>Last Name</label>
                                            <Field type="text" placeholder='Last Name' name="last_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="last_name" component="div" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                                            <Field type="text" placeholder='Email Address' name="email" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="email" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="phone_1" className='block text-sm font-medium leading-6 text-gray-900'>Main Phone Number</label>
                                            <Field type="text" placeholder='Phone Number' name="phone_1" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="phone_1" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="contact_phone" className='block text-sm font-medium leading-6 text-gray-900'>Contact Phone</label>
                                            <Field type="text" placeholder='Contact Phone Number' name="contact_phone" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="last_name" component="div" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>City</label>
                                            <Field type="text" placeholder='City' name="city" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <Field
                                                as="select"
                                                id="state"
                                                name="state"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                {usStates.map((state) => (
                                                    <option key={state.value} value={state.value}>
                                                        {state.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="state" component="div" className="text-red-600" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="customer_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                Account Status
                                            </label>
                                            <Field
                                                as="select"
                                                id="customer_type"
                                                name="status"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">--Please Select an Option--</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="customer_type" component="div" className="text-red-600" />
                                    </Col>
                                </Row>
                                <div className='crm-search-modal-buttons'>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            className="mt-4 mb-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="mt-4 mb-3 ml-2 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={() => clearForm(formik)}
                                        >
                                            Clear Form
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className='mt-3'>
                        <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                            <AgGridReact rowData={searchResults} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
