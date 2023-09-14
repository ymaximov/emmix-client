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

export const ReceivingQuantity = ({setShowModal, selectedItem, itemID}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const user = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const goodsReceiptData = useSelector((state) => state.purchaseOrder).GR.goodsReceipt
    const poID = goodsReceiptData.po_id
    const itemId = goodsReceiptData.items.id
    console.log(goodsReceiptData, 'GR DAATA')

    const handleClose = () => {
        setShowModal(false)
    }

    const initialValues = {
        received_quantity: null
    };

    const getPurchaseOrderDataAndItems = async (event) => {

        const requestData = {
            tenant_id: tenantId,
            poNo: poID,
            receiver_id: user
        };

        try {
            dispatch(showLoading())
            const res = await axios.post(`/api/purchasing/get-po-data-for-gr`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                dispatch(hideLoading())
                const data = res.data.data;
                console.log('Purchase Order Data and Items:', data);
                dispatch(setGRDetails(data))
                // Handle the data as needed in your application
            } else {
                dispatch(hideLoading())
                console.error('Error fetching purchase order data and items');
                toast.error(res.response.data.messsage)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.error('An error occurred:', error);
            toast.error("No Open PO's Found")
        }
    };

    const handleSubmit = async (values) => {
        try {
            dispatch(showLoading())
            // Replace 'http://localhost:3000' with the actual URL of your backend endpoint
            const url = `/api/purchasing/receiving/update-rec-quantity/${itemID}`;

            // Create the request body
            const requestBody = {
                tenant_id: tenantId,
                received_quantity: values.received_quantity
            };
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const res = await axios.put(url, requestBody, {headers});

            if (res.status === 200) {
                dispatch(hideLoading())
                getPurchaseOrderDataAndItems()
                setShowModal(false)
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
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    {/*<div>{itemName}</div>*/}
                    {/*<div className={'mt-3'}>{selectedItem.selectedItemName}</div>*/}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className={'mt-1'}>
                            <h1 className={'mb-2'}>{selectedItem.inventory_item.item_name}</h1>
                            <Row gutter={20}>
                                <Col span={8} xs={240} s={24} lg={8}>
                                    <h1 className={'mb-2 rq'}>Received Quantity</h1>

                                    <div>
                                        <Field type="text" placeholder='Qty Received' name="received_quantity" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="mt-4 mb-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Set Quantity
                                </button>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
