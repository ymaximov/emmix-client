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

export const POVoidWarning = ({voidPO, showModal}) => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const user = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClose = () => {
        voidPO()
        showModal(false)
    }




    return (
        <>
            <div className={'po-modal-warning'}>
                <div className={'gr-form-content-warning'}>
                    <i className="ri-close-circle-line" onClick={() => showModal(false)}></i>
                    <div>Are you sure you want to void this purchase order? This action is irreversable</div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={handleClose}
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
