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
import {ErrorMessage, Field, Formik} from "formik";
import '../../pages/inventory/inventory.css'

export const AddNewInventoryItemModal = ({setShowAddNewInventoryItemModal, getVendorsData}) => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = JSON.parse(localStorage.getItem('token')).tenant_id



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
        setShowAddNewInventoryItemModal(false);
        // You can also close the modal after updating the state, depending on your use case
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('1111')
        try {
            const res = await axios.post("/api/vendor/add-new-vendor", 'values',
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
                    <h1 className='layout-title mt-1'>Add New Inventory Item</h1>
                    <Formik
                        initialValues={{
                            inventory_item: false,
                            sales_item: false,
                            purchasing_item: false,
                        }}
                    >
                        <Form layout="vertical">
                            <Tabs>
                                <Tabs.TabPane tab="General Details" key={0}>
                                    <div>
                                        {/*<h1 className="card-title mt-3">Company Details</h1>*/}
                                        <Row gutter={20}>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="item_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Item Type
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        id="item_type"
                                                        name="item_type"
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="">--Please Select an Option--</option>
                                                        <option value="items">Items</option>
                                                        <option value="labor">Labor</option>
                                                        <option value="travel">Travel</option>
                                                        <option value="other">Other</option>
                                                    </Field>
                                                </div>
                                                <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8} className='mt-5'>

                                                <div>
                                                    <label>
                                                        <Field type="radio" name="sales_tax" value="liable" />
                                                        Sales Tax/VAT Liable
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="sales_tax" value="exempt" />
                                                        Sales Tax/VAT Exempt
                                                    </label>
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div className='mt-2 item-type'>
                                                    <div>
                                                        <label>
                                                            <Field type="checkbox" name="inventory_item" />
                                                            Inventory Item
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <Field type="checkbox" name="sales_item" />
                                                            Sales Item
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <Field type="checkbox" name="purchasing_item" />
                                                            Purchasing Item
                                                        </label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="item_name" className='block text-sm font-medium leading-6 text-gray-900'>Item Name</label>
                                                    <Field type="text" placeholder='Item Name' name="item_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="item_name" component="div" />
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="item_description" className='block text-sm font-medium leading-6 text-gray-900'>Desctiption</label>
                                                    <Field type="text" placeholder='Description' name="item_description" className='custom-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="item_description" component="div" />
                                                </div>
                                            </Col>
                                        </Row>
                                            <Row gutter={20}>
                                                <Col span={8} xs={240} s={24} lg={8}>
                                                    <div>
                                                        <label htmlFor="vendor_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Item Group
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="item_group"
                                                            name="item_group"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">Please Select an Option</option>
                                                        </Field>
                                                    </div>
                                                    <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                                </Col>
                                                <Col span={8} xs={240} s={24} lg={8}>
                                                    <div>
                                                        <label htmlFor="manufacturer" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Manufacturer
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="manufacturer"
                                                            name="manufacturer"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">Please Select an Option</option>
                                                        </Field>
                                                    </div>
                                                    <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                                </Col>
                                                <Col span={8} xs={240} s={24} lg={8}>
                                                    <div>
                                                        <label htmlFor="item_management" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Manage Item By (Serial Numbers/Batches)
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            id="item_management"
                                                            name="item_management"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">Please Select an Option</option>
                                                            <option value="none">None</option>
                                                            <option value="serial">Serial Numbers</option>
                                                            <option value="batch">Batches</option>
                                                        </Field>
                                                    </div>
                                                    <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                                </Col>
                                            </Row>

                                        <Row gutter={20}>
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
                                                    <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Zip/Postal Code</label>
                                                    <Field type="text" placeholder='Zip/Postal Code' name="postal_code" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="name" component="div" />
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        id="country"
                                                        name="country"
                                                        className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {countryOptions.map((country) => (
                                                            <option key={country.value} value={country.value}>
                                                                {country.label}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="country" component="div" className="text-red-600" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="vendor_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Sector
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        id="vendor_type"
                                                        name="vendor_type"
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="">--Please Select an Option--</option>
                                                        <option value="commercial">Commercial</option>
                                                        <option value="government">Government</option>
                                                        <option value="education">Education</option>
                                                        <option value="individual">Individual</option>
                                                    </Field>
                                                </div>
                                                <ErrorMessage name="vendor_type" component="div" className="text-red-600" />
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>

                                                <div>
                                                    <label>
                                                        <Field type="radio" name="status" value="active" />
                                                        Active
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="status" value="inactive" />
                                                        Inactive
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Contact Information' key={1}>
                                    {/*<h1 className="card-title mt-3">Company Details</h1>*/}

                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Contact Name</label>
                                                <Field type="text" placeholder='e.g. CEO, Account Manager' name="contact_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>First Name</label>
                                                <Field type="text" placeholder='First Name' name="first_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Last Name</label>
                                                <Field type="text" placeholder='Last Name' name="last_name" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Phone Number</label>
                                                <Field type="text"  placeholder='Phone Nymber' name="contact_phone" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                                                <Field type="text"  name="email" placeholder='Email Address' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>

                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Purchasing History' key={2}></Tabs.TabPane>
                                <Tabs.TabPane tab='Inventory' key={3}></Tabs.TabPane>
                                <Tabs.TabPane tab='Contracts' key={4}></Tabs.TabPane>
                                <Tabs.TabPane tab='Attachments' key={5}>
                                    <Row gutter={20}>

                                        <div className="flex flex-col">
                                            <label htmlFor="remarks" className="mb-2">
                                                Remarks
                                            </label>
                                            <Field
                                                as="textarea"
                                                id="remarks"
                                                name="remarks"
                                                rows="14"
                                                cols="100"
                                                className="border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                                            ></Field>
                                            <ErrorMessage name="remarks" component="div" className="text-red-600" />
                                        </div>
                                    </Row>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Remarks' key={6}>
                                    <Row gutter={20}>

                                        <div className="flex flex-col">
                                            <label htmlFor="remarks" className="mb-2">
                                                Remarks
                                            </label>
                                            <Field
                                                as="textarea"
                                                id="remarks"
                                                name="remarks"
                                                rows="14"
                                                cols="100"
                                                className="border border-gray-400 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                                            ></Field>
                                            <ErrorMessage name="remarks" component="div" className="text-red-600" />
                                        </div>
                                    </Row>
                                </Tabs.TabPane>

                            </Tabs>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="mt-6 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update & Close
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
