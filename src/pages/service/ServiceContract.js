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

export const ServiceContract = () => {

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const SCID = useSelector((state) => state.service).scID
    console.log(SCID, 'SC IDDDD')
    const dispatch = useDispatch()
    const [SCData, setSCData] = useState()
    const contractType = SCData?.contract_type == 'service' ? 'Service' : 'Repair'

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
    const getSCData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/service/get-sc-data-by-id/${SCID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res.data, 'RES SC DATA')
                setSCData(res.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const initialValues = {
        status: SCData?.serviceContract.status,
        equipment_id: SCData?.serviceContract.equipment_id,
        description: SCData?.serviceContract.description,
        remarks: SCData?.serviceContract.remarks,
        service_type: SCData?.serviceContract.service_type,
        response_time: SCData?.serviceContract.response_time,
        resolution_time: SCData?.serviceContract.resolution_time,
        response_time_type: SCData?.serviceContract.response_time_type,
        resolution_time_type: SCData?.serviceContract.resolution_time_type,
        technician_id: SCData?.serviceContract.technician_id
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
            values.id = SCID;
            values.tenant_id = tenantID;
            const res = await axios.put(`${url}/api/service/update-sc`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                getSCData();
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
        getSCData()

    }, []);

    return (
        <>
            <Layout />
            <div className={'title ml-2'}>{contractType} Contract {SCData?.serviceContract?.id}</div>
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
                                    <div className="bg-gray-100">{SCData?.serviceContract.customer?.id}</div>
                                    <div className="text-right">Customer Name</div>
                                    <div className="bg-gray-100">{SCData?.serviceContract.customer?.company_name}</div>
                                    <div className="text-right">Customer Contact</div>
                                    <div className="bg-gray-100">{SCData?.serviceContract.customer?.first_name} {SCData?.customer?.last_name}</div>
                                    <div className="text-right">Contact Phone</div>
                                    <div className="bg-gray-100">{SCData?.serviceContract.customer?.contact_phone}</div>
                                    <div className="text-right">Main Phone</div>
                                    <div className="bg-gray-100">{SCData?.serviceContract.customer?.phone_1}</div>
                                </div>
                            </Col>
                        </Row>
                        <hr/>
                        <Row gutter={20} className={'mt-2'}>
                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                            <div>
                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Description</label>
                                <Field type="text" placeholder='Description' name="description" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                <ErrorMessage name="name" component="div" />
                            </div>
                        </Col>
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
                                    <option  value='draft'>
                                        Draft
                                    </option>
                                    <option value='approved'>
                                        Approved
                                    </option>
                                    <option  value='terminated'>
                                        Terminated
                                    </option>
                                    <option  value='on hold'>
                                        On Hold
                                    </option>

                                </Field>
                                <ErrorMessage name="country" component="div" className="text-red-600" />
                            </div>
                        </Col>
                        </Row>
                        {SCData?.serviceContract.contract_type == 'repair' && <Row  gutter={20} className={'eq'}>
                            <Col span={8} xs={240} s={24} lg={8} className={''}>
                                <div className={'flex'}>
                                <div>
                                    <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Equipment No.</label>
                                    <Field type="text" placeholder='Equipment No.' name="equipment_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                    <div className={'mt-7 ml-2'}>
                                        {SCData?.serviceContract?.equipment_card?.inventory_item?.item_name}
                                    </div>
                                </div>
                            </Col>
                        </Row>}


                        <Tabs className={'mt-3'}>
                            <Tabs.TabPane tab="Terms" key={0}>
                                <div>
                                    <Field
                                        as="textarea" // Use "textarea" as the input type
                                        id="remarks"
                                        name="remarks"
                                        rows="18" // Adjust the number of rows as needed
                                        cols="150" // Adjust the number of columns as needed
                                    />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Details" key={1}>
                                <div className={'definitions mt-4'}>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Service Type
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="country"
                                                    name="service_type"
                                                    className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    <option  value='regular'>
                                                        Regular
                                                    </option>
                                                    <option value='warranty '>
                                                        Warranty
                                                    </option>
                                                </Field>
                                                <ErrorMessage name="country" component="div" className="text-red-600" />
                                            </div>
                                        </Col>

                                    </Row>
                                    <div className={'mt-1'}>Response Time</div>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>

                                                <div className={'flex'}>
                                                    <div className={'hour'}>
                                                        <Field type="text" placeholder='' name="response_time" className='  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                        <ErrorMessage name="name" component="div" />
                                                    </div>
                                                    <div>
                                                        <Field
                                                            as="select"
                                                            id="country"
                                                            name="response_time_type"
                                                            className="block hours w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option  value='hours'>
                                                                Hours
                                                            </option>
                                                            <option value='days'>
                                                                Days
                                                            </option>
                                                        </Field>
                                                        <ErrorMessage name="country" component="div" className="text-red-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div>Resolution Time</div>
                                    <Row gutter={20}>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div>

                                                <div className={'flex'}>
                                                    <div className={'hour'}>
                                                        <Field type="text" placeholder='' name="resolution_time" className='  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                        <ErrorMessage name="name" component="div" />
                                                    </div>
                                                    <div>
                                                        <Field
                                                            as="select"
                                                            id="country"
                                                            name="resolution_time_type"
                                                            className="block hours w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option  value='hours'>
                                                                Hours
                                                            </option>
                                                            <option value='days'>
                                                                Days
                                                            </option>
                                                        </Field>
                                                        <ErrorMessage name="country" component="div" className="text-red-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>

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
                                                {/*{ECData?.technician?.first_name} {ECData?.technician?.last_name}*/}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tabs.TabPane>
                            { SCData?.serviceContract.contract_type == 'regular' && <Tabs.TabPane tab="Items" key={2}>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>}
                            <Tabs.TabPane tab="Coverage" key={3} className={'lower'}>
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
                                            {/*{SCData?.equipmentCard.delivery_id}*/}
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
