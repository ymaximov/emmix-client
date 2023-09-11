import '../../pages/purchasing/purchasing.css'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Row, Col} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {updatePriceAndQuantity} from "../../redux/slices/purchaseOrderSlice";

export const SelectedItemModal = ({setShowSelectedItemModal}) => {
    const selectedItem = useSelector((state) => state.purchaseOrder.selectedItem)
    const index = selectedItem.index
    console.log(index, 'INDEX')
    const dispatch = useDispatch()
    console.log(selectedItem, 'SEELCTEDITEM')
    const handleClose = () => {
        setShowSelectedItemModal(false)
    }

    const initialValues = {
        price: selectedItem?.data.price,
        quantity: selectedItem?.data.quantity
    };

    // Define form submission function
    const handleSubmit = (values) => {
        console.log('Form submitted with values:', values);
        const quantity = Number(values.quantity);
        const price = Number(values.price);
        dispatch(updatePriceAndQuantity({ index, quantity, price }))

    };

    return (
        <>
            <div className={'po-modal'}>
                <div className={'po-form-content'}>
                    <i className="ri-close-circle-line" onClick={handleClose}></i>
                    <div className={'mt-3'}>{selectedItem.selectedItemName}</div>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form className={'mt-2'}>
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
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
