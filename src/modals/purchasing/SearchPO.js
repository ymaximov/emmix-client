import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col } from 'antd';
import { hideLoading, showLoading } from '../../redux/slices/alertsSlice';
import axios from 'axios';
import {useDispatch} from "react-redux";

export const SearchPO = ({ setShowSearchPO, POData }) => {
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const [warehouses, setWarehouses] = useState();
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id;
    console.log(POData, 'PO DATA')
    const filterPO = (values) => {
        const filteredPOData = POData.filter((order) => {
            const fieldValueMatches = (fieldValue, orderProperty) => {
                const stringFieldValue = String(fieldValue);

                if (stringFieldValue === '') {
                    return true; // Empty field value means it's a match for this field
                }

                if (fieldValue === null) {
                    return true; // Null field value means it's a match for this field
                }

                const includes = String(orderProperty).toLowerCase().includes(stringFieldValue.toLowerCase());
                console.log('Comparing:', stringFieldValue, 'to', orderProperty, 'Result:', includes);
                return includes;
            };


            return (
                fieldValueMatches(values.po_id, order.id) && // Use order.id for PO No.
                fieldValueMatches(values.warehouse, order.warehouse_name) && // Use order.warehouse_name for Warehouse
                fieldValueMatches(values.buyer, order.first_name) && // Use order.first_name for Buyer
                fieldValueMatches(values.vendor_name, order.vendor_name) && // Use order.vendor_name for Vendor
                fieldValueMatches(values.reference, order.reference) &&
                fieldValueMatches(values.po_status, order.status) &&
                fieldValueMatches(values.invoice_status, String(order.invoiced)) // Convert to string to match boolean values
            );
        });

        setSearchResults(filteredPOData);
        console.log('Filtered Results:', filteredPOData);
    };


    const getWarehouses = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-warehouses/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response');
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res);
                setWarehouses(res.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    };

    const handleClose = () => {
        setShowSearchPO(false);
    };

    const columnDefs = [
        {
            headerName: 'PO No.',
            field: 'id',
        },
        {
            headerName: 'Warehouse',
            field: 'warehouse.warehouse_name',
        },
        {
            headerName: 'Vendor',
            field: 'vendor.company_name',
        },
        {
            headerName: 'PO Status',
            field: 'status',
        },
        {
            headerName: 'PO Total',
            field: 'total_amount',
        },
    ];

    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
    };

    const clearForm = (formik) => {
        formik.resetForm();
    };

    useEffect(() => {
        getWarehouses();
    }, []);

    return (
        <>
            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className="layout-title mt-3 mb-2">Search for a Purchase Order</h1>
                    <Formik
                        initialValues={{
                            po_id: null,
                            warehouse: null,
                            buyer: null,
                            vendor_name: null,
                            reference: null,
                            po_status: null,
                            invoice_status: null,
                        }}
                        onSubmit={(values) => {
                            filterPO(values);
                        }}
                    >
                        {({ handleSubmit, ...formik }) => (
                            <Form>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="po_id" className="block text-sm font-medium leading-6 text-gray-900">
                                                Purchase Order No.
                                            </label>
                                            <Field
                                                type="text"
                                                placeholder="Purchase Order No."
                                                name="po_id"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="po_id" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="warehouse" className="block text-sm font-medium leading-6 text-gray-900">
                                                Warehouse
                                            </label>
                                            <Field
                                                as="select"
                                                id="warehouse"
                                                name="warehouse"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select a Warehouse</option>
                                                {warehouses?.map((warehouse, index) => (
                                                    <option key={index} value={warehouse.warehouse_name}>
                                                        {warehouse.warehouse_name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="warehouse" component="div" className="text-red-600" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="buyer" className="block text-sm font-medium leading-6 text-gray-900">
                                                Buyer
                                            </label>
                                            <Field
                                                as="select"
                                                id="buyer"
                                                name="buyer"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select a Buyer</option>
                                                {warehouses?.map((warehouse, index) => (
                                                    <option key={index} value={warehouse.warehouse_name}>
                                                        {warehouse.warehouse_name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="buyer" component="div" className="text-red-600" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="vendor_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Vendor Name
                                            </label>
                                            <Field
                                                type="text"
                                                placeholder="Vendor Name"
                                                name="vendor_name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="vendor_name" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="reference" className="block text-sm font-medium leading-6 text-gray-900">
                                                Reference
                                            </label>
                                            <Field
                                                type="text"
                                                placeholder="Reference"
                                                name="reference"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="reference" component="div" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="po_status" className="block text-sm font-medium leading-6 text-gray-900">
                                                PO Status
                                            </label>
                                            <Field
                                                as="select"
                                                id="po_status"
                                                name="po_status"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select an Option</option>
                                                <option value="Open">Open</option>
                                                <option value="Closed">Closed</option>
                                            </Field>
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="invoice_status" className="block text-sm font-medium leading-6 text-gray-900">
                                                Invoice Status
                                            </label>
                                            <Field
                                                as="select"
                                                id="invoice_status"
                                                name="invoice_status"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select an Option</option>
                                                <option value="true">Invoiced</option>
                                                <option value="false">Not Invoiced</option>
                                            </Field>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="crm-search-modal-buttons">
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
                    <div className="mt-3">
                        <div className="ag-theme-alpine" style={{ height: '19rem', width: '100%' }}>
                            <AgGridReact rowData={searchResults} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
