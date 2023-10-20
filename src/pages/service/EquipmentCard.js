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

export const EquipmentCard = () => {

    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantID = JSON.parse(localStorage.getItem('token')).tenant_id
    const ECID = useSelector((state) => state.service).ecID
    const dispatch = useDispatch()
    const [ECData, setECData] = useState()

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
                setECData(res.data.equipmentCard)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const initialValues = {
        // Define each form field and its initial value
        firstName: '',
        lastName: '',
        email: '',
        // Add more fields as needed
    };

    useEffect(() => {
        getECData()

    }, []);

    return (
        <>
            <Layout />
            <div className={'title ml-2'}>Equipment Card {ECData?.id}</div>
            <div className="layout">

                        <Formik
                            initialValues={initialValues}
                            onSubmit={''}
                        >
                            <Form layout="vertical">
                                <button className="ri-checkbox-fill mb-1"
                                        type="submit"
                                ></button>
                                <Row className={'upper'}>
                                    <Col>
                                        <div className="grid grid-cols-2 gap-2 mt-4 mb-7">
                                            <div className="text-right">Customer No.</div>
                                            <div className="bg-gray-100">{ECData?.customer?.id}</div>
                                            <div className="text-right">Customer Name</div>
                                            <div className="bg-gray-100">{ECData?.customer?.company_name}</div>
                                            <div className="text-right">Customer Contact</div>
                                            <div className="bg-gray-100">{ECData?.customer?.first_name} {ECData?.customer?.last_name}</div>
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
                                                <option key='1' value='active'>
                                                    Active
                                                </option>
                                                <option key='1' value='terminated'>
                                                    Terminated
                                                </option>
                                                <option key='1' value='loaned'>
                                                    Loaned
                                                </option>
                                                <option key='1' value='in repair lab'>
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
                                                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Manufacturer Serial No.</label>
                                                <Field type="text" placeholder='Manufacturer Serial No.' name="mfr_serial" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
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
                                                <Field type="text" placeholder='Item No..' name="serial_no" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                                <ErrorMessage name="name" component="div" />
                                            </div>
                                        </Col>
                                        <Col span={8} xs={240} s={24} lg={8}>
                                            <div className={'mt-8 ml-3'}>Samsung</div>
                                        </Col>
                                    </Row>
                                </div>
                                <Tabs className={'mt-3'}>
                                    <Tabs.TabPane tab="Address" key={0}>

                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Service Contracts" key={1}>

                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Work Orders" key={2}>

                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Sales Data" key={3}>

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
