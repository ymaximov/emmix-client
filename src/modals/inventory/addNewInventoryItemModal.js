import {Button, Col, Input, Row, Select, Tabs} from "antd";
import {AddNewUserModal} from "../../modals/admin/AddNewUserModal";
import {UpdateUserModal} from "../../modals/admin/UpdateUserModal";
import {countries} from "countries-list";
import React, {useEffect, useState} from "react";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import {useSelector} from "react-redux";
import {ErrorMessage, Field, Formik, Form} from "formik";
import '../../pages/inventory/inventory.css'
import {useDispatch} from "react-redux";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import toast from 'react-hot-toast'

export const AddNewInventoryItemModal = ({setShowAddNewInventoryItemModal, getVendorsData}) => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = JSON.parse(localStorage.getItem('token')).tenant_id
    const dispatch = useDispatch()
    const [vendors, setVendors] = useState()
    const [itemGroups, setItemGroups] = useState()
    const [itemProperties, setItemProperties] = useState()
    const [warehouses, setWarehouses] = useState()
    const [manufacturers, setManufacturers] = useState()

    const getVendors = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-vendors/${tenant}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setVendors(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const getItemGroups = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-item-groups/${tenant}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response ITEMGROPUS')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res, 'ITEM GROUPSSS')
                setItemGroups(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    console.log(itemGroups, "ITEMGROUPS")
    const getItemProperties = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-item-properties/${tenant}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setItemProperties(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const getWarehouses = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-warehouses/${tenant}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setWarehouses(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const getManufacturers = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/inventory/get-manufacturers/${tenant}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setManufacturers(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
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
    };
    const handleClose = () => {
        // Perform some action that updates the state in the parent component
        setShowAddNewInventoryItemModal(false);
        // You can also close the modal after updating the state, depending on your use case
    };
    const addItem = async (values, actions) => {
        console.log('addItem Function Called')
        console.log('FORM VALUES', values)
        values.tenant_id = tenant

        try {
            const res = await axios.post("/api/inventory/add-new-inventory-item", values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                setShowAddNewInventoryItemModal(false)
                console.log('Form submitted successfully!');
            } else {
                toast.error(res.data.message)
                console.error('Form submission failed.');
            }
        } catch (error) {
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };
    console.log(vendors, 'VENDORS')


    useEffect(() => {
        getVendors()
        getWarehouses()
        getItemGroups()
        getItemProperties()
        getManufacturers()
    }, []);
    return (
        <>

            <div className="modal ADDInventoryModal  ">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-1'>Add New Inventory Item</h1>
                    <Formik
                        initialValues={{
                            inventory_item: false,
                            sales_item: false,
                            purchasing_item: false,
                            sales_tax_liable: false,
                            item_type: null,
                            item_group_id: null,
                            item_management: null,
                            barcode: null,
                            addit_identifier: null,
                           country: null,
                            vendor_1: null,
                            vendor_2: null,
                            vendor_3: null,
                            // prop_1: false,
                            // prop_2: false,
                            // prop_3: false,
                            // prop_4: false,
                            // prop_5: false,
                            // prop_6: false,
                            // prop_7: false,
                            // prop_8: false,
                            // prop_9: false,
                            // prop_10: false,
                            manuf_sku: null,
                            purchasing_uom: null,
                            purchasing_items_per_unit: null,
                            purchasing_items_per_package: null,
                            purchasing_packaging_uom: null,
                            length: null,
                            width: null,
                            height: null,
                            volume: null,
                            weight: null,
                            sales_uom: null,
                            sales_items_per_unit: null,
                            sales_packaging_uom: null,
                            sales_items_per_package: null,
                            required_inv: null,
                            minimum_inv: null,
                            maximum_inv: null,
                            warehouse_1: null,
                            warehouse_2: null,
                            warehouse_3: null,
                            warehouse_4: null

                        }}
                        onSubmit={addItem}
                    >
                        <Form layout="vertical" >
                            <Tabs rootClassName='overflow-hidden'>
                                <Tabs.TabPane tab="General" key={0}>
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
                                                        <option value="">Please Select an Option</option>
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
                                                        <Field type="checkbox" name="sales_tax_liable" />
                                                        Sales Tax/VAT Liable
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
                                        <hr  className='mt-4 mb-4'/>
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
                                                            name="item_group_id"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">Please Select an Option</option>
                                                            {itemGroups?.map((group) => (
                                                                <option key={group.id} value={group.id}>
                                                                    {group.name}
                                                                </option>
                                                            ))}
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
                                                            name="manufacturer_id"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value="">Please Select an Option</option>
                                                            {manufacturers?.map((group) => (
                                                                <option key={group.id} value={group.id}>
                                                                    {group.name}
                                                                </option>
                                                            ))}
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
                                        <hr  className='mt-4 mb-4'/>
                                        <Row gutter={20}>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="barcode" className='block text-sm font-medium leading-6 text-gray-900'>Barcode</label>
                                                    <Field type="text" placeholder='Barcode' name="barcode" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="barcode" component="div" />
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="add_identifier" className='block text-sm font-medium leading-6 text-gray-900'>Additional Identifier</label>
                                                    <Field type="text" placeholder='Additional Identifier' name="addit_identifier" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="add_identifier" component="div" />
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="country_origin" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country of Origin
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        id="country_origin"
                                                        name="country"
                                                        className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {countryOptions.map((country) => (
                                                            <option key={country.value} value={country.value}>
                                                                {country.label}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="country_origin" component="div" className="text-red-600" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8} className='mt-3'>
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
                                <Tabs.TabPane tab='Purchasing' key={1}>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="vendor" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Preferred Supplier
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="vendor"
                                                    name="vendor_1"
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">Please Select an Option</option>
                                                    {vendors?.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.company_name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <ErrorMessage name="vendor" component="div" className="text-red-600" />
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="vendor" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Secondary Supplier
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="vendor2"
                                                    name="vendor_2"
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="">Please Select an Option</option>
                                                    {vendors?.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.company_name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <ErrorMessage name="vendor2" component="div" className="text-red-600" />
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="manuf_sku" className='block text-sm font-medium leading-6 text-gray-900'>Manufacturer SKU</label>
                                                <Field type="text" placeholder='Manufacturer SKU' name="manuf_sku" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="manuf_sku" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr  className='mt-4 mb-4'/>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="purchasing_uom" className='block text-sm font-medium leading-6 text-gray-900'>Purchasing UoM</label>
                                                <Field type="text" placeholder='Purchasing UoM' name="purchasing_uom" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="purchasing_uom" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="purchasing_items_per_unit" className='block text-sm font-medium leading-6 text-gray-900'>Items Per Purchasing Unit</label>
                                                <Field type="text"  placeholder='Items Per Purchasing Unit' name="purchasing_items_per_unit" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="purchasing_items_per_unit" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="purchasing_packaging_uom" className='block text-sm font-medium leading-6 text-gray-900'>Packaging UoM</label>
                                                <Field type="text"  placeholder='Packaging UoM' name="purchasing_packaging_uom" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="purchasing_packaging_uom" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="purchasing_items_per_package" className='block text-sm font-medium leading-6 text-gray-900'>Items Per Package</label>
                                                <Field type="text"  placeholder='Items Per Package' name="purchasing_items_per_package" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="purchasing_items_per_package" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr  className='mt-4 mb-4'/>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="length" className='block text-sm font-medium leading-6 text-gray-900'>Length</label>
                                                <Field type="text"  placeholder='Length' name="length" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="length" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="width" className='block text-sm font-medium leading-6 text-gray-900'>Width</label>
                                                <Field type="text"  placeholder='Width' name="width" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="width" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="hieght" className='block text-sm font-medium leading-6 text-gray-900'>Height</label>
                                                <Field type="text"  placeholder='Height' name="hieght" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="hieght" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="volume" className='block text-sm font-medium leading-6 text-gray-900'>Volume</label>
                                                <Field type="text"  placeholder='Volume' name="volume" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="volume" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="weight" className='block text-sm font-medium leading-6 text-gray-900'>Weight</label>
                                                <Field type="text"  placeholder='Weight' name="weight" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="weight" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Sales' key={2}>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="sales_uom" className='block text-sm font-medium leading-6 text-gray-900'>Sales UoM</label>
                                                <Field type="text" placeholder='Sales UoM' name="sales_uom" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="sales_uom" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="sales_items_per_unit" className='block text-sm font-medium leading-6 text-gray-900'>Items Per Unit</label>
                                                <Field type="text"  placeholder='Items Per Unit' name="sales_items_per_unit" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="sales_items_per_unit" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="sales_packaging_uom" className='block text-sm font-medium leading-6 text-gray-900'>Packaging UoM</label>
                                                <Field type="text"  placeholder='Packaging UoM' name="sales_packaging_uom" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="sales_packaging_uom" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="items_per_package" className='block text-sm font-medium leading-6 text-gray-900'>Items Per Package</label>
                                                <Field type="text"  placeholder='Items Per Package' name="sales_items_per_package" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="items_per_package" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr  className='mt-4 mb-4'/>
                                    {/*<Row gutter={20}>*/}
                                    {/*    <Col span={8} xs={240} s={24} lg={8}>*/}
                                    {/*        <div>*/}
                                    {/*            <label htmlFor="length" className='block text-sm font-medium leading-6 text-gray-900'>Length</label>*/}
                                    {/*            <Field type="text"  placeholder='Length' name="length" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>*/}
                                    {/*            <ErrorMessage name="length" component="div" />*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col span={8} xs={240} s={24} lg={8}>*/}
                                    {/*        <div>*/}
                                    {/*            <label htmlFor="width" className='block text-sm font-medium leading-6 text-gray-900'>Width</label>*/}
                                    {/*            <Field type="text"  placeholder='Width' name="width" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>*/}
                                    {/*            <ErrorMessage name="width" component="div" />*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col span={8} xs={240} s={24} lg={8}>*/}
                                    {/*        <div>*/}
                                    {/*            <label htmlFor="hieght" className='block text-sm font-medium leading-6 text-gray-900'>Height</label>*/}
                                    {/*            <Field type="text"  placeholder='Height' name="hieght" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>*/}
                                    {/*            <ErrorMessage name="hieght" component="div" />*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row gutter={20}>*/}
                                    {/*    <Col span={8} xs={240} s={24} lg={8}>*/}
                                    {/*        <div>*/}
                                    {/*            <label htmlFor="volume" className='block text-sm font-medium leading-6 text-gray-900'>Volume</label>*/}
                                    {/*            <Field type="text"  placeholder='Volume' name="volume" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>*/}
                                    {/*            <ErrorMessage name="volume" component="div" />*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*    <Col span={8} xs={240} s={24} lg={8}>*/}
                                    {/*        <div>*/}
                                    {/*            <label htmlFor="weight" className='block text-sm font-medium leading-6 text-gray-900'>Weight</label>*/}
                                    {/*            <Field type="text"  placeholder='Weight' name="weight" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>*/}
                                    {/*            <ErrorMessage name="weight" component="div" />*/}
                                    {/*        </div>*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Inventory Data' key={3}>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="required_inv" className='block text-sm font-medium leading-6 text-gray-900'>Required (Purchasing UoM)</label>
                                                <Field type="text"  placeholder='Required Inventory' name="required_inv" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="required_inv" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="minimum_inv" className='block text-sm font-medium leading-6 text-gray-900'>Minimum</label>
                                                <Field type="text"  placeholder='Weight' name="minimum_inv" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="minimum_inv" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="maximium_inv" className='block text-sm font-medium leading-6 text-gray-900'>Maximum</label>
                                                <Field type="text"  placeholder='Weight' name="maximium_inv" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="maximium_inv" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <hr  className='mt-4 mb-4'/>
                                    {warehouses && warehouses.length > 0 ? (
                                        <div>
                                            <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                                                <AgGridReact rowData={warehouses} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>Warehouse Data Has Not Been Set Up</div>
                                    )}
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Item Properties' key={4}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div className='item-properties'>
                                        <div className='mt-2 item-type'>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_1" className='mr-1'/>
                                                   Property 1: {itemProperties?.prop_1}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_2" className='mr-1' />
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_3" className='mr-1' />
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_4" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_5" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_6" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_7" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_8" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_9" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <Field type="checkbox" name="prop_10" className='mr-1'/>
                                                    {}
                                                </label>
                                            </div>
                                        </div>
                                        </div>
                                    </Col>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Attachments' key={5}>

                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Remarks'  key={6}>
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
