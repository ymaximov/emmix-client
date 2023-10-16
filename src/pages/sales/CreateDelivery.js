import {Layout} from '../layout/Layout';
import './sales.css'
import {Form, Input, Select, Button, Row, Col} from "antd";
import React, {useEffect, useState} from "react";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {setSOID} from "../../redux/slices/salesSlice";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setGRDetails, setWarehouse} from "../../redux/slices/purchaseOrderSlice";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {setDeliveryID} from "../../redux/slices/salesSlice";

export const CreateDelivery = () => {
    const { Option } = Select;
    const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)
    const [customers, setCustomers] = useState()
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [inventory, setInventory] = useState()
    const [selectedWarehouse, setSelectedWarehouse] = useState()
    const [warehouses, setWarehouses] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const salesTax = 17
    const [soNo, setSoNo] = useState()
    const [form] = Form.useForm();

    const handleInputChange = (event) => {
        setSoNo(event.target.value); // Update the state variable when the input changes
    };

    const handleWarehouseChange = (e) => {
        setSelectedWarehouse(e.target.value);
    };
    const validationSchema = Yup.object().shape({
        soNo: Yup.string().required('SO No. is required'),
        warehouse: Yup.string().required('Warehouse is required'),
    });

    const getWarehouses = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/inventory/get-warehouses/${tenantId}`, {
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
    const initialValues = {
        so_no: null,
        warehouse: null,
    };

    const handleFormSubmit = async (values) => {
        const requestData = {
            tenant_id: tenantId,
            so_id: Number(values.so_id),
            wh_id: values.warehouse,
            picker_id: userID
        };
        console.log(requestData);

        try {
            dispatch(showLoading());
            const res = await axios.post(`${url}/api/inventory/create-delivery`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                dispatch(hideLoading());
                const data = res.data;
                console.log('Created Delivery', data);
                dispatch(setDeliveryID(data.delivery.id))
               navigate('/inventory/delivery')
            } else {
                dispatch(hideLoading());
                console.error('Error creating delivery', res.response.data.message);
                toast.error(res.response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error('An error occurred:', error);
            toast.error("No Released Sales Order Found");
        }
    }
    useEffect(() => {
        getWarehouses()
    }, []);
    return (

        <>
            <Layout/>
            <h1 className={'title ml-2'}>Delivery Note</h1>
            <div className="layout">
                <Form form={form} onFinish={handleFormSubmit}>
                    <button
                  className={'ri-checkbox-fill'}
                        htmlType="submit"
                    >
                    </button>
                    <Row>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <div className="flex">
                                <div>
                                    <Form.Item
                                        label="SO No."
                                        name="so_id"
                                        rules={[{ required: true, message: 'SO No. is required' }]}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="SO No."
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900   placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                        </Col>
                        <Col span={8} xs={240} s={24} lg={8}>
                            <Form.Item
                                label="Warehouse"
                                name="warehouse"
                                rules={[{ required: true, message: 'Warehouse is required' }]}
                            >
                                <Select
                                    placeholder="Please Select a Warehouse"
                                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {warehouses?.map(warehouse => (
                                        <Option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.warehouse_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}
