import React, {useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col, Tabs} from 'antd'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../../pages/service/service.css'
import TimePicker from 'react-time-picker';
import {url} from "../../connections/toServer";
import axios from 'axios'

export const NewROActivity = ({showModal, getROData, ROID}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const userFirstName = JSON.parse(localStorage.getItem('token')).first_name;
    const userLastName = JSON.parse(localStorage.getItem('token')).last_name;
    const userID = JSON.parse(localStorage.getItem('token')).user_id;
    const [startAmPmTime, setStartAmPmTime] = useState('12:00 PM');
    const [endAmPmTime, setEndAmPmTime] = useState('12:00 PM');


    const materialsColumns = [
        {
            headerName: "Item No.",
            field: "inv_item_id",
        },
        {
            headerName: "Item Name",
            field: "inventory_item.item_name",
        },
        {
            headerName: "Quantity",
            field: "quantity",
        },
        {
            headerName: `Price Per Unit`,
            field: "unit_price",
        },
    ];
    const handleClose = () => {
        showModal(false)
    }


    const clearForm = (formik) => {
        formik.resetForm();
    };
    return (
        <>
            <div className="modal">
                <div className="form-content">


                    <h1 className='layout-title mt-3 mb-2'>New Activity</h1>
                    <Formik
                        initialValues={{
                            activity_type: null,
                            start_date: null,
                            start_time: null,
                            end_date: null,
                            end_time: null,
                            remarks: null,
                            description: null
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const requestData = {
                                    tenant_id: tenantId,
                                    technician_id: userID,
                                    ro_id: ROID,
                                    meeting_location: values.meeting_location,
                                    start_date: values.start_date,
                                    start_time: values.start_time,
                                    end_date: values.end_date,
                                    end_time: values.end_time,
                                    remarks: values.remarks,
                                    description: values.description,
                                    email: values.email,
                                    phone_1: values.phone_1,
                                    contact_phone: values.contact_phone,
                                    status: values.status
                                };

                                const apiUrl = `${url}/api/service/create-ro-activity`;

                                // Send the POST request with Axios
                                const res = await axios.post(apiUrl, requestData, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });

                                if (res.status == 200) {
                                   getROData()
                                    handleClose()
                                }
                            } catch (error) {
                                // Handle errors here
                                console.log('Error:', error);
                            } finally {
                                // This will be executed regardless of success or failure
                                setSubmitting(false);
                            }
                        }}

                    >
                        {({ handleSubmit, ...formik }) => (
                        <Form>
                            <div className={'flex'}>
                                <i className="ri-close-circle-line" onClick={handleClose}></i>
                                <button className="ri-checkbox-fill ml-1"
                                        type="submit"
                                ></button>
                            </div>
                            <Row gutter={20}>
                                <div className="grid grid-cols-2 gap-2 ml-3 mb-1">
                                    <div className="gap-2">
                                        <div className="">Technician</div>
                                        <div className="bg-gray-100">{userFirstName} {userLastName}</div>
                                    </div>
                                </div>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div className="grid grid-cols-2 gap-2 mb-1">
                                        <div className="gap-2">
                                            <div className="">Status</div>
                                            <div className="bg-gray-100">Open</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div className={'status'}>
                                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                            Activity Type
                                        </label>
                                        <Field
                                            as="select"
                                            id="customer_type"
                                            name="meeting_location"
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="repair lab">Repair Lab</option>
                                            <option value="customer site">Customer Site</option>
                                            <option value="phone call">Phone Call</option>
                                        </Field>
                                        <ErrorMessage name="state" component="div" className="text-red-600" />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div className={'subject-ro'}>
                                        <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Subject</label>
                                        <Field type="text" placeholder='Subject' name="description" className=' block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="name" component="div" />
                                    </div>
                                </Col>
                            </Row>
                            <Tabs>
                                <Tabs.TabPane key={0} tab='General'>
                                    <Row gutter={20}>

                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                                    Start Date
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="start_date"
                                                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                                   Start Time
                                                </label>
                                                <Field
                                                    type="time"
                                                    name="start_time"
                                                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="time" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>

                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                                    End Date
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="end_date"
                                                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                                    End Time
                                                </label>
                                                <Field
                                                    type="time"
                                                    name="end_time"
                                                    className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="time" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>
                                        </Col>
                                    </Row>



                                </Tabs.TabPane>
                                <Tabs.TabPane key={1} tab='Activity Remarks'>
                                    <div>
                                        <Field
                                            as="textarea" // Use "textarea" as the input type
                                            id="remarks"
                                            name="remarks"
                                            rows="10" // Adjust the number of rows as needed
                                            cols="100" // Adjust the number of columns as needed
                                        />
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={2} tab='Update Status'>

                                </Tabs.TabPane>
                                <Tabs.TabPane key={3} tab='Attachments'>

                                </Tabs.TabPane>
                            </Tabs>
                        </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    )
}
