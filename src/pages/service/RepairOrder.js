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

export const RepairOrder = () => {

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const ROID = useSelector((state) => state.service).roID
    console.log(ROID, 'RO IDDDD')
    const dispatch = useDispatch()
    const [ROData, setROData] = useState()
    const [problemTypes, setProblemTypes] = useState([])
    // const contractType = SCData?.contract_type == 'service' ? 'Service' : 'Repair'

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
    const getROData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/service/get-ro-data-by-id/${ROID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res.data, 'RES RO DATA')
                setROData(res.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const initialValues = {
        status: ROData?.repairOrder.status,
        description: ROData?.repairOrder.description,
        technician_id: ROData?.repairOrder.technician_id,
        repair_description: ROData?.repairOrder.repair_description,
        resolution_description: ROData?.repairOrder.resolution_description,
        contact_name: ROData?.repairOrder.contact_name,
        phone_1: ROData?.repairOrder.phone_1,
        mobile_phone: ROData?.repairOrder.mobile_phone,
        email: ROData?.repairOrder.email,
        // remarks: SCData?.serviceContract.remarks,
        // service_type: SCData?.serviceContract.service_type,
        // response_time: SCData?.serviceContract.response_time,
        // resolution_time: SCData?.serviceContract.resolution_time,
        // response_time_type: SCData?.serviceContract.response_time_type,
        // resolution_time_type: SCData?.serviceContract.resolution_time_type,
        // technician_id: SCData?.serviceContract.technician_id
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
            values.id = ROID;
            values.tenant_id = tenantID;
            const res = await axios.put(`${url}/api/service/update-sc`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success(res.data.message);
                getROData();
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
        getROData()

    }, []);

    return (
        <>
            <Layout />
            <div className={'title ml-2'}>Repair Order {ROData?.repairOrder.id}</div>
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
                                    <div className="bg-gray-100">{ROData?.repairOrder.customer?.id}</div>
                                    <div className="text-right">Customer Name</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.customer?.company_name}</div>
                                    <div className="text-right">Customer Contact</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.customer?.first_name} {ROData?.customer?.last_name}</div>
                                    <div className="text-right">Contact Phone</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.customer?.contact_phone}</div>
                                    <div className="text-right">Main Phone</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.customer?.phone_1}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="grid grid-cols-2 gap-2 mt-4 mb-7">
                                    <div className="text-right">Equipment Card No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.id}</div>
                                    <div className="text-right">Item Name</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.inventory_item.item_name}</div>
                                    <div className="text-right">Manufacturer Serial No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.mfr_serial}</div>
                                    <div className="text-right">Serial No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.serial_no}</div>
                                    <div className="text-right">SKU</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.inventory_item.manuf_sku}</div>
                                </div>
                            </Col>
                        </Row>
                        <hr/>
                        <Row gutter={20}>
                            <Col span={8} xs={240} s={24} lg={8}>
                                <div className={'field-short'}>
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Status
                                    </label>
                                    <Field
                                        as="select"
                                        id='status'
                                        name="status"
                                        className="ro-status block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option  value='open'>
                                            Open
                                        </option>
                                        <option value='on hold'>
                                            On Hold
                                        </option>
                                        <option  value='closed'>
                                            Closed
                                        </option>

                                    </Field>
                                    <ErrorMessage name="country" component="div" className="text-red-600" />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={20} className={'mt-2'}>
                            <Col span={8} xs={240} s={24} lg={8} className={''}>
                                <div>
                                    <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Description</label>
                                    <Field type="text" placeholder='Description' name="description" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                    <ErrorMessage name="name" component="div" />
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Contract No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.equipment_card.id}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Contract Expiration</div>
                                    <div className="bg-gray-100">g</div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Order Created On</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.createdAt}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Order Closed On</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.closed_on}.</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Last Updated On</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder.updatedAt}</div>
                                </div>
                            </Col>
                        </Row>
                      <Row  gutter={20} className={'eq'}>

                        </Row>


                        <Tabs className={'mt-3 ro-tabs'}>
                            <Tabs.TabPane tab="General" key={0}>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8} className={''}>
                                <div className="form-group field-medium">
                                    <label htmlFor="selectedProblemType">Problem Type</label>
                                    <Field
                                        as="select"
                                        name="selectedProblemType"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select a Problem</option>
                                        {problemTypes.map((problemType) => (
                                            <option key={problemType.id} value={problemType.name}>
                                                {problemType.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="selectedProblemType" component="div" className="text-danger" />
                                </div>
                                    </Col>
                                </Row>
                                <Col span={8} xs={240} s={24} lg={8} className={''}>
                                    <div className={'field-short'}>
                                        <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Technician No.</label>
                                        <Field type="text" placeholder='Technician No.' name="technician_id" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="name" component="div" />
                                    </div>
                                </Col>


                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Contact Info" key={1}>
                                <div className={'definitions'}>
                                    <Row gutter={20} className={''}>
                                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Contact Name</label>
                                                <Field type="text" placeholder='Contact Name' name="description" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20} className={''}>
                                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Phone Number</label>
                                                <Field type="text" placeholder='Phone Number' name="phone_1" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Mobile Phone</label>
                                                <Field type="text" placeholder='Mobile Phone' name="mpbile_phone" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={20} className={''}>
                                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                                                <Field type="text" placeholder='Email Address' name="email" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tabs.TabPane>
                         <Tabs.TabPane tab="Repair Details" key={2}>
                             <div>
                                 <Field
                                     as="textarea" // Use "textarea" as the input type
                                     id="remarks"
                                     name="repair_description"
                                     rows="10" // Adjust the number of rows as needed
                                     cols="150" // Adjust the number of columns as needed
                                 />
                             </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Items" key={3} className={''}>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Activites" key={4}>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Resolution Details" key={5}>
                                <div>
                                    <Field
                                        as="textarea" // Use "textarea" as the input type
                                        id="remarks"
                                        name="resolution_description"
                                        rows="10" // Adjust the number of rows as needed
                                        cols="150" // Adjust the number of columns as needed
                                    />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Totals" key={7}>
                                <Row className={'lower'}>
                                    <Col>
                                        <div className="grid grid-cols-2 gap-2 mt-4 mb-7">
                                            <div className="text-right">Subtotal</div>
                                            <div className="bg-gray-100">${ROData?.repairOrder.customer?.id}</div>
                                            <div className="text-right">Sales Tax</div>
                                            <div className="bg-gray-100">${ROData?.repairOrder.customer?.company_name}</div>
                                            <div className="text-right">Total</div>
                                            <div className="bg-gray-100">${ROData?.repairOrder.customer?.first_name} {ROData?.customer?.last_name}</div>

                                        </div>
                                    </Col>

                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Attachments" key={8}>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                        </Tabs>

                    </Form>
                </Formik>


            </div>
        </>
    )
}
