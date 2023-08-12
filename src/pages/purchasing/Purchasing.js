import {Layout} from "../layout/Layout";
import React from "react";
import './purchasing.css'
import {useNavigate} from "react-router-dom";
import {clearVendor} from "../../redux/slices/vendorSlice";
import {useDispatch} from "react-redux";
import {clearOrder} from "../../redux/slices/purchaseOrderSlice";

export const Purchasing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
        <Layout />
            <div className="layout">
                <div className='actions'>
                    <i className="ri-file-add-line add-po" onClick={() => {
                        dispatch(clearVendor())
                        dispatch(clearOrder())
                        navigate('/purchasing/createpo')}
                    }></i>
                    <i className="ri-search-line ml-1" onClick={''}></i>
                </div>
            </div>
        </>
    )
}
