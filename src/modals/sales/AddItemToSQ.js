import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {setCustomer} from "../../redux/slices/customerSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {countries} from "countries-list";
import '../../pages/purchasing/purchasing.css'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {setItem} from "../../redux/slices/inventoryItemSlice";
import {url} from '../../connections/toServer'
import {setSelectedItem} from '../../redux/slices/salesSlice';
import {blueGrey, yellow} from "@mui/material/colors";
import toast from "react-hot-toast";

export const AddItemToSQModal = ({inventory, showModal, getSQData, sqData}) => {
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [vendors, setVendors] = useState()
    const [itemGroups, setItemGroups] = useState()
    const [itemProperties, setItemProperties] = useState()
    const [warehouses, setWarehouses] = useState()
    const [manufacturers, setManufacturers] = useState()
    const [isItemSelected, setIsItemSelected] = useState(false)
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const salesRep = JSON.parse(localStorage.getItem('token')).user_id
    const selectedItem = useSelector((state) => state.sales).selectedItem
    console.log(selectedItem, 'SELECTEDD ITEMMMM')
    const currency = '$'
    const costPlaceHolder = 'Last Recorded Cost' + ' ' + currency + selectedItem.cost


    console.log(inventory, 'INV DATA')
    // const filterCustomers = (values) => {
    //     const filteredCustomers = getInventoryData.filter((customer) => {
    //         // Helper function to check if a field value matches the customer property
    //         const fieldValueMatches = (fieldValue, customerProperty) => {
    //             const stringFieldValue = String(fieldValue);
    //             const stringCustomerProperty = String(customerProperty);
    //
    //             if (!stringFieldValue) {
    //                 return true; // Empty field value means it's a match for this field
    //             }
    //             return stringCustomerProperty.toLowerCase().includes(stringFieldValue.toLowerCase());
    //         };
    //
    //         console.log("state:", values.state, "customer id:", customer.state); // Debug log
    //         return (
    //             fieldValueMatches(values.id, customer.id) &&
    //             fieldValueMatches(values.tax_id, customer.tax_id) &&
    //             fieldValueMatches(values.customer_type, customer.customer_type) &&
    //             fieldValueMatches(values.company_name, customer.company_name) &&
    //             fieldValueMatches(values.first_name, customer.first_name) &&
    //             fieldValueMatches(values.last_name, customer.last_name) &&
    //             fieldValueMatches(values.email, customer.email) &&
    //             fieldValueMatches(values.phone_1, customer.phone_1) &&
    //             fieldValueMatches(values.status, customer.status) &&
    //             fieldValueMatches(values.city, customer.city) &&
    //             fieldValueMatches(values.state, customer.state) &&
    //             fieldValueMatches(values.contact_phone, customer.contact_phone)
    //         );
    //     });
    //
    //     setSearchResults(filteredCustomers);
    // };



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
            headerName: "Item ID No.",
            field: "id",
        },
        {
            headerName: "Item Name",
            field: "item_name",
        },
        {
            headerName: "Total In Stock",
            field: "totalInStock",
        },
        {
            headerName: "Total Available",
            field: "totalAvailable",
        },
    ];

    console.log(searchResults, 'SEARCH RESULT')

    const getRowStyle = (params) => {
        if (params.node.isSelected()) {
            console.log(params.node.isSelected(), 'isSelected')
            return { background: yellow }; // Highlight color when selected
        }
        return null; // Default style
    };
    const [selectedRowData, setSelectedRowData] = useState(null);
    const handleCellClicked = (params) => {
        const rowData = params.data
        console.log('AG GRID cell clicked', params);
        dispatch(setSelectedItem(params.data))
        setIsItemSelected(true)
    }
    console.log(selectedRowData, 'ROW SELECTED DATA')

    const getVendors = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/inventory/get-vendors/${tenantID}`, {
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
            const res = await axios.get(`${url}/api/inventory/get-item-groups/${tenantID}`, {
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
            const res = await axios.get(`${url}/api/inventory/get-item-properties/${tenantID}`, {
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
            const res = await axios.get(`${url}/api/inventory/get-warehouses/${tenantID}`, {
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
            const res = await axios.get(`${url}/api/inventory/get-manufacturers/${tenantID}`, {
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

    const handleSearch = (values) => {
        const parsedValues = {
            ...values,
            id: values.id !== '' ? parseInt(values.id, 10) : null,
            vendor_1: values.vendor_1 !== '' ? parseInt(values.vendor_1, 10) : null,
            vendor_2: values.vendor_2 !== '' ? parseInt(values.vendor_2, 10) : null,
        };

        const filterByValue = (value, searchTerm) => {
            if (value === null || value === undefined) return false;
            return value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        };

        const filteredData = inventory.filter(item => {
            return (
                (!parsedValues.id || filterByValue(item.id, parsedValues.id.toString())) &&
                (!parsedValues.item_name || filterByValue(item.item_name, parsedValues.item_name)) &&
                (!parsedValues.item_description || filterByValue(item.item_description, parsedValues.item_description)) &&
                (!parsedValues.item_type || item.item_type === parsedValues.item_type) &&
                (!parsedValues.manuf_sku || filterByValue(item.manuf_sku, parsedValues.manuf_sku)) &&
                (!parsedValues.vendor_1 || item.vendor_1 === parsedValues.vendor_1) &&
                (!parsedValues.vendor_2 || item.vendor_2 === parsedValues.vendor_2) &&
                (!parsedValues.status || item.status.toLowerCase() === parsedValues.status.toLowerCase()) &&
                (!parsedValues.inventory_item || item.inventory_item === parsedValues.inventory_item) &&
                (!parsedValues.sales_item || item.sales_item === parsedValues.sales_item) &&
                (!parsedValues.purchasing_item || item.purchasing_item === parsedValues.purchasing_item)
            );
        });

        setSearchResults(filteredData);
    };


    useEffect(() => {
        getVendors()
        getWarehouses()
        getItemGroups()
        getItemProperties()
        getManufacturers()
    }, []);

    const clearForm = (formik) => {
        formik.resetForm();
    };
    const priceAsNumber = parseFloat(selectedItem.price);
    return (
        <>
            <div className="modal">
                <div className="form-content">
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <h1 className='layout-title mt-3 mb-2'>Search for an Item</h1>
                    <Formik
                        initialValues={{
                            id: selectedRowData?.id || null,
                            item_name: selectedRowData?.item_name || null,
                        }}
                        onSubmit={(values) => {
                            handleSearch(values);
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
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="customer_type" className="block text-sm font-medium leading-6 text-gray-900">
                                                Item Type
                                            </label>
                                            <Field
                                                as="select"
                                                id="item_type"
                                                name="item_type"
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select an Option</option>
                                                <option value="items">Items</option>
                                                <option value="labor">Labor</option>
                                                <option value="travel">Travel</option>
                                                <option value="other">Other</option>
                                            </Field>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>

                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="manuf_sku" className='block text-sm font-medium leading-6 text-gray-900'>Manufacturer SKU</label>
                                            <Field type="text" placeholder='Manufacturer SKU' name="manuf_sku" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                            <ErrorMessage name="manuf_sku" component="div" />
                                        </div>
                                        <ErrorMessage name="manuf_sku" component="div" className="text-red-600" />
                                    </Col>
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
                                            onClick={() => {
                                                clearForm(formik);
                                                setSearchResults([]); // Clear search results as well
                                            }}
                                        >
                                            Clear Form
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className='mt-3'>
                        <div className="ag-theme-alpine" style={{ height: '12.5rem', width: '100%' }}>
                            <AgGridReact rowData={searchResults} columnDefs={columnDefs} getRowStyle={getRowStyle} onCellClicked={handleCellClicked} />
                        </div>
                    </div>
                    {isItemSelected && <Formik
                        initialValues={{
                            price: null,
                            warehouse: null

                        }}
                        onSubmit={(values, { resetForm }) => {
                            const price = parseFloat(values.price);
                            const quantity = parseFloat(values.quantity);
                            const dataToPost = {
                                unit_price: price,
                                quantity,
                                user_id: salesRep,
                                tenant_id: tenantID,
                                inv_item_id: selectedItem.id,
                                sq_id: sqData.id,
                                wh_id: values.warehouse

                            }
                            const handleSubmit = async () => {

                                try {
                                    const res = await axios.post(`${url}/api/sales/add-item-to-sq`, dataToPost,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,

                                            }
                                        });

                                    if (res.status === 200) {
                                        // Form data submitted successfully, handle success case here
                                        showModal(false)
                                    getSQData()


                                    } else {
                                        console.error('Please fill out all required data');
                                    }
                                } catch (error) {
                                    toast.error('Please fill out all required fields')
                                    // Handle any other errors that occurred during the submission process
                                    console.error('An error occurred:', error);
                                }
                            };
                            handleSubmit()

                        }}
                    >
                        <Form>
                            <Row gutter={20}>
                                <div className='ml-3 mt-2 selected-item'>{selectedItem.item_name}</div>
                            </Row>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="price" className='block text-sm font-medium leading-6 text-gray-900'>Price Per Unit</label>
                                        <Field
                                            type="text"
                                            placeholder={costPlaceHolder}
                                            name="price"
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            required // Add the required attribute
                                            validate={value => (value ? undefined : 'Price is required')} // Validation function
                                        />
                                        <ErrorMessage name="price" component="div" /> {/* Use the correct field name for the ErrorMessage */}
                                    </div>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="quantity" className='block text-sm font-medium leading-6 text-gray-900'>Quantity</label>
                                        <Field
                                            type="text"
                                            placeholder='Quantity'
                                            name="quantity"
                                            required // Add the required attribute
                                            validate={value => (value ? undefined : 'Quantity is required')} // Validation function
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        />
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>

                                </Col>
                                <Col span={8} xs={24} lg={8}>
                                    {selectedItem.inventory_item && (
                                        <div>
                                            <label htmlFor="warehouse" className="block text-sm font-medium leading-6 text-gray-900">
                                                Warehouse
                                            </label>
                                            <Field
                                                as="select"
                                                id="warehouse"
                                                name="warehouse"
                                                required={selectedItem.inventory_item} // Make it required conditionally
                                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Please Select a Warehouse</option>
                                                {warehouses?.map(warehouse => (
                                                    <option key={warehouse.id} value={warehouse.id}>
                                                        {warehouse.warehouse_name}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="mt-4 mb-3 ml-2 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </Row>
                        </Form>
                    </Formik>}

                </div>
            </div>
        </>
    )
}
