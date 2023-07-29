import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'

export const SearchModal = ({setShowSearchModal, customers}) => {
    console.log(customers.company_name, 'customers comp')
    const [searchResults, setSearchResults] = useState([]);
    const filterCustomers = (values) => {
        const filteredCustomers = customers.filter((customer) => {
            // Helper function to check if a field value matches the customer property
            const fieldValueMatches = (fieldValue, customerProperty) => {
                if (!fieldValue) {
                    return true; // Empty field value means it's a match for this field
                }
                return customerProperty.toLowerCase().includes(fieldValue.toLowerCase());
            };

            console.log("id:", values.id, "customer id:", customer.id); // Debug log
            console.log(customers.id, customer.id, "IDD")
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
                fieldValueMatches(values.contact_phone, customer.contact_phone)
            );
        });

        setSearchResults(filteredCustomers);
    };



        const handleClose = () => {
        setShowSearchModal(false)
    }

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

    return (
        <>
            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-3'>Search For a Customer</h1>
                    <Formik
                        initialValues={{
                            id: '',
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
                                            Customer Type
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
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="mt-4 mb-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Search
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className='mt-3'>
                        <div className="ag-theme-alpine" style={{ height: '250px', width: '100%' }}>
                            <AgGridReact rowData={searchResults} columnDefs={columnDefs} onCellClicked='{handleCellClicked}' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
