import React, { useState } from 'react';
import axios from 'axios';
import {Layout} from '../layout/Layout'
import {Row, Col} from 'antd'
import toast from 'react-hot-toast'
import {showLoading, hideLoading} from "../../redux/slices/alertsSlice";
import {useSelector, useDispatch} from "react-redux";
import {setAPInvDetails, setGRDetails} from "../../redux/slices/purchaseOrderSlice";
import {useNavigate} from "react-router-dom";
import {url} from "../../connections/toServer";

export const GoodsReceipt = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token;
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id;
    const userId = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [poNo, setPoNo] = useState(''); // State variable to store the PO No.

    const getPurchaseOrderDataAndItems = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const requestData = {
            tenant_id: tenantId,
            poNo: poNo,
            receiver_id:userId
        };

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/purchasing/get-po-data-for-gr`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                dispatch(hideLoading())
                const data = res.data.data;
                console.log('Purchase Order Data and Items:', data);
                dispatch(setGRDetails(data))
                navigate('/purchasing/goodsreceipt/receiving')
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

    const handleInputChange = (event) => {
        setPoNo(event.target.value); // Update the state variable when the input changes
    };

    return (
        <>
            <Layout />
            <div className="layout">
                <h1>Goods Receipt PO</h1>
                <i className="ri-search-line ml-1" onClick={''}></i>
                <form onSubmit={getPurchaseOrderDataAndItems}> {/* Use a regular form with POST request */}
                    <Row>
                        <Col>
                            <div className={'flex'}>

                            <div>
                                <label htmlFor="po_no" className=' mt-2 block text-sm font-medium leading-6 text-gray-900'>PO No.</label>
                                <input
                                    type="text"
                                    placeholder='PO No.'
                                    name="po_no"
                                    className='blockw-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    value={poNo} // Bind the input value to the state variable
                                    onChange={handleInputChange} // Handle input changes
                                />
                            </div>
                                <button className="ri-checkbox-fill mt-7 ml-2"
                                        type="submit"
                                ></button>
                            </div>

                        </Col>
                    </Row>

                </form>
            </div>
        </>
    );
};
