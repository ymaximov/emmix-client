import {Layout} from '../layout/Layout'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {setItem} from "../../redux/slices/inventoryItemSlice";
import React, {useEffect, useState} from "react";
import {Row, Col, Tabs} from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {SearchVendorModal} from '../../modals/purchasing/SearchVendorModal'
import './purchasing.css'
// import {addItemToOrder, removeItemFromOrder, clearOrder} from '../../redux/slices/purchaseOrderSlice'
import {SearchItemModal} from "../../modals/purchasing/SearchItemModal";
import {useNavigate} from "react-router-dom";
import {AddItemModal} from "../../modals/purchasing/AddItemModal";
import {
    addItem,
    removeItem,
    setDueDate,
    setSelectedItem,
    setWarehouse,
    updatePriceAndQuantity,
    setPoId, setPoData
} from "../../redux/slices/purchaseOrderSlice";
import {selectedItemModal} from "../../modals/inventory/selectedItemDetails";
import {selectedItem} from '../../redux/slices/alertsSlice'
import {clearOrder} from "../../redux/slices/purchaseOrderSlice";
// import { Formik, Form, Field, ErrorMessage} from "formik";
import { setDefaultLocale } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import toast from "react-hot-toast";
import {SelectedItemModal} from "../../modals/purchasing/SelectedItemModal";
import {url} from "../../connections/toServer";
import './purchasing.css'

