import {Layout} from "../layout/Layout";
import React from "react";
import './purchasing.css'
import {useNavigate} from "react-router-dom";

export const Purchasing = () => {
    const navigate = useNavigate()
    return (
        <>
        <Layout />
            <div className="layout">
                <div className='actions'>
                    <i className="ri-file-add-line add-po" onClick={() => navigate('/purchasing/createpo')}></i>
                    <i className="ri-search-line ml-1" onClick={''}></i>
                </div>
            </div>
        </>
    )
}
