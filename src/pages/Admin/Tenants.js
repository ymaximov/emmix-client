import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {Layout} from "../layout/Layout";
import {useNavigate} from "react-router-dom";
import {showLoading, hideLoading} from "../../redux/slices/alertsSlice";
import useGet from "../../hooks/useGet";
import {useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import axios from 'axios'
import {TenantProfileModal} from "../../modals/admin/TenantProfileModal";

export const Tenants = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tenants, setTenants] = useState([]);
    const [dataForModal, setDataForModal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalData = (data) => {
        console.log('Data received from the modal:', data);
    };

    const token = JSON.parse(localStorage.getItem('token')).access_token
    console.log(token)
    const getTenantsData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get("/api/admin/get-all-tenants", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setTenants(res.data)
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        setDataForModal(params.data); // Pass the data from the clicked cell to the modal
        console.log(params.data, '***Params Data***')
        setIsModalVisible(true); // Show the modal
    };
    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Company Name",
            field: "company_name",
        },
        {
            headerName: "First Name",
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Email",
            field: "email",
        },
        {
            headerName: "Phone Number",
            field: "phone",
        },
        {
            headerName: "Security Code",
            field: "security_code",
        },
        {
            headerName: "Account Status",
            field: "account_status",
        },
    ];
    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        getTenantsData()
    }, []);
    return (
        <>
            <Layout />

            {dataForModal && (
                <TenantProfileModal data={dataForModal} onModalData={handleModalData}isModalVisible={isModalVisible} // Pass the modal visibility state to the child component
                                    onModalToggle={handleModalToggle}  />
            )}
            <div className="layout">
            {tenants && tenants.length > 0 ? (
                <div>
                    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                        <AgGridReact rowData={tenants} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                    </div>
                </div>
            ) : (
                <div>...Data is Loading</div>
            )}
            </div>
        </>
    )
}
