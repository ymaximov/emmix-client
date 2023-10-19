// import {Layout} from '../../pages/layout/Layout'
// import React, {useEffect, useState} from "react";
// import {Row, Col} from 'antd'
// import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
// import axios from "axios";
// import {url} from "../../connections/toServer";
// import {useDispatch} from "react-redux";
// import {useNavigate} from "react-router-dom";
// import {SearchCustomerSQ} from "../../modals/sales/SearchCustomerSQ";
// import DatePicker from "react-datepicker";
// import toast from "react-hot-toast";
// import {setSqID} from "../../redux/slices/salesSlice";
//
// export const CreateSalesQuotation = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const token = JSON.parse(localStorage.getItem('token')).access_token;
//     const salesRep = JSON.parse(localStorage.getItem('token'))
//     const userID = salesRep.user_id
//     const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
//     const [customers, setCustomers] = useState()
//     const [selectedCustomer, setSelectedCustomer] = useState()
//     console.log(selectedCustomer, 'selected cust')
//     const [showSearchCustomerModal, setShowSearchCustomerModal] = useState(false)
//     const [dueDate, setDueDate] = useState(new Date());
//     const [postingDate, setPostingDate] = useState(new Date());
//     const taxRate = 17
//     const handleDueDateChange = (date, dateString) => {
//         setDueDate(date);
//         // dispatch(setDueDate(dueDate))
//     };
//     const handlePostingDateChange = (date, dateString) => {
//         setPostingDate(date);
//         // dispatch(setDueDate(dueDate))
//     };
//     const [reference, setReference] = useState('');
//
//     const handleChange = (e) => {
//         setReference(e.target.value);
//     };
//
//     const handleSubmit = async () => {
//         const dataToPost = {
//             tenant_id: tenantId,
//             customer_id: selectedCustomer?.id,
//             posting_date: postingDate,
//             due_date: dueDate,
//             user_id: userID,
//             reference,
//             tax_rate: taxRate,
//             sales_tax: 0,
//             subtotal: 0,
//             total_amount: 0
//
//         }
//
//         try {
//             dispatch(showLoading())
//             const res = await axios.post(`${url}/api/sales/create-sales-quotation`, dataToPost,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//
//                     }
//                 });
//
//             if (res.status === 200) {
//                 dispatch(hideLoading())
//                 dispatch(setSqID(res.data.data))
//                 toast.success(res.data.message);
//                 console.log('SQ ID', res.data.data)
//                 navigate('/sales/salesquotation')
//
//             } else {
//                 dispatch(hideLoading())
//                 toast.error(res.response.data.error)
//                 console.error('Please fill out all required data');
//             }
//         } catch (error) {
//             dispatch(hideLoading())
//             toast.error('Please fill out all required fields')
//             // Handle any other errors that occurred during the submission process
//             console.error('An error occurred:', error);
//         }
//     };
//     const getCustomersData = async () => {
//         try {
//             dispatch(showLoading());
//             const res = await axios.get(`${url}/api/crm/get-all-customers-by-tenant-id/${tenantId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log(res, 'response')
//             dispatch(hideLoading());
//             if (res.status === 200) {
//                 console.log(res)
//                 setCustomers(res.data.data)
//             }
//         } catch (error) {
//             dispatch(hideLoading());
//             console.log(error)
//         }
//     };
//
//     useEffect(() => {
//         getCustomersData()
//     }, []);
//     return (
//         <>
//             <Layout />
//             <div className="layout">
//                 {showSearchCustomerModal && <SearchCustomerSQ setSelectedCustomer={setSelectedCustomer} customers={customers} showModal={setShowSearchCustomerModal}/>}
//                 <h1 className={'mb-3 title'}>Create Sales Quotation</h1>
//                 <div className={'font-bold mb-2'}>Step 1/2: Define sales quotation details</div>
//                 <button
//                     onClick={() => setShowSearchCustomerModal(true)}
//                     type="button"
//                     className="mt-2 mb-1 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                     + Customer
//                 </button>
//                 <Row gutter={20} className='mt-5 mb-4'>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div className='vendor-details-title'>Customer Name</div>
//                         <div>{selectedCustomer?.company_name}</div>
//                         <div className='vendor-details-title'>Contact Name</div>
//                         <div>{selectedCustomer?.first_name} {selectedCustomer?.last_name}</div>
//                     </Col>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div className='vendor-details-title'>Contact Email</div>
//                         <div>{selectedCustomer?.email}</div>
//                         <div className='vendor-details-title'>Contact Phone</div>
//                         <div>{selectedCustomer?.contact_phone}</div>
//                     </Col>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div className='vendor-details-title'>Payment Terms</div>
//                         <div>{selectedCustomer?.payment_terms}</div>
//                         <div className='vendor-details-title'>Tax/VAT ID</div>
//                         <div>{selectedCustomer?.tax_id}</div>
//                     </Col>
//                 </Row>
//                 <hr className={'mt-4 mb-4'}/>
//                 <Row gutter={16}>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div>
//                             <label htmlFor="posting_date" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Posting Date
//                             </label>
//                             <DatePicker
//                                 id="posting_date"
//                                 selected={postingDate}
//                                 onChange={handlePostingDateChange}
//                                 dateFormat="yyyy-MM-dd" // Adjust the date format as needed
//                                 className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </Col>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div>
//                             <label htmlFor="order_date" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Due Date
//                             </label>
//                             <DatePicker
//                                 id="due_date"
//                                 selected={dueDate}
//                                 onChange={handleDueDateChange}
//                                 dateFormat="yyyy-MM-dd" // Adjust the date format as needed
//                                 className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </Col>
//                 </Row>
//                 <hr className={'mt-4 mb-4'}/>
//                 <Row gutter={16}>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div>
//                             <div>
//                                 <label htmlFor="remarks" className='block text-sm font-medium leading-6 text-gray-900'>
//                                     Reference
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder='Remarks'
//                                     id="remarks"
//                                     value={reference}
//                                     onChange={handleChange}
//                                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                                     style={{ width: `15rem` }}
//                                 />
//
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//                 <hr className={'mt-4 mb-4'}/>
//                 <Row gutter={16}>
//                     <Col span={8} xs={240} s={24} lg={8}>
//                         <div className='vendor-details-title'>Sales Representative</div>
//                         <div>{salesRep?.first_name} {salesRep?.last_name}</div>
//                         <div className='vendor-details-title'>Contact Information</div>
//                         <div>{salesRep?.email} | {salesRep?.phone}</div>
//                     </Col>
//                 </Row>
//                 <div className={'mt-3'}>
//                     <button
//                         type="button"
//                         className="mt-4 mb-3 ml-2 rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         onClick={handleSubmit}
//                     >
//                         Execute
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }
