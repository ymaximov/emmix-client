import '../../pages/purchasing/purchasing.css'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {showLoading, hideLoading} from "../../redux/slices/alertsSlice";
import {setGRDetails, setPoId, updatePriceAndQuantity} from "../../redux/slices/purchaseOrderSlice";
import axios from "axios";
import toast from "react-hot-toast";
import {hi} from "date-fns/locale";
import {url} from '../../connections/toServer'

export const DeliveredQuantity = ({setShowModal, selectedItem, itemID, fetchDeliveryData}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const user = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const goodsReceiptData = useSelector((state) => state.purchaseOrder).GR.goodsReceipt
    const poID = goodsReceiptData.po_id
    const itemId = goodsReceiptData.items.id
    console.log(goodsReceiptData, 'GR DAATA')
    const deliveryID = useSelector((state) => state.sales).deliveryID

    const handleClose = () => {
        setShowModal(false)
    }

    const initialValues = {
        received_quantity: null
    };

    const getDeliveryData = async() => {

    }

    const handleSubmit = async (values) => {
        try {
            dispatch(showLoading())
            // Replace 'http://localhost:3000' with the actual URL of your backend endpoint
            const URL = `${url}/api/inventory/update-delivered-qty`;

            // Create the request body
            const requestBody = {
                tenant_id: tenantId,
                item_id: itemID,
                delivered_qty: values.delivered_quantity
            };
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.put(URL, requestBody, {headers});

            if (res.status === 200) {
                dispatch(hideLoading())

                setShowModal(false)
                fetchDeliveryData(deliveryID)
                toast.success(res.data.message);

            } else {
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
                dispatch(hideLoading())
            }
        } catch (err) {
            console.error(err);
            dispatch(hideLoading())
        }
    };



    return (
        <>
            <div className={'po-modal'}>
                <div className={'gr-form-content'}>


                    {/*<div>{itemName}</div>*/}
                    {/*<div className={'mt-3'}>{selectedItem.selectedItemName}</div>*/}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className={'mt-1'}>
                            <div className={'flex'}>
                                <button
                                className={'ri-checkbox-fill  mt-0.5'}
                                htmlType="submit"
                            >
                            </button>
                                <i className="ri-close-circle-line ml-1" onClick={handleClose}></i>

                            </div>

                            <h1 className={'mb-2 mt-2'}>{selectedItem.inventoryItem.item_name} {itemID}</h1>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <h1 className={'mb-2 rq'}>Quantity To Deliver</h1>

                                    <div>
                                        <Field type="text" placeholder='Qty To Deliver' name="delivered_quantity" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
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
