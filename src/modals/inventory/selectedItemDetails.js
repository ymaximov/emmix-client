import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage, formik } from 'formik';
import {Row, Col} from 'antd'
import {setCustomer} from "../../redux/slices/customerSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {countries} from "countries-list";
import '../../pages/CRM/crm.css'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {setItem} from "../../redux/slices/inventoryItemSlice";

export const selectedItemModal = ({setShowSelectedItemModal, inventory}) => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = JSON.parse(localStorage.getItem('token')).tenant_id



    const handleClose = () => {
        setShowSelectedItemModal(false)
    }




    // useEffect(() => {
    //
    // }, []);

    const clearForm = (formik) => {
        formik.resetForm();
    };
    return (
        <>
            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-3 mb-2'>Search for an Item</h1>
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
                            status: '',
                            vendor_1: null,
                            vendor_2: null,
                        }}
                        onSubmit={(values) => {

                            console.log('FORMM VALUES', values)
                        }}
                    >
                        {({ handleSubmit, ...formik }) => (
                            <Form>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="id" className='block text-sm font-medium leading-6 text-gray-900'>Item ID No.</label>
                                            <Field type="text" placeholder='Item ID No.' name="id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="id" component="div" />
                                        </div>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="id" className='block text-sm font-medium leading-6 text-gray-900'>Item Name</label>
                                            <Field type="text" placeholder='Item Name' name="item_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="item_name" component="div" />
                                        </div>
                                        <ErrorMessage name="item_name" component="div" className="text-red-600" />
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

                                    </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    )
}