export const CreatePurchaseOrder = () => {
    const [showSearchVendorModal, setShowSearchVendorModal] = useState(false)
    const [showSearchItemModal, setShowSearchItemModal] = useState(false)
    const [showSelectedItemModal, setShowSelectedItemModal] = useState(false)
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [warehouses, setWarehouses] = useState()
    const [PO, setPO] = useState()
    const [vendors, setVendors] = useState([]);
    const dispatch = useDispatch()
    const purchaseOrder = useSelector(state => state.purchaseOrder)
    const [inventory, setInventory] = useState()
    const [dueDate, setDueDate] = useState(new Date());
    const navigate = useNavigate()
    const POID = useSelector((state) => state.purchaseOrder.po_id)
    console.log(POID, 'PO ID')
    const handleDueDateChange = (date, dateString) => {
        setDueDate(date);
        // dispatch(setDueDate(dueDate))
    };



    const token = JSON.parse(localStorage.getItem('token')).access_token
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const email = JSON.parse(localStorage.getItem('token')).email
    const firstName = JSON.parse(localStorage.getItem('token')).first_name
    const lastName = JSON.parse(localStorage.getItem('token')).last_name
    const phone = JSON.parse(localStorage.getItem('token')).phone
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const buyer = JSON.parse(localStorage.getItem('token'))
    const vendor = useSelector((state) => state.vendor).vendor
    const [poData, setPoData] = useState(null)
    const [items, setItems] = useState([])
    const handleWarehouseChange = (event) => {
        const value = parseInt(event.target.value);
        dispatch(setWarehouse(value))
    };

    console.log(warehouses, 'WAREHOUSES')

    const purchaseOrderItems = useSelector((state) => state.purchaseOrder).items
    console.log(vendor, 'VENDOR')
    const currency = '$'

    const getWarehouses = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/inventory/get-warehouses/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setWarehouses(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    // Calculate the total price using reduce()
    const salesTax = 17
    // const quantity = useSelector((state) => state.purchaseOrder.items[0]?.quantity)
    // console.log(quantity, "quantity")
    // const salesTaxRate = vendor.sales_tax == 'liable' ? salesTax : 0
    // const subTotal = items.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0);
    // const salesTaxAmount = (subTotal * salesTaxRate) / 100;
    // const grandTotal = subTotal + salesTaxAmount;
    // const formattedSubTotal = subTotal.toFixed(2);
    // const formattedSalesTaxAmount = salesTaxAmount.toFixed(2);
    // const formattedGrandTotal = grandTotal.toFixed(2);

    const handleAddToOrder = (item) => {
      dispatch(addItem(item))
    };

    const handleRemoveFromOrder = (itemId) => {
        dispatch(removeItem(itemId));
    };
    const getVendorsData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/vendor/get-all-vendors-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setVendors(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const activeVendors = vendors?.filter(vendor => vendor.status === 'active');
    console.log(activeVendors, 'ACTIVE VENDORTS')
    const [reference, setReference] = useState('');

    const handleChange = (e) => {
        setReference(e.target.value);
    };


    const removeRow = (rowId) => {
        // Dispatch an action to remove the item from Redux state
        dispatch(removeItem(rowId)); // You need to create the removeItem action
    };

    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Item No.",
            field: "inv_item_id",
        },
        {
            headerName: "Item Name",
            field: "inventory_item.item_name",
        },
        {
            headerName: "Quantity",
            field: "quantity",
        },
        {
            headerName: `Price Per Unit ${currency}`,
            field: "unit_price",
        },
    ];

    const onCellValueChanged = ({ data, colDef, newValue, rowIndex }) => {
        console.log(data, "data")
        if (colDef.field === 'price') {
            dispatch(updatePriceAndQuantity({ itemIndex: rowIndex, newPrice: newValue, newQuantity: data?.quantity }));
        } else if (colDef.field === 'quantity') {
            dispatch(updatePriceAndQuantity({ itemIndex: rowIndex, newPrice: data.price, newQuantity: newValue }));
        }
    };

    // const handleAddToOrder = (item) => {
    //     dispatch(addItemToOrder(item));
    // };
    //
    // const handleRemoveFromOrder = (itemId) => {
    //     dispatch(removeItemFromOrder(itemId));
    // };
    //
    // const handleClearOrder = () => {
    //     dispatch(clearOrder());
    // };

    const handleCellClicked = (event) => {
        const selectedRowData = event.data;

        // Find the index of the selected row data in the items array
        const selectedIndex = items.findIndex(item => item.id === selectedRowData.id);

        // Dispatch to setSelectedItem with both the selectedRowData and the index
        dispatch(setSelectedItem({ data: selectedRowData, index: selectedIndex }));
        setShowSelectedItemModal(true)

    }



    const getInventoryData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/inventory/get-inventory-by-tenant-id/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setInventory(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const activeInventory = inventory?.filter(inventory => inventory.status === 'active');
    const inventoryList = activeInventory?.filter(inventory => inventory.purchasing_item === true);

    const dataToPost = {
        tenant_id: tenantId,
        vendor_id: vendor.id,
        user_id: userID,
        warehouse_id: purchaseOrder.warehouse,
        due_date: dueDate,
        items: purchaseOrderItems,
        // subtotal: formattedSubTotal,
        // sales_tax: formattedSalesTaxAmount,
        // total_amount: formattedGrandTotal,
        reference,
        tax_rate: salesTax
    }

    const handleSubmit = async () => {

        try {
            dispatch(showLoading())
            const res = await axios.post(`${url}/api/purchasing/create-purchase-order`, dataToPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.status === 200) {
                dispatch(hideLoading())
                // Form data submitted successfully, handle success case here
                // toast.success(res.data.message);
                console.log('PO Data', res.data)
                // dispatch(setPoId(res.data.data))
                setPoData(res.data.data)
                dispatch(setPoId(res.data.data.createdPurchaseOrder.id))
                navigate('/purchasing/purchaseorder')
            } else {
                dispatch(hideLoading())
                toast.error(res.response.data.error)
                console.error('Please fill out all required data');
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error('Please fill out all required fields')
            // Handle any other errors that occurred during the submission process
            console.error('An error occurred:', error);
        }
    };

    console.log(dataToPost, 'DATATOPOST' )
    // console.log(poData.data.createdPurchaseOrder, 'PO DATAAA ORDER')

    // const getPOData = async () => {
    //     try {
    //         dispatch(showLoading());
    //         const res = await axios.get(`${url}/api/purchasing/get-po-by-id/${POID}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log(res, 'responseee')
    //         dispatch(hideLoading());
    //         if (res.status === 200) {
    //             console.log(res.data, 'RESSSSS')
    //             setPO((res.data.purchaseOrder))
    //             setItems(res.data.purchaseOrder)
    //
    //
    //         }
    //     } catch (error) {
    //         dispatch(hideLoading());
    //         console.log(error)
    //     }
    // };

    console.log(items, 'ITYEMS')

    console.log(PO?.subtotal, 'Sub')
    useEffect(() => {
        getVendorsData()
        getInventoryData()
        getWarehouses()
        // getPOData()

    }, []);


    return (
        <>
            <Layout />
            {showAddItemModal && <AddItemModal  warehouse={poData?.warehouse.id} inventory={inventoryList} tenantID={tenantId} POID={poData?.createdPurchaseOrder?.id} setShowSelectedItemModal={setShowSelectedItemModal} setShowAddItemModal={setShowAddItemModal}/>}
            <h1 className={'mb-1 mt-1 title ml-5'}>Purchase Order {poData?.createdPurchaseOrder?.id}</h1>
            <div className="layout">
                {poData !== null ? <div className={'flex'}>
                <button
                    type="submit"
                    className="mb-2 bg-slate-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Print
                </button>
                    <button
                        type="submit"
                        className="mb-2 ml-1 bg-slate-400 px-2.5 py-1.5 text-sm hover:bg-black  font-semibold text-white shadow-sm hover:bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Email
                    </button>
                    <button
                        type="submit"
                        className="mb-2 ml-1 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Void
                    </button>
                </div> : null }
                <i className="ri-checkbox-fill mb-1" onClick={handleSubmit}></i>

                {showSearchVendorModal && <SearchVendorModal setShowSearchVendorModal={setShowSearchVendorModal} vendors={activeVendors}/>}
                {showSearchItemModal && <SearchItemModal inventory={inventoryList} setShowSelectedItemModal={setShowSelectedItemModal} setShowSearchItemModal={setShowSearchItemModal} handleAddToOrder={handleAddToOrder}/>}
                {showSelectedItemModal && <SelectedItemModal setShowSelectedItemModal={setShowSelectedItemModal}/>}
                <div className={'container'}>
                    <div>
                        {poData == null && <i className="ri-user-search-line"   onClick={() => setShowSearchVendorModal(true)}></i>}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="mt-1 mb-2 rounded-md bg-slate-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}

                        {/*>*/}
                        {/*    + Vendor*/}
                        {/*</button>*/}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-right">Vendor No.</div>
                            <div className="bg-slate-50">{vendor?.id}</div>
                            <div className="text-right">Vendor Name</div>
                            <div className="bg-slate-50">{vendor?.company_name}</div>
                            <div className="text-right">Vendor Contact</div>
                            <div className="bg-slate-50">{vendor?.first_name} {vendor?.last_name}</div>
                            <div className="text-right">Payment Terms</div>
                            <div className="bg-slate-50">{vendor?.payment_terms}</div>

                        </div>

                    </div>
                    <div>
                        <Tabs>
                            <Tabs.TabPane tab="Ship To" key={0}>

                                {poData == null && <div>
                                    <label htmlFor="warehouse_id" className="block text-sm font-medium leading-6 text-gray-900">
                                        Ship-to Warehouse
                                    </label>
                                    <select
                                        id="warehouse_id"
                                        name="warehouse"
                                        value={purchaseOrder.warehouse}
                                        onChange={handleWarehouseChange}
                                        required // Add the required attribute
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value=''>Please Select an Option</option>
                                        {warehouses?.map((wh) => (
                                            <option key={wh.id} value={wh.id}>
                                                {wh.warehouse_name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Conditional rendering for error message */}
                                    {purchaseOrder.warehouse === '' && (
                                        <div className="text-red-500 text-sm mt-1">Warehouse is required</div>
                                    )}
                                </div>}
                                {poData !== null && <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="text-right">Warehouse</div>
                                    <div className="bg-slate-50">{poData?.warehouse?.warehouse_name}</div>
                                </div>}
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Dates" key={1}>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>

                {poData !== null && <hr className={'mt-3'}/>}
                    <div className={''}>
                        {poData !== null && <Tabs>
                        <Tabs.TabPane tab="Totals" key={0}>
                            <div className="grid grid2 grid-cols-2 gap-2">
                                <div className="text-right2">Subtotal</div>
                                <div className="bg-slate-50">${PO?.subtotal}</div>
                                <div className="text-right2">Sales Tax {PO?.tax_rate}%</div>
                                <div className="bg-slate-50">${PO?.sales_tax}</div>
                                <div className="text-right2">Total</div>
                                <div className="bg-slate-50">${PO?.total_amount}</div>

                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Logistics" key={1}>
                            <div className="grid grid-cols-2 gap-2">
gdgs
                            </div>
                        </Tabs.TabPane>   <Tabs.TabPane tab="Logistics" key={2}>
                        <div className="grid grid-cols-2 gap-2">
dgsg
                        </div>
                    </Tabs.TabPane>
                    </Tabs>}
                    </div>
                <hr className={'mt-3'}/>
                {poData !== null && <div className={'mt-3'}>
                    <i className="ri-add-line" onClick={() => setShowAddItemModal(true)}></i>
                    <div className=''>
                        <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>
                            <AgGridReact rowData={items?.purchase_order_items} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>
                        </div>
                    </div>
                </div>}

                {/*// <Row gutter={16}>*/}
                {/*//*/}
                {/*/!*    <Col span={8} xs={240} s={24} lg={8}>*!/*/}

                {/*//     </Col>*/}
                {/*//     <Col>*/}
                {/*//         <div>*/}
                {/*//             <label htmlFor="order_date" className="block text-sm font-medium leading-6 text-gray-900">*/}
                {/*//                 Due Date*/}
                {/*//             </label>*/}
                {/*//             <DatePicker*/}
                {/*//                 id="due_date"*/}
                {/*                selected={dueDate}*/}
                {/*                onChange={handleDueDateChange}*/}
                {/*                dateFormat="yyyy-MM-dd" // Adjust the date format as needed*/}
                {/*                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<hr className={'mt-6 mb-6'}/>*/}
                {/*<Row gutter={16}>*/}
                {/*        <Col span={8} xs={240} s={24} lg={8}>*/}
                {/*            <div>*/}
                {/*                <div>*/}
                {/*                    <label htmlFor="remarks" className='block text-sm font-medium leading-6 text-gray-900'>*/}
                {/*                        Reference*/}
                {/*                    </label>*/}
                {/*                    <input*/}
                {/*                        type="text"*/}
                {/*                        placeholder='Remarks'*/}
                {/*                        id="remarks"*/}
                {/*                        value={reference}*/}
                {/*                        onChange={handleChange}*/}
                {/*                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'*/}
                {/*                        style={{ width: `15rem` }}*/}
                {/*                    />*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*        <Col span={8} xs={240} s={24} lg={8}>*/}
                {/*            <div className='vendor-details-title'>Buyer</div>*/}
                {/*            <div>{buyer?.first_name} {buyer?.last_name}</div>*/}
                {/*            <div className='vendor-details-title'>Contact Information</div>*/}
                {/*            <div>{buyer?.email} | {buyer?.phone}</div>*/}
                {/*        </Col>*/}
                {/*</Row>*/}



                {/*<div className="d-flex justify-content-end">*/}
                {/*    <i className="ri-add-circle-line" onClick={() => setShowSearchItemModal(true)}></i>*/}
                
                {/*</div>*/}
                {/*<div className=''>*/}
                {/*    <div className="ag-theme-alpine" style={{ height: '15rem', width: '100%' }}>*/}
                {/*        <AgGridReact onCellValueChanged={onCellValueChanged} rowData={purchaseOrderItems} columnDefs={columnDefs} onCellClicked={handleCellClicked}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*// <div className="flex justify-between">*/}
                {/*//     <div className={'mt-0'}>*/}
                {/*//*/}
                {/*//         <button*/}
                {/*//             type="button"*/}
                {/*//             className="mt-4 mb-3 ml-2 rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                {/*//         onClick={handleSubmit}*/}
                {/*/!*        >*!/*/}
                {/*            Continue*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    /!*<div className="totals mt-2">*!/*/}
                {/*    /!*    <div>Subtotal: {currency}{formattedSubTotal}</div>*!/*/}
                {/*    /!*    <div>Sales Tax/VAT: {currency}{formattedSalesTaxAmount}</div>*!/*/}
                {/*    /!*    <div>Total: {currency}{formattedGrandTotal}</div>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}

            </div>
        </>
    )
}
