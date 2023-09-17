import {Layout} from '../layout/Layout'
import './sales.css'
import {clearVendor} from "../../redux/slices/vendorSlice";
import {
    clearDueDate,
    clearOrder,
    clearPrice, clearQuantity,
    clearSelectedItem,
    clearWarehouse
} from "../../redux/slices/purchaseOrderSlice";
import React from "react";
import {useNavigate} from "react-router-dom";

export const Sales = () => {
    const navigate = useNavigate()
    return (
        <>
            <Layout />
            <div className="layout">
                <div className='actions'>
                    <i className="ri-file-add-line add-po mr-2" onClick={()=> navigate('/sales/createsq')}></i>
                    <i className="ri-search-line"></i>
                    <i className="ri-download-line"></i>
                </div>
                <hr className={'mt-3'} cla/>
            </div>
        </>
    )
}
