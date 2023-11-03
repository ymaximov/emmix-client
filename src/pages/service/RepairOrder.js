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
import {NewROActivity} from "../../modals/service/NewROActivity";
import {setPoId} from "../../redux/slices/purchaseOrderSlice";
import {ShowROActivity} from "../../modals/service/ShowROActivity";

export const RepairOrder = () => {

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const ROID = useSelector((state) => state.service).roID
    console.log(ROID, 'RO IDDDD')
    const dispatch = useDispatch()
    const [ROData, setROData] = useState()
    const [problemTypes, setProblemTypes] = useState([])
    const contractData = ROData?.contractData == null ? 'NOT IN CONTRACT' : ROData?.contractData?.id
    const contractEndData = ROData?.contractData == null ? 'NOT IN CONTRACT' : ROData?.contractData?.end_dat
    const closedOn =  ROData?.repairOrder?.closed_on == null ? '...' :ROData?.repairOrder.closed_on
    const closedBy =  ROData?.repairOrder?.closed_by == null ? '...' :ROData?.repairOrder.closed_by
    const [showNewActivityModal, setShowNewActivityModal] = useState(false)
    const [showShowActivityModal, setShowShowActivityModal] = useState(false)
    const [showAddMaterialsModal, setShowAddMaterialsModal] = useState(false)
    const [activityDescription, setActivityDescription] = useState('')
    const [technician, setTechnician] = useState('')
    const [meetingLocation, setMeetingLocation] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [remarks, setRemarks] = useState()
    const [activityID, setActivityID] = useState()


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

    const activitiesColumns = [
        {
            headerName: "Tech First Name",
            field: "user.first_name",
        },
        {
            headerName: "Tech Last Name",
            field: "user.last_name",
        },
        {
        headerName: "Activity Type",
            field: "meeting_location",
    },
        {
            headerName: `Subject`,
            field: "description",
        },
        {
            headerName: `Duration (Hrs)`,
            field: "duration",
        },
        {
            headerName: `Status`,
            field: "status",
        },
    ];

    const handleWOCellClicked = (event) => {
        console.log(event, 'EVENT');

    }
    const handleActivityCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        setActivityDescription(params.data.description)
        setTechnician(params.data.user.first_name + ' ' + params.data.user.last_name)
        setMeetingLocation(params.data.meeting_location)
        setStartDate(params.data.start_date)
        setStartTime(params.data.start_time)
        setEndTime(params.data.end_time)
        setEndDate(params.data.end_date)
        setRemarks(params.data.remarks)
        setActivityID(params.data.id)
        setShowShowActivityModal(true)
    };


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
        contact_person: ROData?.repairOrder.contact_person,
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
            const res = await axios.put(`${url}/api/service/update-ro`, values, {
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
                {showNewActivityModal && <NewROActivity showModal={setShowNewActivityModal} getROData={getROData} ROID={ROID}/>}
                {showShowActivityModal && <ShowROActivity id={activityID} meeting={meetingLocation} startTime={startTime} startDate={startDate} endTime={endTime} endDate={endDate} remarks={remarks} description={activityDescription} technician={technician} showModal={setShowShowActivityModal} getROData={getROData} ROID={ROID}/>}
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
                                    <div className="bg-gray-100">{ROData?.repairOrder?.equipment_card.id}</div>
                                    <div className="text-right">Item Name</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder?.equipment_card?.inventory_item?.item_name}</div>
                                    <div className="text-right">Manufacturer Serial No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder?.equipment_card?.mfr_serial}</div>
                                    <div className="text-right">Serial No.</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder?.equipment_card?.serial_no}</div>
                                    <div className="text-right">SKU</div>
                                    <div className="bg-gray-100">{ROData?.repairOrder?.equipment_card?.inventory_item?.manuf_sku}</div>
                                </div>
                            </Col>
                        </Row>
                        <hr className={'mb-2'}/>
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
                                <div className={'ro-description'}>
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
                                    <div className="bg-gray-100">{contractData}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Contract Expiration</div>
                                    <div className="bg-gray-100">.{contractEndData}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Repair Contract Created By</div>
                                    <div className="bg-gray-100">{ROData?.contractData?.user?.id} {ROData?.contractData?.user?.first_name} {ROData?.contractData?.user?.last_name}</div>
                                </div>
                            </Col>
                            <Col>
                                <div className="gap-2 mt-3">
                                    <div className="">Service Type</div>
                                    <div className="bg-gray-100">Warranty</div>
                                </div>
                            </Col>
                        </Row>


                      <Row  gutter={20} className={'eq'}>

                        </Row>

                        <div className={'tabs-ro'}>
                        <Tabs className={'mt-3 ro-tabs p-3'}>
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
                            <Tabs.TabPane tab='Status' key={1}>
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
                                            <div className="bg-gray-100">{closedOn}.</div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="gap-2 mt-3">
                                            <div className="">Last Updated On</div>
                                            <div className="bg-gray-100">{closedBy}</div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col>
                                        <div className="gap-2 mt-3">
                                            <div className="">Repair Order Created By</div>
                                            <div className="bg-gray-100">{ROData?.repairOrder.user_id}</div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="gap-2 mt-3">
                                            <div className="">Repair Order Closed By</div>
                                            <div className="bg-gray-100">{ROData?.repairOrder.user_id}</div>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="gap-2 mt-3">
                                            <div className="">Last Activity Created By</div>
                                            <div className="bg-gray-100">{ROData?.repairOrder.user_id}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Contact Info" key={2}>
                                <div className={'definitions'}>
                                    <Row gutter={20} className={''}>
                                        <Col span={8} xs={240} s={24} lg={8} className={''}>
                                            <div>
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Contact Name</label>
                                                <Field type="text" placeholder='Contact Name' name="contact_person" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
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
                         <Tabs.TabPane tab="Repair Description" key={3}>
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
                            <Tabs.TabPane tab="Materials" key={4} className={''}>
                                <i className="ri-add-line" onClick={() => setShowAddMaterialsModal(true)}></i>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={'SQData?.sales_quotation_items'} columnDefs={woColumns} onCellClicked={handleWOCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Activites" key={5}>
                                <i className="ri-add-line" onClick={() => setShowShowActivityModal(true)}></i>
                                <div className=''>
                                    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                                        <AgGridReact rowData={ROData?.repairOrder?.repair_order_activities} columnDefs={activitiesColumns} onCellClicked={handleActivityCellClicked}/>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Resolution Description" key={6}>
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
                        </div>
                    </Form>
                </Formik>


            </div>
        </>
    )
}
