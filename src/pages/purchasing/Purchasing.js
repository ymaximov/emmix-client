import {Layout} from "../layout/Layout";
import React, {useEffect, useState} from "react";
import './purchasing.css'
import {useNavigate} from "react-router-dom";
import {clearVendor, setVendor} from "../../redux/slices/vendorSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    clearOrder,
    clearSelectedItem,
    clearPrice,
    clearWarehouse,
    clearQuantity,
    clearDueDate,
    setPoId
} from "../../redux/slices/purchaseOrderSlice";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {SearchPO} from '../../modals/purchasing/SearchPO'
import {url} from '../../connections/toServer'
import CountUp from 'react-countup';
import { Col, Row, Statistic } from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;
const formatterMoney = (value) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
};

export const Purchasing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenantId = JSON.parse(localStorage.getItem('token')).tenant_id
    const userID = JSON.parse(localStorage.getItem('token')).user_id
    const [PO, setPO] = useState()
    const [showSearchPO, setShowSearchPO] = useState(false)
    const openPO = PO?.filter(item => item.status === 'open').length;
    const notInvoicedPO = PO?.filter(item => !item.invoiced && item.status !== 'void').length;

    console.log(openPO, 'OPEN PO')

    const totalAmountOfNonInvoiced = PO
        ?.filter(item => !item.invoiced)
        .reduce((acc, item) => {
            const totalAmount = parseFloat(item.total_amount);
            if (!isNaN(totalAmount)) {
                return acc + totalAmount;
            }
            return acc;
        }, 0);


    const openPOByUserID = PO?.filter(item => item.user_id === userID && item.status === 'open');

    console.log(totalAmountOfNonInvoiced, 'TOTAL')

    const gridOptions = {
        columnDefs: [
            {
                headerName: "PO No.",
                field: "id",
                sortable: true,
                filter: true
            },
            {
                headerName: "Buyer",
                field: "user.first_name",
                sortable: true,
                filter: true
            },
            {
                headerName: "Vendor",
                field: "vendor.company_name",
                sortable: true,
                filter: true
            },
            {
                headerName: "Ship-To",
                field: "warehouse.warehouse_name",
                sortable: true,
                filter: true
            },
            {
                headerName: "PO Total",
                field: "total_amount",
                sortable: true,
                filter: true
            },
            {
                headerName: "Status",
                field: "status",
                sortable: true,
                filter: true
            }
            // Add more columns as needed
        ],
        defaultColDef: {
            sortable: true,
            filter: true,
        },
        // Add other grid options as needed
    };


    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        dispatch(setPoId(params.data.id))
        navigate('/purchasing/purchaseorder')
    };

    const getPOData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/purchasing/get-all-po-by-tenant/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res, 'RES')
                setPO(res.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };
    const filteredPO = PO?.filter(item => item.status === 'open');
    // console.log(filteredPO, 'FILTERED')
    useEffect(() => {
        getPOData()
    }, []);
    return (
        <>
        <Layout />
            <div className="layout">
                {showSearchPO && <SearchPO setShowSearchPO={setShowSearchPO} POData={PO} />}
                <div className='actions'>
                    <i className="ri-file-add-line add-po mr-2" onClick={() => {
                        dispatch(clearVendor())
                        dispatch(clearOrder())
                        dispatch(clearWarehouse())
                        dispatch(clearDueDate())
                        dispatch(clearSelectedItem())
                        dispatch(clearPrice())
                        dispatch(clearQuantity())
                        navigate('/purchasing/createpo')}
                    }></i>
                    <i className="ri-search-line" onClick={() => setShowSearchPO(true)}></i>
                    <i className="ri-download-line"
                    onClick={()=> navigate('/purchasing/goodsreceipt')}
                    ></i>
                </div>
                <hr className={'mt-4'}/>
                <div className={'mt-5 mb-9 ml-3'}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Total Open Purchase Orders" value={openPO} formatter={formatter} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Your Open Purchase Orders" value={openPOByUserID?.length} precision={2} formatter={formatter} />
                    </Col>
                </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic title="Purchase Orders To Be Invoiced" value={notInvoicedPO} precision={2} formatter={formatter} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Total to be Invoiced" value={totalAmountOfNonInvoiced} precision={2} formatter={formatterMoney} />
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                        <AgGridReact rowData={PO} gridOptions={gridOptions} onCellClicked={handleCellClicked} />
                    </div>
                </div>
            </div>
        </>
    )
}
