import '../../pages/purchasing/purchasing.css'
import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {setPoId, updatePriceAndQuantity} from "../../redux/slices/purchaseOrderSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {url} from '../../connections/toServer'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import '../../pages/sales/sales.css'

export const UpdateLineItemSO = ({showModal, quantity, price, itemID, getSOData, item, WH}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const dispatch = useDispatch()
    const [warehouses, setWarehouses] = useState()

    const handleClose = () => {
        showModal(false)
    }

    const initialValues = {
        price,
        quantity,
        warehouse: WH

    };


    // Define form submission function
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        const dataToPost = {
            item_id: itemID,
            // inv_item_id: invItemNo,
            unit_price: values.price,
            quantity: values.quantity,
            wh_id: values.warehouse,
            tenant_id: tenantId
        }
        try {
            const res = await axios.put(`${url}/api/sales/update-item-so`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                getSOData()
                handleClose()
            } else {
                // toast.error(res.response.data.error)
                // console.error('Please fill out all required data');
            }
        } catch (error) {
            toast.error('Please fill out all required fields')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };

    const deleteLineItem = async () => {

        try {
            const res = await axios.delete(`${url}/api/sales/delete-item-so`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    item_id: itemID,
                    tenant_id: tenantId,
                },
            });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                getSOData()
                handleClose();
            } else {
                // Handle error response here
                // toast.error(res.response.data.error);
                // console.error('An error occurred');
            }
        } catch (error) {
            toast.error('Please fill out all required fields');
            // Handle any other errors that occurred during the deletion process
            console.error('An error occurred:', error);
        }
    };
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

    useEffect(() => {
        getWarehouses()
    }, []);



    return (
        <>
            <div className={'po-modal'}>
                <div className={'po-form-content'}>
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    {/*<div>{itemName}</div>*/}
                    {/*<div className={'mt-3'}>{selectedItem.selectedItemName}</div>*/}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className={'mt-1'}>
                            <div className={'flex'}>
                                <button className="ri-checkbox-fill mb-1 mr-1"
                                        type="submit"
                                ></button>
                                <i className="ri-delete-bin-5-fill" onClick={deleteLineItem}></i>
                            </div>

                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="price" className='block text-sm font-medium leading-6 text-gray-900'>Price</label>
                                        <Field type="text" placeholder='Price' name="price" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="price" component="div" />
                                    </div>
                                </Col>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <div>
                                        <label htmlFor="quantity" className='block text-sm font-medium leading-6 text-gray-900'>Quantity</label>
                                        <Field type="text" placeholder='Quantity' name="quantity" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
                                </Col>
                                <Col span={8} xs={24} lg={8}>
                                    {item.inventory_item.inventory_item && (
                                        <div>
                                            <label htmlFor="warehouse" className="block text-sm font-medium leading-6 text-gray-900">
                                                Warehouse
                                            </label>
                                            <Field
                                                as="select"
                                                id="warehouse"
                                                name="warehouse"
                                                required={item.inventory_item} // Make it required conditionally
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
                            <div className="d-flex justify-content-end">

                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
