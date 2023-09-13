import '../../pages/purchasing/purchasing.css'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {setPoId, updatePriceAndQuantity} from "../../redux/slices/purchaseOrderSlice";
import axios from "axios";
import toast from "react-hot-toast";

export const UpdateLineItemModal = ({setShowUpdateLineItemModal, invItemNo, warehouse, getPOData, selectedPrice, selectedQuantity, itemName, itemKey}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const dispatch = useDispatch()
    console.log(itemKey, 'ITEM KEY')
    console.log(selectedPrice, selectedQuantity, 'SELECTED')
    const handleClose = () => {
        setShowUpdateLineItemModal(false)
    }

    const initialValues = {
        price: selectedPrice,
        quantity: selectedQuantity
    };


    // Define form submission function
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        const dataToPost = {
            item_id: itemKey,
            inv_item_id: invItemNo,
            unit_price: values.price,
            quantity: values.quantity,
            warehouse_id: warehouse,
            tenant_id: tenantId
        }
        try {
            const res = await axios.put("/api/purchasing/update-line-item", dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                getPOData()
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
        console.log(itemKey, 'ITEMKEY');

        try {
            const res = await axios.delete(`/api/purchasing/delete-line-item`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    inv_item_id: invItemNo,
                    warehouse_id: warehouse,
                    tenant_id: tenantId,
                    quantity: selectedQuantity,
                    itemId: itemKey
                },
            });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                getPOData();
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

    return (
        <>
            <div className={'po-modal'}>
                <div className={'po-form-content'}>
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <div>{itemName}</div>
                    {/*<div className={'mt-3'}>{selectedItem.selectedItemName}</div>*/}
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className={'mt-1'}>
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
                            </Row>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="mt-4 mb-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="mt-4 mb-3 ml-2 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={deleteLineItem}
                                >
                                    Delete Item
                                </button>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
