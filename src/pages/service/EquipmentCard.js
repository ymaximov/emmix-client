import {Layout} from "../layout/Layout";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Row, Col, Tabs} from 'antd'
import './service.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AgGridReact} from "ag-grid-react";
import toast from "react-hot-toast";

export const EquipmentCard = () => {

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const ECID = useSelector((state) => state.service).ecID
    console.log(ECID, 'EC IDDDD')
    const dispatch = useDispatch()
    const [ECData, setECData] = useState()

    const woColumns = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
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
            headerName: `Price Per Unit `,
            field: "unit_price",
        },
        {
            headerName: `Warehouse`,
            field: "warehouse.warehouse_name",
        },
    ];

    const contractsColumns = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
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
        {
            headerName: `Warehouse`,
            field: "warehouse.warehouse_name",
        },
    ];

    const handleWOCellClicked = (event) => {
        console.log(event, 'EVENT');

    }

    const handleContraxtslicked = (event) => {
        console.log(event, 'EVENT');

    }
    const getECData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/service/get-ec-data-by-id/${ECID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res.data, 'RES QL DATA')
                setECData(res.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const initialValues = {
        // Define each form field and its initial value
        status: ECData?.status,
        mfr_serial: ECData?.mfr_serial,
        serial_no: ECData?.serial_no,
        delivery_id: isNaN(ECData?.delivery_id) ? null : parseInt(ECData?.delivery_id, 10), // Check and convert to number or set to null
        inv_item_id: isNaN(ECData?.inv_item_id) ? null : parseInt(ECData?.inv_item_id, 10), // Check and convert to number or set to null
        technician_id: isNaN(ECData?.technician_id) ? null : parseInt(ECData?.technician_id, 10), // Check and convert to number or set to null
    };



    const handleSubmit = async (values, actions) => {
        // Replace empty strings with null
        for (const key in values) {
            if (values[key] === "") {
                values[key] = null;
            }
        }

        console.log('form data', values);
        actions.setSubmitting(false);

        try {
            values.id = ECID;
            values.tenant_id = tenantID;
            const res = await axios.put(`${url}/api/service/update-ec`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                getECData();
                console.log('Form submitted successfully!');
            } else {
                toast.error(res.data.message);
                console.error('Form submission failed.');
            }
        } catch (error) {
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };


    useEffect(() => {
        getECData()

    }, []);

    return (
        <>
            <Layout />
            <div className={'title ml-2'}>Equipment Card {ECData?.equipmentCard.id}</div>
            <div className="layout">

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form layout="vertical">
                                <button className="ri-checkbox-fill mb-1"
                                        type="submit"
                                ></button>
                                <Row className={'upper'}>
                                    <Col>
                                        <div className="grid grid-cols-2 gap-2 mt-4 mb-7">
                                            <div className="text-right">Customer No.</div>
                                            <div className="bg-gray-100">{ECData?.equipmentCard.customer?.id}</div>
                                            <div className="text-right">Customer Name</div>
                                            <div className="bg-gray-100">{ECData?.equipmentCard.customer?.company_name}</div>
                                            <div className="text-right">Customer Contact</div>
                                            <div className="bg-gray-100">{ECData?.equipmentCard.customer?.first_name} {ECData?.customer?.last_name}</div>
                                            <div className="text-right">Contact Phone</div>
                                            <div className="bg-gray-100">{ECData?.equipmentCard.customer?.contact_phone}</div>
                                            <div className="text-right">Main Phone</div>
                                            <div className="bg-gray-100">{ECData?.equipmentCard.customer?.phone_1}</div>
                                        </div>
                                    </Col>
                                </Row>
                                <hr/>
                                <div className={'definitions mt-4'}>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Status
                                            </label>
                                            <Field
                                                as="select"
                                                id="country"
                                                name="status"
                                                className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value='active'>
                                                    Active
                                                </option>
                                                <option  value='terminated'>
                                                    Terminated
                                                </option>
                                                <option  value='loaned'>
                                                    Loaned
                                                </option>
                                                <option  value='in repair lab'>
                                                    In Repair Lab
                                                </option>
                                            </Field>
                                            <ErrorMessage name="country" component="div" className="text-red-600" />
                                        </div>
                                    </Col>

                                </Row>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Mfr Serial No.</label>
                                                <Field type="text" placeholder='Mfr Serial No.' name="mfr_serial" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Serial No.</label>
                                                <Field type="text" placeholder='Serial No.' name="serial_no" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Item No.</label>
                                                <Field type="text" placeholder='Item No.' name="inv_item_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8} className={'mt-8 ml-3'}>
                                            <div>
                                                {ECData?.equipmentCard?.inventory_item?.item_name}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Technician No.</label>
                                                <Field type="text" placeholder='Techician No.' name="technician_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8} className={'mt-8 ml-3'}>
                                            <div>
                                                {ECData?.technician?.first_name} {ECData?.technician?.last_name}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <Tabs className={'mt-3'}>
                                    <Tabs.TabPane tab="Address" key={0}>
                                        <Row className={'upper'}>
                                            <Col>
                                                <div className="grid grid-cols-2 gap-2 mt-4 mb-7">
                                                    <div className="text-right">Address 1</div>
                                                    <div className="bg-gray-100">{ECData?.equipmentCard.customer?.address_1}</div>
                                                    <div className="text-right">Address 2</div>
                                                    <div className="bg-gray-100">{ECData?.equipmentCard.customer?.address_2}</div>
                                                    <div className="text-right">City, State</div>
                                                    <div className="bg-gray-100">{ECData?.equipmentCard.customer?.city} {ECData?.customer?.state}</div>
                                                    <div className="text-right">Zip Code</div>
                                                    <div className="bg-gray-100">{ECData?.equipmentCard.customer?.postal_code} </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Service Contracts" key={1}>
                                        <div className=''>
                                            <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                                <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={contractsColumns} onCellClicked={handleContraxtslicked}/>
                                            </div>
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Work Orders" key={2}>
                                        <div className=''>
                                            <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                                <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                            </div>
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Sales Data" key={3} className={'lower'}>
                                        <Row gutter={20} >
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Delivery No.</label>
                                                    <Field type="text" placeholder='Delivery No.' name="delivery_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="name" component="div" />
                                                </div>
                                            </Col>
                                            <Col span={8} xs={240} s={24} lg={8} className='mt-7'>
                                                <div>
                                                    {ECData?.equipmentCard.delivery_id}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col span={8} xs={240} s={24} lg={8}>
                                                <div>
                                                    <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Invoice No.</label>
                                                    <Field type="text" placeholder='Invoice No.' name="invoice_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                    <ErrorMessage name="name" component="div" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Attachments" key={4}>

                                    </Tabs.TabPane>
                                </Tabs>

                            </Form>
                        </Formik>


            </div>
        </>
    )
}
