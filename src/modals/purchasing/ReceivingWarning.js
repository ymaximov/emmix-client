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
import {url} from "../../connections/toServer";
import {useNavigate} from "react-router-dom";

export const ReceivingWarning = ({showModal, GRData}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const user = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goodsReceiptData = useSelector((state) => state.purchaseOrder).GR.goodsReceipt
    const poID = goodsReceiptData.po_id
    const itemId = goodsReceiptData.items.id
    console.log(goodsReceiptData, 'GR DAATA')

    const handleClose = () => {
    }

    const handleSubmit = async () => {
        const dataToPost = {
            warehouseId: goodsReceiptData.warehouse_id,
            goodsReceiptId: goodsReceiptData.id
        }

        try {
            const res = await axios.put(`${url}/api/inventory/update-inventory-gr`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                // Form data submitted successfully, handle success case here
                toast.success('Inventory Has Been Received');
                navigate('/purchasing')
            } else {
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
            }
        } catch (error) {
            toast.error('Please fill out all required fields')
            console.log(error, 'error')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };




    return (
        <>
            <div className={'po-modal-warning'}>
                <div className={'gr-form-content-warning'}>
                    <i className="ri-close-circle-line" onClick={() => showModal(false)}></i>
                    <div>The received quantities differ from the quantities reflected on the purchase order.
                    Please make sure to update the purchase order and notify the buyer of the discrepancy to avoid billing errors.</div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="mt-4 mb-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Continue & Execute
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}
