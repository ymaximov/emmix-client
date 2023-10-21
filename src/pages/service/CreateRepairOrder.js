import {Layout} from '../layout/Layout'
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {url} from "../../connections/toServer";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {SearchCustomerRO} from "../../modals/service/SearchCustomerRO";
import {setRoID} from "../../redux/slices/serviceSlice";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export const CreateRepairOrder = () => {
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [customers, setCustomers] = useState()
    const [selectedCustomer, setSelectedCustomer] = useState()
    const [showModal, setShowModal] = useState(false)
    const [equipment, setEquipment] = useState('');

    // Create a function to handle changes in the input field
    const handleInputChange = (e) => {
        setEquipment(e.target.value);
    };
    const getCustomersData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/crm/get-all-customers-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setCustomers(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    const handleSubmit = async () => {
        const dataToPost = {
            tenant_id: tenantId,
            customer_id: selectedCustomer?.id,
            user_id: userID,
            equipment_id: equipment,
        }

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/service/create-repair-order`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                dispatch(setRoID(res.data.data))
                // toast.success(res.data.message);
                console.log('RO ID', res.data.data)
                navigate('/service/repairorder')

            } else {
                dispatch(hideLoading())
                toast.error(res.data.error)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Error creating repair order')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        getCustomersData()
    }, []);
    return (
        <>
            <Layout/>
            <h1 className={'title ml-2'}>Create Repair Order</h1>
            {showModal && <SearchCustomerRO showModal={setShowModal} customers={customers} setSelectedCustomer={setSelectedCustomer}/>}
            <div className="layout">
                <i className="ri-checkbox-fill mb-1" onClick={handleSubmit}/>
                <div className={'container'} >
                    <div>
                        <div className="grid grid-cols-2 gap-2" onClick={() => setShowModal(true)}>
                            <div className="text-right">Customer No.</div>
                            <div className="bg-gray-100">{selectedCustomer?.id}</div>
                            <div className="text-right">Customer Name</div>
                            <div className="bg-gray-100">{selectedCustomer?.company_name}</div>
                            <div className="text-right">Customer Contact</div>
                            <div className="bg-gray-100">{selectedCustomer?.first_name} {selectedCustomer?.last_name}</div>
                            <div className="text-right">Payment Terms</div>
                            <div className="bg-gray-100">{selectedCustomer?.payment_terms}</div>


                        </div>

                    </div>
                    <div>
                        <input
                            type="text"
                            value={equipment}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Equipment No."
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

